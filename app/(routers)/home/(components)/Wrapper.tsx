'use client';

import React, { useEffect } from 'react';
import Collectors from './Collectors';
import Move3D from '@/app/_components/Move3D';

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
    <div className=' wrapper h-[85vh] w-full  overflow-hidden sticky top-0 z-[1] rounded-b-3xl '>
      <div className='h-[100%] overflow-hidden  relative'>
        <Collectors collectors={collectors} />
        <img
          className=' absolute top-0 left-0 object-cover duration-200 w-full h-full object-bottom z-[1]'
          src={card.image}
          alt=''
        />
        <div className='absolute bottom-[40px] left-0 ml-7 z-[2] uppercase'>
          <p className='text-[4rem] font-bold  uppercase'>
            {card.name} <span className='text-black/30'>//</span>
          </p>
          <div className='flex items-center justify-start'>
            <div className='flex items-center mr-2'>
              <div className='w-[70px] h-[70px] border rounded-full'>
                <Move3D className='w-full h-full rounded-full'>
                  <img
                    className='w-full h-full object-contain'
                    src={card.category.image}
                    alt=''
                  />
                </Move3D>
              </div>
              <div className=' ml-2'>
                <p>{card.category.name}</p>
                <p>Rank #{card.category.rank}</p>
              </div>
            </div>

            <div className='flex  border-l-[1px]'>
              <svg
                className='w-[40px] h-[30px]'
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
            <div>
              <button>@dingalingts</button>
              <button>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='chip-inner-icon'>
                  <path d='M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z'></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
