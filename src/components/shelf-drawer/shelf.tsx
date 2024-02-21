import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef } from 'react';
import { IShelf } from '@/types';

type Props = ComponentPropsWithoutRef<'div'> & {
  shelf: IShelf;
  isTemporary?: boolean;
  isSelected?: boolean;
};

export const Shelf = ({ shelf, isTemporary, isSelected, onClick }: Props) => {
  const { coordinates, color } = shelf;

  const borderStyle = isTemporary
    ? `border-dashed border-4 border-${color}-500`
    : `border-dashed border-4 border-${color}-500`;

  const selectedBorderStyle = isSelected
    ? 'border-dashed border-4 border-blue-500'
    : `border-dashed border-4 border-${color}-500`;

  const bgStyle = isTemporary ? 'bg-red-200 bg-opacity-50' : `bg-${color}-500 bg-opacity-50`;

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
