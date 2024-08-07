'use client';

import React, { useEffect } from 'react';
import Collectors from './Collectors';

export default function Wrapper({
  card,
  collectors,
  ...props
}: {
  card: Card;
  collectors: CollectionItem[];
}) {
  if (!collectors) {
    return <div>Loading...</div>; // Handle undefined data case
  }
  useEffect(() => {
    window.onscroll = function () {
      if (window.scrollY < 10) {
        document.getElementsByTagName('body')[0].classList.remove('scrolled');
      } else {
        document.getElementsByTagName('body')[0].classList.add('scrolled');
      }
    };

    return () => {
      document.removeEventListener('scroll', () => {});
    };
  }, []);
  return (
    <div className=' wrapper h-[85vh] w-full  overflow-hidden sticky top-0 z-[1] rounded-b-3xl'>
      <div className='h-[100%] overflow-hidden  relative'>
        <Collectors collectors={collectors} />
        <img
          className=' absolute top-0 left-0 object-cover duration-200 w-full h-full object-bottom z-[1]'
          src={card.image}
          alt=''
        />
        <div>
          <p>
            {card.name} <span>//</span>
          </p>
          <div>
            <img
              src={card.category.image}
              alt=''
            />
            <div>
              <p>{card.category.name}</p>
              <p>Rank #{card.category.rank}</p>
            </div>
          </div>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='2'
              stroke='currentColor'
              aria-hidden='true'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4'></path>
            </svg>
            <div>
              <p>address</p>
              <p>{card.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
