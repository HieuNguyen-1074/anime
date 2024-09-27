'use client';

import { cards_api } from '@/app/_api/card';
import { categories_api } from '@/app/_api/categories';
import CardDetailPopup from '@/app/_components/CardDetailPopup';

import { headers } from 'next/headers';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function CardList() {
  //state
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categories, setCategories] = useState([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [pageMax, setPageMax] = useState<null | number>(null);
  const [isLoading, setIsLoading] = useState(false);
  const pageRef = React.useRef<HTMLBodyElement>(
    document.getElementsByTagName('body')[0]
  );
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll({
    container: pageRef,
  });
  //use effect

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
    /**
     * Fetches cards by category and page number, and updates the state variables.
     * @remarks
     * - Sets `isLoading` to true before fetching.
     * - Sets `isLoading` to false after fetching.
     * - Updates `cards` state variable with the new cards.
     * - Updates `pageMax` state variable with the total number of cards.
     * - If `pageNo` is 1, sets `cards` to the new list of cards. Otherwise, appends the new list to the existing list.
     */
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
    !isLoading && getCardsByCategory();
  }, [categoryId, pageNo]);

  // Listen to the scroll event and check if the user has scrolled to the bottom of the page then fetch more data
  useMotionValueEvent(scrollY, 'change', () => {
    const scrollSize = scrollYProgress.get();

    if (scrollSize > 0.9) {
      if (isLoading) {
        return;
      }
      setPageNo(pageNo + 1);
    }
  });
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
    <div className=' items-center justify-start grid gap-5  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 '>
      {cards.map((card: Card) => {
        return (
          <div className=' '>
            <div className='h-fit flex items-center'>
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
