'use client';
import React, { useState } from 'react';

import iconTiktok from '@/app/_assets/_images/tiktok.jpg';
import iconIg from '@/app/_assets/_images/ig.jpg';
import iconX from '@/app/_assets/_images/x.jpg';
import logo from '@/app/_assets/_images/beanz-logo.png';
import Image from 'next/image';

import { motion } from 'framer-motion';
import ModalBeanz from './ModalBeanz';

export default function BeanzShow({ beanzs }: { beanzs: Beanz[] }) {
  return (
    <div>
      <div className='w-full h-screen relative pt-20 flex justify-center '>
        <motion.div
          animate={{
            transform: [
              'translateY(-10px)',
              'translateY(-0px)',
              'translateY(-10px)',
            ],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            times: [0, 0.2, 0.5, 0.7, 0.9, 1.2, 1.5, 1.7],
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className='w-full mx-auto absolute bottom-40  flex flex-col items-center'>
          <Image
            className='w-[66vw] mt-32 z-[1] '
            src={logo}
            alt='beanz logo'
          />
          <Image
            className='w-[100px] rounded-[30px] absolute top-28 left-[10%] z-0 rotate-12 shadow-2xl hover:scale-110 transition-all'
            src={iconTiktok}
            alt='tiktok logo'
          />
          <Image
            className='w-[80px] rounded-[30px] absolute top-20 left-[70%] z-0 rotate-12 shadow-2xl hover:scale-110 transition-all'
            src={iconIg}
            alt='Ig logo'
          />
          <Image
            className='w-[100px] rounded-[30px] absolute top:20 lg:top-40 left-[50%] lg:left-[85%] z-0 rotate-12 shadow-2xl hover:scale-110 transition-all'
            src={iconX}
            alt='X logo'
          />
        </motion.div>

        <div className=' w-[70vw] flex  justify-center items-center  z-10  mx-auto absolute bottom-40 center'>
          {beanzs.map((beanz: Beanz, index: number) => {
            return (
              <BeanzItem
                isCenter={index === beanzs.length / 2}
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

function BeanzItem({ beanz, isCenter }: { beanz: Beanz; isCenter: boolean }) {
  return (
    <div
      className={`cursor-pointer hover:scale-110 transition-all mx-[-14px] relative  flex items-end z-[${beanz.position}]`}>
      <ModalBeanz detail={beanz}>
        <img
          className='w-full'
          src={beanz.avatar}
          alt=''
        />
      </ModalBeanz>
    </div>
  );
}
