'use client';

import Image from 'next/image';

import { useRef, useCallback, useState, MouseEvent, useEffect } from 'react';
import { Shelf } from '@/components/shelf-drawer/shelf';
import type { ShelfShape } from '@/types';

type Props = {
  imageUrl: string;
  shelves: ShelfShape[];
  onChange(shelves: ShelfShape[]): void;
};
export const ShelfDrawer = ({ imageUrl, shelves, onChange }: Props) => {
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null);
  const [selectedShelf, setSelectedShelf] = useState<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentRect, setCurrentRect] = useState<ShelfShape | null>(null);

  const isDrawing = startPoint !== null;

  const handleMouseDown = useCallback((e: MouseEvent<HTMLImageElement>) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setStartPoint([x, y]);

      setSelectedShelf(null);
    }
  }, []);

  const handleMouseUp = useCallback(
    (e: MouseEvent<HTMLImageElement>) => {
      if (!isDrawing) return;

      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newShelf: ShelfShape = [startPoint, [x, y]];

        onChange([...shelves, newShelf]);
        setCurrentRect(null);
        setStartPoint(null);
      }
    },
    [startPoint, shelves, onChange],
  );

  const handleMouseLeave = useCallback(
    (e: MouseEvent<HTMLImageElement>) => {
      if (!isDrawing || e.buttons !== 0) return;

      setCurrentRect(null);
      setStartPoint(null);
    },
    [isDrawing],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLImageElement>) => {
      if (!isDrawing) return;

      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCurrentRect([startPoint, [x, y]]);
      }
    },
    [startPoint],
  );

  const handleShelfClick = (index: number) => {
    setSelectedShelf(index);
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
        <Shelf
          isSelected={selectedShelf === index}
          key={index}
          onClick={() => handleShelfClick(index)}
          coordinates={shelf}
        />
      ))}

      {currentRect && <Shelf isTemporary coordinates={currentRect} />}

      <button onClick={removeSelectedShelf} disabled={selectedShelf === null}>
        Remove Selected Shelf
      </button>
    </div>
  );
};
