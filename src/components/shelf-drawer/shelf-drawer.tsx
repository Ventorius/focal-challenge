'use client';

import Image from 'next/image';

import { useRef, useState, MouseEvent } from 'react';

type Props = {
  imageUrl: string;
  shelves: [number, number][][];
  onChange(shelves: [number, number][][]): void;
};
export const ShelfDrawer = ({ imageUrl, shelves, onChange }: Props) => {
  const [drawing, setDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null);
  const [selectedShelf, setSelectedShelf] = useState(null);
  const imageRef = useRef();
  const [currentRect, setCurrentRect] = useState(null); // Temporary rectangle state
  const handleMouseDown = (e: MouseEvent<HTMLImageElement>) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStartPoint([x, y]);
    setDrawing(true);

    console.log({ x, y });
    setSelectedShelf(null);
  };

  const handleMouseUp = (e: MouseEvent<HTMLImageElement>) => {
    if (!drawing || !startPoint) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newShelf = [startPoint, [x, y]];

    console.log({ shelves, newShelf });

    console.log([...shelves, newShelf]);

    onChange([...shelves, newShelf]);
    setDrawing(false);
    setStartPoint(null);
  };

  const handleMouseMove = (e: MouseEvent<HTMLImageElement>) => {
    if (!drawing || !startPoint) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentRect([startPoint, [x, y]]);
  };

  const handleShelfClick = index => e => {
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
        <div
          key={index}
          onClick={handleShelfClick(index)}
          style={{
            position: 'absolute',
            border: `2px solid ${index === selectedShelf ? 'red' : 'blue'}`,
            left: `${Math.min(shelf[0][0], shelf[1][0])}px`,
            top: `${Math.min(shelf[0][1], shelf[1][1])}px`,
            width: `${Math.abs(shelf[0][0] - shelf[1][0])}px`,
            height: `${Math.abs(shelf[0][1] - shelf[1][1])}px`,
            cursor: 'pointer',
          }}
        />
      ))}

      {currentRect && (
        <div
          style={{
            position: 'absolute',
            border: '2px dashed red', // Dashed border for the drawing rectangle
            left: `${Math.min(currentRect[0][0], currentRect[1][0])}px`,
            top: `${Math.min(currentRect[0][1], currentRect[1][1])}px`,
            width: `${Math.abs(currentRect[0][0] - currentRect[1][0])}px`,
            height: `${Math.abs(currentRect[0][1] - currentRect[1][1])}px`,
          }}
        />
      )}

      <button onClick={removeSelectedShelf} disabled={selectedShelf === null}>
        Remove Selected Shelf
      </button>
    </div>
  );
};
