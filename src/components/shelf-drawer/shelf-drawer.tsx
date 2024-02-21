'use client';

import Image from 'next/image';

import { useRef, useState, MouseEvent } from 'react';
import { Shelf } from '@/components/shelf-drawer/shelf';

type Props = {
  imageUrl: string;
  shelves: [number, number][][];
  onChange(shelves: [number, number][][]): void;
};
export const ShelfDrawer = ({ imageUrl, shelves, onChange }: Props) => {
  const [drawing, setDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null);
  const [selectedShelf, setSelectedShelf] = useState<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentRect, setCurrentRect] = useState(null);

  const handleMouseDown = (e: MouseEvent<HTMLImageElement>) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setStartPoint([x, y]);
      setDrawing(true);

      console.log({ x, y });
      setSelectedShelf(null);
    }
  };

  const handleMouseUp = (e: MouseEvent<HTMLImageElement>) => {
    if (!drawing || !startPoint) return;

    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newShelf = [startPoint, [x, y]];
      setDrawing(false);

      setStartPoint(null);

      onChange([...shelves, newShelf]);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLImageElement>) => {
    if (!drawing || !startPoint) return;

    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCurrentRect([startPoint, [x, y]]);
    }
  };

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
        onMouseMove={handleMouseMove}
      />
      {shelves?.map((shelf, index) => (
        <Shelf key={index} onClick={() => handleShelfClick(index)} coordinates={shelf} />
      ))}

      {currentRect && <Shelf isTemporary coordinates={currentRect} />}

      <button onClick={removeSelectedShelf} disabled={selectedShelf === null}>
        Remove Selected Shelf
      </button>
    </div>
  );
};
