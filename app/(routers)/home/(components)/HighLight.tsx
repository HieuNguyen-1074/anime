import React from 'react';

import { cards_api } from '@/app/_api/card';
import CardDetailPopup from '@/app/_components/CardDetailPopup';

export default async function HighLight() {
  //Call data
  const cardHighLight = await cards_api.getCardHighlight();

  return (
    <div className=' w-full md:w-[600px] mt-10 md:mt-0'>
      <div className='flex justify-between lg:text-[1.2em]  text-[1rem]'>
        <p>HighLight</p>
        <a
          href='#list-card'
          className='flex items-center gap-2'>
          <span>View Collection </span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            className='fill-current w-4 h-4 ml-2 mb-0.5'
            aria-hidden='true'>
            <path d='M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z'></path>
          </svg>
        </a>
      </div>
      <div className='flex justify-start flex-nowrap gap-2 mt-4'>
        {cardHighLight.map((card: Card) => {
          return (
            <div className='h-full w-1/5 rounded-2xl overflow-hidden hover:scale-105 transition-all'>
              <CardDetailPopup card={card}>
                <div className='cursor-pointer h-[170px]'>
                  <img
                    className='w-full h-full object-cover'
                    src={card.image}
                    alt=''
                  />
                </div>
              </CardDetailPopup>
            </div>
          );
        })}
      </div>
    </div>
  );
}
