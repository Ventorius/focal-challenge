import { IShelf } from '@/types';

const tailwindColors = ['red', 'green', 'blue', 'yellow', 'pink', 'purple', 'indigo', 'gray', 'orange', 'teal', 'zinc'];

export function generateRandomColor(shelves: IShelf[]) {
  const usedColors = shelves.map(shelf => shelf.color);

  const availableColors = tailwindColors.filter(color => !usedColors.includes(color));

  return availableColors[Math.floor(Math.random() * availableColors.length)];
}
