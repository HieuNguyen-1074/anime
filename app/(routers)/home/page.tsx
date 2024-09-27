import { useEffect } from 'react';

import Image from 'next/image';
import Wrapper from './(components)/Wrapper';

import { cards_api } from '@/app/_api/card';
import { collectors_api } from '@/app/_api/collection';
import Emblems from './(components)/Emblems';
import HighLight from './(components)/HighLight';
import CardList from './(components)/CardList';

export default async function Home() {
  // API call
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
        <div className='flex justify-between border-b-[1px] border-white/20 pb-10 flex-col md:flex-row'>
          <Emblems />
          <HighLight />
        </div>

        <CardList />
      </div>
    </div>
  );
}
