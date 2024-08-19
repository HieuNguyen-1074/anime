'use client';

import Move3D from '@/app/_components/Move3D';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { emblems_api } from '@/app/_api/emblems';

import rankIcon from '../../../_assets/_images/quality.png';
import Image from 'next/image';

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
        <div className='size-[80px]  cursor-pointer   hover:bg-white/35 rounded-full p-2'>
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
  return (
    <div>
      <Drawer
        direction='left'
        onOpenChange={(open: boolean) => !open && setEmblem(null)}
        open={Boolean(emblem)}>
        <DrawerContent className=' fixed top-0   w-1/2 h-full bg-[#363636] rounded-r-3xl overflow-hidden outline-none mt-20'>
          <div className='rounded-none mt-5 w-full h-full '>
            <div className='p-4 pb-0 '>
              <p className='text-[2rem] mb-5 text-white'>Emblems</p>
              <div className='flex items-start '>
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
  if (!emblem) return <></>;
  useEffect(() => {
    async function getEmblem() {
      if (!emblem || typeof emblem._id !== 'string') return;
      const emblemRes = await emblems_api.getEmblemDetail(emblem._id);
      console.log(emblemRes, emblem);
      setEmblemDetail(emblemRes);
    }
    getEmblem();
  }, [emblem]);

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
          <div className=' w-full  flex justify-between items-center mt-8 bg-[#919191] border-[1px] rounded-lg p-5'>
            <Image
              className='size-[40px] rounded-full bg-white'
              src={rankIcon}
              alt=''
            />
            <p>{emblemDetail?.rank}</p>
          </div>
          {emblemDetail?.categories.map((category: any) => (
            <div className=' w-full  flex justify-between items-center mt-8 bg-[#919191] border-[1px] rounded-lg p-5'>
              <Image
                className='size-[40px] rounded-full bg-white'
                src={rankIcon}
                alt=''
              />
              <p>{emblemDetail?.rank}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
