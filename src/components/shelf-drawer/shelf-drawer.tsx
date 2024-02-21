'use client';

import Image from 'next/image';

import { useState } from 'react';
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

  const { handleMouseLeave, handleMouseMove, handleMouseDown, handleMouseUp, imageRef, currentRect } = useMouseEvents(
    shelves,
    onChange,
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
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
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
