'use client';

import Image from 'next/image';

import { MouseEventHandler, TouchEventHandler, useEffect, useRef, useState } from 'react';
import { Shelf } from '@/components/shelf-drawer/shelf';
import type { IShelf } from '@/types';
import { useEvents } from '@/hooks/useEvents';

type Props = {
  imageUrl: string;
  shelves: IShelf[];
  onChange(shelves: IShelf[]): void;
};
export const ShelfDrawer = ({ imageUrl, shelves, onChange }: Props) => {
  const [selectedShelf, setSelectedShelf] = useState<number | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(500);

  const imageRef = useRef<HTMLImageElement>(null);

  const { handleDown, handleUp, handleLeave, handleMove, currentRect } = useEvents(shelves, onChange, imageRef);

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

  const removeAllShelves = () => {
    onChange([]);
  };

  useEffect(() => {
    const disableScroll = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener('touchmove', disableScroll, { passive: false });

    return () => {
      document.removeEventListener('touchmove', disableScroll);
    };
  }, []);

  return (
    <div className="relative">
      <Image
        src={imageUrl}
        alt="shelves"
        width={width}
        height={height}
        draggable={false}
        className="object-cover user-select-none user-drag-none"
        ref={imageRef}
        onMouseDown={handleDown as MouseEventHandler}
        onMouseUp={handleUp as MouseEventHandler}
        onMouseLeave={handleLeave as MouseEventHandler}
        onMouseMove={handleMove as MouseEventHandler}
        onTouchStart={handleDown as TouchEventHandler}
        onTouchEnd={handleUp as TouchEventHandler}
        onTouchMove={handleMove as TouchEventHandler}
        onTouchCancel={handleLeave as TouchEventHandler}
      />
      {shelves?.map((shelf, index) => (
        <Shelf isSelected={selectedShelf === index} key={index} onClick={() => handleShelfClick(index)} shelf={shelf} />
      ))}

      {currentRect && <Shelf isTemporary shelf={currentRect} />}

      <div className="mt-8 flex gap-4">
        <button
          onClick={removeSelectedShelf}
          disabled={selectedShelf === null}
          className="border-slate-800 border-2 p-4 rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Remove Selected Shelf
        </button>
        <button
          onClick={removeAllShelves}
          className="border-slate-800 border-2 p-4 rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Remove all shelves
        </button>
      </div>

      <div className="flex gap-4 mt-8">
        <input
          name="width"
          type="text"
          placeholder="Custom width"
          value={width}
          onChange={e => setWidth(Number(e.target.value))}
          className="max-w-[200px] flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />

        <input
          name="height"
          type="text"
          placeholder="Custom height"
          value={height}
          onChange={e => setHeight(Number(e.target.value))}
          className="max-w-[200px] flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
};
