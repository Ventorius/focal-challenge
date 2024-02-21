'use client';
import { ShelfDrawer } from '@/components/shelf-drawer';
import { useState } from 'react';

import type { IShelf } from '@/types';

export default function Home() {
  const [shelves, setShelves] = useState<IShelf[]>([]);
  const onChange = (shelves: IShelf[]) => {
    setShelves(shelves);
  };

  return (
    <main className="flex w-full justify-center h-screen items-center">
      <ShelfDrawer imageUrl="/shelves.jpg" shelves={shelves} onChange={onChange} />
    </main>
  );
}
