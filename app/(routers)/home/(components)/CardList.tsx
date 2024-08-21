'use client';

import { cards_api } from '@/app/_api/card';
import { categories_api } from '@/app/_api/categories';
import CardDetailPopup from '@/app/_components/CardDetailPopup';

import { headers } from 'next/headers';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CardList() {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categories, setCategories] = useState([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [pageMax, setPageMax] = useState<null | number>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getCategory() {
      const categories = await categories_api.getCategories();
      setCategories(categories);
    }
    getCategory();
  }, []);

  useEffect(() => {
    if (pageMax && cards.length >= pageMax) {
      setIsLoading(false);
      return;
    }
    async function getCardsByCategory() {
      setIsLoading(true);
      cards_api
        .getCardsByCategory(categoryId, pageSize, pageNo)
        .then((nextCards: { total: number; list: Card[] }) => {
          if (!nextCards?.list) {
            return;
          }
          const cardsNew =
            pageNo === 1 ? nextCards.list : [...cards, ...nextCards.list];
          setIsLoading(false);
          setPageMax(nextCards.total);
          setCards(cardsNew);
        });
    }
    getCardsByCategory();
  }, [categoryId, pageNo]);

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      const windowHeight =
        'innerHeight' in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        if (isLoading) {
          return;
        }
        setIsLoading(true);
        setPageNo(pageNo + 1);
      }
    });
    return function () {
      window.removeEventListener('scroll', () => {});
    };
  }, [isLoading, pageNo, categoryId]);
  return (
    <div>
      <div className='flex items-center gap-5 mt-3 mb-5'>
        {categories.map((category: Category) => {
          return (
            <div>
              <button
                className={
                  (categoryId === category._id &&
                    'bg-white/50 p-2 rounded-md') + ' transition-all'
                }
                onClick={() => {
                  setCards([]);
                  setPageNo(1);
                  setPageMax(null);
                  setCategoryId(category._id);
                }}>
                {category.name}
              </button>
            </div>
          );
        })}
      </div>
      <Cards
        cards={cards}
        isLoading={isLoading}
      />
    </div>
  );
}

function Cards({ cards, isLoading }: { cards: Card[]; isLoading: Boolean }) {
  return (
    <div className=' items-center justify-start grid gap-5  grid-cols-5 '>
      {cards.map((card: Card) => {
        return (
          <div className=' '>
            <div className='h-[400px] flex items-center'>
              <CardDetailPopup card={card}>
                <img
                  className='w-full  object-contain rounded-xl '
                  src={card.image}
                  alt=''
                />
              </CardDetailPopup>
            </div>
            <p className='mt-auto w-full text-center'>{card.name}</p>
          </div>
        );
      })}

      <>
        <div className={(!isLoading && 'hidden') + ' flex flex-col space-y-3'}>
          <Skeleton className='h-[125px] w-[250px] rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
        <div
          className={
            (!isLoading && 'hidden') + ' flex flex-col space-y-3 transition-all'
          }>
          <Skeleton className='h-[125px] w-[250px] rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
        <div
          className={
            (!isLoading && 'hidden') + ' flex flex-col space-y-3 transition-all'
          }>
          <Skeleton className='h-[125px] w-[250px] rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
        <div
          className={
            (!isLoading && 'hidden') + ' flex flex-col space-y-3 transition-all'
          }>
          <Skeleton className='h-[125px] w-[250px] rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
        <div
          className={
            (!isLoading && 'hidden') + ' flex flex-col space-y-3 transition-all'
          }>
          <Skeleton className='h-[125px] w-[250px] rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
      </>
    </div>
  );
}
