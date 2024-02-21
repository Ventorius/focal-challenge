import { MouseEvent, useCallback, useRef, useState } from 'react';
import type { IShelf } from '@/types';
import { generateRandomColor } from '@/utils/generateRandomColor';

export const useMouseEvents = (shelves: IShelf[], onChange: (shelves: IShelf[]) => void) => {
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null);
  const [currentRect, setCurrentRect] = useState<IShelf | null>(null);

  const isDrawing = startPoint !== null;

  const [selectedShelf, setSelectedShelf] = useState<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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
        const newShelf: IShelf = {
          coordinates: [startPoint, [x, y]],
          color: generateRandomColor(shelves),
        };

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
        setCurrentRect({ coordinates: [startPoint, [x, y]], color: 'bg-red-500' });
      }
    },
    [startPoint],
  );

  return {
    imageRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseMove,
    currentRect,
  };
};
