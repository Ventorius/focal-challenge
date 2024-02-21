'use client';

import Image from 'next/image';

import { MouseEventHandler, TouchEventHandler, useEffect, useRef, useState } from 'react';
import { Shelf } from '@/components/shelf-drawer/shelf';
import type { IShelf } from '@/types';
import { useMouseEvents } from '@/hooks/useMouseEvents';

type Props = {
  imageUrl: string;
  shelves: IShelf[];
  onChange(shelves: IShelf[]): void;
};
export const ShelfDrawer = ({ imageUrl, shelves, onChange }: Props) => {
  const [selectedShelf, setSelectedShelf] = useState<number | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);

  const { handleMouseLeave, handleMouseMove, handleMouseDown, handleMouseUp, currentRect } = useMouseEvents(
    shelves,
    onChange,
    imageRef,
  );

  const handleShelfClick = (index: number) => {
    if (selectedShelf === index) {
      setSelectedShelf(null);
    } else {
      setSelectedShelf(index);
    }
  };

  const removeSelectedShelf = () => {
    if (selectedShelf !== null) {
      const updatedShelves = shelves.filter((_, index) => index !== selectedShelf);
      onChange(updatedShelves);
      setSelectedShelf(null);
    }
  };

  useEffect(() => {
    const disableScroll = (e: Event) => {
      e.preventDefault();
    };

    // Add event listeners when the component mounts
    document.addEventListener('touchmove', disableScroll, { passive: false });

    // Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener('touchmove', disableScroll);
    };
  }, []);

  return (
    <div className="relative">
      <Image
        src={imageUrl}
        alt="shelves"
        width={800}
        height={500}
        draggable={false}
        className="object-cover user-select-none user-drag-none"
        ref={imageRef}
        onMouseDown={handleMouseDown as MouseEventHandler}
        onMouseUp={handleMouseUp as MouseEventHandler}
        onMouseLeave={handleMouseLeave as MouseEventHandler}
        onMouseMove={handleMouseMove as MouseEventHandler}
        onTouchStart={handleMouseDown as TouchEventHandler}
        onTouchEnd={handleMouseUp as TouchEventHandler}
        onTouchMove={handleMouseMove as TouchEventHandler}
        onTouchCancel={handleMouseLeave as TouchEventHandler}
      />
      {shelves?.map((shelf, index) => (
        <Shelf isSelected={selectedShelf === index} key={index} onClick={() => handleShelfClick(index)} shelf={shelf} />
      ))}

      {currentRect && <Shelf isTemporary shelf={currentRect} />}

      <div className="mt-8">
        <button
          onClick={removeSelectedShelf}
          disabled={selectedShelf === null}
          className="border-slate-800 border-2 p-4 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Remove Selected Shelf
        </button>
      </div>
    </div>
  );
};
