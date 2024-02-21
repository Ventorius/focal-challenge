import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef } from 'react';
import { ShelfShape } from '@/types';

type Props = ComponentPropsWithoutRef<'div'> & {
  coordinates: ShelfShape;
  isTemporary?: boolean;
  isSelected?: boolean;
};

export const Shelf = ({ coordinates, isTemporary, isSelected, onClick }: Props) => {
  const borderStyle = isTemporary ? 'border-dashed border-4 border-red-600' : 'border-dashed border-4 border-white';

  const selectedBorderStyle = isSelected
    ? 'border-dashed border-4 border-blue-600'
    : 'border-dashed border-4 border-white';

  const bgStyle = isTemporary ? 'bg-red-200 bg-opacity-50' : 'bg-white bg-opacity-50';

  const generateCoordinates = (coordinates: [number, number][]) => {
    return {
      top: Math.min(coordinates[0][1], coordinates[1][1]),
      left: Math.min(coordinates[0][0], coordinates[1][0]),
      width: Math.abs(coordinates[0][0] - coordinates[1][0]),
      height: Math.abs(coordinates[0][1] - coordinates[1][1]),
    };
  };

  return (
    <div
      className={cn('absolute', borderStyle, bgStyle, selectedBorderStyle)}
      style={generateCoordinates(coordinates)}
      onClick={onClick}
    />
  );
};
