'use client';
import { ShelfDrawer } from '@/components/shelf-drawer';
import { useState } from 'react';

export default function Home() {
  const [shelves, setShelves] = useState<[number, number][][]>([
    [
      [0, 0],
      [5, 0],
    ],
    [
      [10, 10],
      [20, 10],
    ],
  ]);
  const onChange = (shelves: [number, number][][]) => {
    setShelves(shelves);
  };

  return (
    <main className="flex w-full justify-center h-screen items-center">
      <ShelfDrawer imageUrl="/shelves.jpg" shelves={shelves} onChange={onChange} />
    </main>
  );
}
