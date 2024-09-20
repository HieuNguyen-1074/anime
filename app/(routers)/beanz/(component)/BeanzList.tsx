'use client';
import React, { useState } from 'react';

import iconTiktok from '@/app/_assets/_images/tiktok.jpg';
import iconIg from '@/app/_assets/_images/ig.jpg';
import iconX from '@/app/_assets/_images/x.jpg';
import logo from '@/app/_assets/_images/beanz-logo.png';
import Image from 'next/image';

import { motion } from 'framer-motion';
import ModalBeanz from './ModalBeanz';
import { lightOrDark } from '@/lib/checkColorType';

export default function BeanzList({ beanzs }: { beanzs: Beanz[] }) {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [detail, setDetail] = useState<Beanz | null>(null);
  return (
    <div className='text-white'>
      <div className='w-screen  relative pt-20  '>
        <div className='flex justify-center items-center flex-col'>
          <p className='text-[3rem] font-bold text-center'>Meet the Beanz</p>
          <p className='max-w-[50vh] text-center'>
            Beanz are residents of the Garden, living their legume lives and
            often assisting humans with theirs. They come in all different sizes
            and colors, each with their own unique personality.
          </p>
        </div>

        <div className=' w-[95vw] grid grid-cols-5 gap-3  z-10  mx-auto center mt-20'>
          {beanzs.map((beanz: Beanz, index: number) => {
            return (
              <BeanzItem
                key={beanz._id}
                beanz={beanz}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BeanzItem({ beanz }: { beanz: Beanz }) {
  const textColorOut = lightOrDark(beanz.color) === 'dark' ? 'white' : 'black';
  return (
    <ModalBeanz detail={beanz}>
      <div
        className='relative h-[180px] w-full rounded-xl p-4 transition-all hover:scale-105 hover:border-[2px] hover:border-white cursor-pointer'
        style={{ background: beanz.color, color: textColorOut }}>
        <p className='w-fit text-[2rem]'>{beanz.name}</p>
        <img
          className='w-[40%] absolute bottom-0 right-0 pointer-events-none'
          src={beanz.avatar}
          alt=''
        />
      </div>
    </ModalBeanz>
  );
}
