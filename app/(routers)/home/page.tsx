import Image from 'next/image';
import Wrapper from './(components)/Wrapper';
import { useEffect } from 'react';
import { cards_api } from '@/app/_api/card';
import { collectors_api } from '@/app/_api/collection';
import Emblems from './(components)/Emblems';
import HighLight from './(components)/HighLight';

export default async function Home() {
  const cardWrapper = await cards_api.getCardWrapper();
  const collectors = await collectors_api.getCollectors();

  return (
    <div>
      <Wrapper
        card={cardWrapper}
        collectors={collectors}
      />
      <div
        id='list-card'
        className=' w-full relative h-screen rounded-top-3xl z-20 bg-[rgb(36,36,36)] rounded-3xl  text-white p-10 uppercase'>
        <div className='flex justify-between'>
          <Emblems />
          <HighLight />
        </div>
      </div>
    </div>
  );
}
