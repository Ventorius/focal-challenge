'use client';
import { ShelfDrawer } from '@/components/shelf-drawer';
import { useState } from 'react';

export default function Home() {
  const [shelves, setShelves] = useState<[number, number][][]>([
    [
      [0, 0],
      [40, 50],
    ],
    [
      [10, 10],
      [80, 90],
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
