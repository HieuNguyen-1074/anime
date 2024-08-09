import Image from 'next/image';
import Wrapper from './(components)/Wrapper';
import { useEffect } from 'react';
import { cards_api } from '@/app/_api/card';
import { collectors_api } from '@/app/_api/collection';
import Emblems from './(components)/Emblems';

export default async function Home() {
  const cardWrapper = await cards_api.getCardWrapper();
  const collectors = await collectors_api.getCollectors();

  return (
    <div>
      <Wrapper
        card={cardWrapper}
        collectors={collectors}
      />
      <div className='relative w-screen h-screen rounded-top-3xl z-20 '>
        <Emblems />
      </div>
    </div>
  );
}
