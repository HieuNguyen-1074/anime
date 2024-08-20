'use client';

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from 'react';

import Move3D from '@/app/_components/Move3D';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { emblems_api } from '@/app/_api/emblems';

import rankIcon from '../../../_assets/_images/quality.png';
import Image from 'next/image';
import CardsTooltip from './CardsTooltip';

export default function EmblemsList({ emblems }: { emblems: Emblem[] }) {
  const [emblem, setEmblem] = useState<Emblem | null>(null);

  return (
    <div className='flex  flex-wrap w-[590px] mt-4'>
      {emblems.slice(0, 11).map((emblem: Emblem, index: number) => {
        return (
          <div
            key={emblem._id.$oid}
            onClick={() => setEmblem(emblem)}
            className={`size-[80px] p-1 rounded-full hover:bg-white/35 ${
              index === 6 && 'ml-[34px]'
            }`}>
            <Move3D className=''>
              <img
                src={emblem.image}
                alt={emblem.name}
              />
            </Move3D>
          </div>
        );
      })}
      {emblems.length > 11 && (
        <div
          className='size-[80px]  cursor-pointer   hover:bg-white/35 rounded-full p-2'
          onClick={() => setEmblem(emblems[0])}>
          <p className='w-full h-full text-center text-white/45 text-[20px] leading-[70px] mx-[auto] border-b-2  bg-black  border-b-white/50 rounded-full'>
            + {emblems.length - 11}
          </p>
        </div>
      )}
      <EmblemPopup
        emblem={emblem}
        emblems={emblems}
        setEmblem={setEmblem}
      />
    </div>
  );
}

function EmblemPopup({
  emblem,
  emblems,
  setEmblem,
}: {
  emblem: Emblem | null;
  emblems: Emblem[];
  setEmblem: Dispatch<Emblem | null>;
}) {
  if (!emblems || !emblems) return <></>;
  return (
    <div>
      <Drawer
        direction='left'
        onOpenChange={(open: boolean) => !open && setEmblem(null)}
        open={Boolean(emblem)}>
        <DrawerContent className=' fixed top-0   w-1/2 h-full bg-[#363636] rounded-r-3xl overflow-hidden outline-none mt-20 uppercase'>
          <div className='rounded-none mt-5 w-full h-full '>
            <div className='p-4 pb-0 '>
              <p className='text-[2rem] mb-5 text-white'>Emblems</p>
              <div className='flex items-start gap-2 '>
                <div className=' w-3/5 flex  flex-wrap gap-2 items-start  pb-10'>
                  {emblems.map((emblem: Emblem, index: number) => {
                    return (
                      <div
                        key={emblem._id.$oid}
                        onClick={() => setEmblem(emblem)}
                        className={`size-[50px] p-[1px] rounded-full hover:bg-white/35 border-[2px]   `}>
                        <motion.img
                          whileHover={{ scale: 1.6 }}
                          whileTap={{ scale: 0.7 }}
                          src={emblem.image}
                          alt={emblem.name}
                        />
                      </div>
                    );
                  })}
                </div>

                <EmblemPopupDetail emblem={emblem} />
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function EmblemPopupDetail({ emblem }: { emblem: Emblem | null }) {
  const [emblemDetail, setEmblemDetail] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (!emblem) return;
    async function getEmblem() {
      if (!emblem || typeof emblem._id !== 'string') return;
      const emblemRes = await emblems_api.getEmblemDetail(emblem._id);
      console.log(emblemRes, emblem);
      startTransition(() => setEmblemDetail(emblemRes));
    }
    if (emblem) {
      getEmblem();
    }
  }, [emblem]);

  if (!emblem) return <></>;
  return (
    <div className='text-white w-2/5 pr-10'>
      <p className='text-[1.5rem] mb-5 text-white'>Details</p>
      <div className='w-full flex items-center flex-col justify-center'>
        <div className='mx-auto border-4 rounded-full w-fit flex justify-center '>
          <Move3D className=' '>
            <img
              className='w-full h-full  '
              src={emblem?.image}
              alt=''
            />
          </Move3D>
        </div>
        <div className='w-full'>
          <p className='text-[1.2rem] w-full text-center mt-10'>
            {emblemDetail?.name}
          </p>
          <div>
            <p>rank</p>
            <div className=' w-full  flex justify-between items-center mt-4 bg-[#919191] border-[1px] rounded-lg p-5'>
              <Image
                className='size-[40px] rounded-full bg-white'
                src={rankIcon}
                alt=''
              />
              <p>{Math.round(emblemDetail?.rank)} points</p>
            </div>
          </div>
          <div className='mt-5'>
            <p>Categories</p>
            <div className='overflow-y-auto h-[45vh] '>
              {emblemDetail?.categories.map((category: any) => (
                <div className=' w-full  flex justify-between items-center bg-[#919191] border-[1px] rounded-lg p-5 mt-4'>
                  <p>{category.name}</p>
                  <div className=' flex items-center rounded-md overflow-hidden border relative'>
                    {category.cards
                      .slice(0, 4)
                      .map((card: Card, index: number) => (
                        <img
                          className={`w-[50px] ${index !== 0 && '-ml-[30px]'}`}
                          src={card.image}
                          alt=''
                        />
                      ))}
                    <div className='w-[50px] h-[50px] -ml-[30px] bg-black/80 flex justify-center items-center '>
                      +
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
