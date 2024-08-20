'use client';

import { cards_api } from '@/app/_api/card';
import { categories_api } from '@/app/_api/categories';

import { headers } from 'next/headers';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function CardList() {
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    async function getCategory() {
      const categories = await categories_api.getCategories();
      setCategories(categories);
    }
    getCategory();
  }, []);
  useEffect(() => {
    async function getCardsByCategory() {
      const nextCards: Card[] = await cards_api.getCardsByCategory(
        categoryId,
        pageSize,
        pageNo
      );
      setCards([...cards, ...nextCards]);
    }
    getCardsByCategory();
  }, [categoryId]);

  return (
    <div className='flex items-center gap-2 mt-3'>
      {categories.map((category: Category) => {
        return (
          <div>
            <Link
              href={'home/?category=' + category._id}
              scroll={false}>
              {category.name}
            </Link>
            <Cards cards={cards} />
          </div>
        );
      })}
      <Link
        href={'home/'}
        scroll={false}>
        all
      </Link>
    </div>
  );
}

async function Cards({ cards }: { cards: Card[] }) {
  return (
    <>
      {cards.map((card: Card) => {
        return <p>{card.name}</p>;
      })}
    </>
  );
}
