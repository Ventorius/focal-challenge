import {
  MouseEvent,
  MouseEventHandler,
  RefObject,
  SyntheticEvent,
  TouchEventHandler,
  useCallback,
  useState,
} from 'react';
import type { IShelf } from '@/types';
import { generateRandomColor } from '@/utils/generateRandomColor';

export const useEvents = (
  shelves: IShelf[],
  onChange: (shelves: IShelf[]) => void,
  imageRef: RefObject<HTMLImageElement>,
) => {
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null);
  const [currentRect, setCurrentRect] = useState<IShelf | null>(null);

  const isDrawing = startPoint !== null;

  const getCoordinates = (event: TouchEvent | MouseEvent) => {
    if ('changedTouches' in event && event.changedTouches.length > 0) {
      return {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
      };
    } else if ('clientX' in event && 'clientY' in event) {
      return {
        x: event.clientX,
        y: event.clientY,
      };
    }

    return { x: 0, y: 0 };
  };

  const handleDown: TouchEventHandler<HTMLImageElement> | MouseEventHandler<HTMLImageElement> = useCallback(
    (e: SyntheticEvent) => {
      if (imageRef.current) {
        const { x, y } = getCoordinates(e as MouseEvent | TouchEvent);

        const rect = imageRef.current.getBoundingClientRect();
        const relativeX = x - rect.left;
        const relativeY = y - rect.top;

        setStartPoint([relativeX, relativeY]);
      }
    },
    [],
  );

  const handleUp: TouchEventHandler<HTMLImageElement> | MouseEventHandler<HTMLImageElement> = useCallback(
    (e: SyntheticEvent) => {
      if (!isDrawing) return;

      if (imageRef.current) {
        const { x, y } = getCoordinates(e as MouseEvent | TouchEvent);

        const rect = imageRef.current.getBoundingClientRect();
        const relativeX = x - rect.left;
        const relativeY = y - rect.top;
        const newShelf: IShelf = {
          coordinates: [startPoint, [relativeX, relativeY]],
          color: generateRandomColor(shelves),
        };

        onChange([...shelves, newShelf]);
        setCurrentRect(null);
        setStartPoint(null);
      }
    },
    [startPoint, shelves, onChange],
  );

  const handleLeave: TouchEventHandler<HTMLImageElement> | MouseEventHandler<HTMLImageElement> = useCallback(
    (e: SyntheticEvent) => {
      if ('buttons' in e) {
        if (!isDrawing || e.buttons !== 0) return;
      }

      setCurrentRect(null);
      setStartPoint(null);
    },
    [isDrawing],
  );

  const handleMove: TouchEventHandler<HTMLImageElement> | MouseEventHandler<HTMLImageElement> = useCallback(
    (e: SyntheticEvent) => {
      if (!isDrawing) return;

      if (imageRef.current) {
        const { x, y } = getCoordinates(e as MouseEvent | TouchEvent);

        const rect = imageRef.current.getBoundingClientRect();
        const relativeX = x - rect.left;
        const relativeY = y - rect.top;
        setCurrentRect({ coordinates: [startPoint, [relativeX, relativeY]], color: 'bg-red-500' });
      }
    },
    [startPoint],
  );

  return {
    handleDown,
    handleUp,
    handleLeave,
    handleMove,
    currentRect,
  };
};
