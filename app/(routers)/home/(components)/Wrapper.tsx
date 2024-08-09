'use client';

import React, { useEffect } from 'react';
import Collectors from './Collectors';
import Move3D from '@/app/_components/Move3D';
import Link from 'next/link';

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

  const handleCopyLinkX = function () {
    navigator.clipboard.writeText(card.x);
  };
  return (
    <div className=' wrapper h-[75vh] w-full  overflow-hidden sticky top-0 z-[1] rounded-b-3xl '>
      <div className='h-[100%] overflow-hidden  relative'>
        <Collectors collectors={collectors} />
        <img
          className=' absolute top-0 left-0 object-cover duration-200 w-full h-full object-bottom z-[1]'
          src={card.image}
          alt=''
        />
        <div className='absolute bottom-[40px] left-0 ml-7 z-[2] uppercase'>
          <p className='text-[4rem] font-extrabold  uppercase'>
            {card.name} <span className='text-black/30'>//</span>
          </p>
          <div className='flex items-center justify-start flex-wrap'>
            <div className='flex items-center mr-2'>
              <div className='w-[35px] h-[35px] bg-black/60 rounded-full'>
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
                <p className='font-normal text-[12px] text-black/50'>
                  Rank #{card.category.rank}
                </p>
              </div>
            </div>

            <div className='flex  border-l-[2px] border-l-black/30 '>
              <svg
                className='w-[40px] h-[30px]'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='2'
                stroke='currentColor'
                aria-hidden='true'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4'></path>
              </svg>
              <div>
                <p>address</p>
                <p className='font-normal text-[12px] text-black/50'>
                  {card.address.slice(0, 10)} ....{' '}
                  {card.address.slice(30, card.address.length)}
                </p>
              </div>
            </div>
            <div className='w-full flex justify-start mt-4 gap-3 '>
              <button className='bg-black/10 px-3 py-2 rounded-xl uppercase'>
                <Link
                  href={card.x}
                  className='flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 40 40'
                    aria-hidden='true'
                    className='fill-current chip-inner-icon shrink w-[20px] h-[20px]'>
                    <path d='M38.526 8.625a15.199 15.199 0 01-4.373 1.198 7.625 7.625 0 003.348-4.211 15.25 15.25 0 01-4.835 1.847 7.6 7.6 0 00-5.557-2.404c-4.915 0-8.526 4.586-7.416 9.346-6.325-.317-11.934-3.347-15.69-7.953C2.01 9.869 2.97 14.345 6.358 16.612a7.58 7.58 0 01-3.446-.953c-.084 3.527 2.444 6.826 6.105 7.56a7.63 7.63 0 01-3.438.13 7.618 7.618 0 007.112 5.286A15.306 15.306 0 011.42 31.79a21.55 21.55 0 0011.67 3.42c14.134 0 22.12-11.937 21.637-22.643a15.499 15.499 0 003.799-3.941z'></path>
                  </svg>
                  @dingalingts
                </Link>
              </button>
              <button
                className='bg-black/10 px-3 py-2 rounded-xl'
                onClick={handleCopyLinkX}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='chip-inner-icon w-[20px] h-[20px]'>
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
