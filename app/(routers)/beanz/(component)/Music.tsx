'use client';

import React, { useEffect, useRef, useState, useTransition } from 'react';
import humanListener from '@/app/_assets/_images/beanz/image17.jpg';
import Image from 'next/image';

import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export default function Music() {
  const [pending, transition] = useTransition();
  const [isPlay, setIsPlay] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const tallyRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    tallyRef.current &&
      (tallyRef.current.onended = function () {
        play();
      });
    return () => {};
  }, [tallyRef]);

  const open = (isOpen: boolean, isOpenFt: null | boolean | undefined) => {
    isOpenFt && setIsOpened(true);
    setIsOpen(isOpen);
    play();
  };
  const play = () => {
    tallyRef.current && tallyRef.current.play();
    setIsPlay(true);
  };
  const stop = () => {
    tallyRef.current && tallyRef.current.pause();
    setIsPlay(false);
  };
  const next = () => {
    tallyRef.current && (tallyRef.current.currentTime += 10);
  };
  const prev = () => {
    tallyRef.current && (tallyRef.current.currentTime -= 10);
  };
  return (
    <div className='sticky bottom-[70px] left-[70px] w-fit h-[75px] z-50 flex justify-center items-center  bg-white bg-opacity-20 backdrop-blur-3xl text-white/70 rounded-xl'>
      <Image
        className='absolute bottom-0 left-0 w-[85px] object-contain '
        src={humanListener}
        alt=''
      />
      <audio
        src={
          'https://firebasestorage.googleapis.com/v0/b/anime-3b6ad.appspot.com/o/Tally.mp3?alt=media&token=98d0e284-d688-4ddc-82be-27d5f9c9c5ab'
        }
        ref={tallyRef}></audio>
      <div className='w-[30px] h-[20px]  flex  justify-center items-end ml-[90px] mr-10'>
        <motion.div
          animate={{
            height: isPlay ? [30, 3, 30, 3] : [],
          }}
          transition={{
            duration: 1,
            from: '0',

            ease: 'easeInOut',
            times: [0, 0.2, 0.5, 0.7, 0.9, 1],
            repeat: Infinity,
          }}
          className='w-[5px] h-[20px] bg-white'></motion.div>
        <motion.div
          animate={{
            height: isPlay ? [30, 3, 30, 3] : [],
          }}
          transition={{
            duration: 0.5,
            from: '0',

            ease: 'easeInOut',
            times: [0, 0.2, 0.5, 0.7, 0.9, 1],
            repeat: Infinity,
          }}
          className='w-[5px] h-[20px] bg-white'></motion.div>
        <motion.div
          animate={{
            height: isPlay ? [30, 3, 30, 3] : [],
          }}
          transition={{
            duration: 0.8,
            from: '0',

            ease: 'easeInOut',
            times: [0, 0.2, 0.5, 0.7, 0.9, 1],
            repeat: Infinity,
          }}
          className='w-[5px] h-[20px] bg-white'></motion.div>
      </div>
      {/* <div>...</div> */}
      {isOpen && (
        <>
          <div>
            <p>Tally</p>
            <p>Blackpink</p>
          </div>
          <div className=' flex justify-center items-center  mx-10'>
            <svg
              onClick={prev}
              stroke='currentColor'
              fill='currentColor'
              stroke-width='0'
              viewBox='0 0 24 24'
              height='40'
              width='40'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='m16 7-7 5 7 5zm-7 5V7H7v10h2z'></path>
            </svg>
            {!isPlay ? (
              <svg
                onClick={play}
                stroke='currentColor'
                fill='currentColor'
                stroke-width='0'
                viewBox='0 0 24 24'
                height='40'
                width='40'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M7 6v12l10-6z'></path>
              </svg>
            ) : (
              <svg
                onClick={stop}
                stroke='currentColor'
                fill='currentColor'
                stroke-width='0'
                viewBox='0 0 24 24'
                height='40'
                width='40'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M8 7h3v10H8zm5 0h3v10h-3z'></path>
              </svg>
            )}
            <svg
              onClick={next}
              stroke='currentColor'
              fill='currentColor'
              stroke-width='0'
              viewBox='0 0 24 24'
              height='40'
              width='40'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M7 7v10l7-5zm9 10V7h-2v10z'></path>
            </svg>
          </div>
        </>
      )}
      <div className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-20  backdrop-blur-3xl bg p-3 rounded-full '>
        {!isOpened ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            onClick={() => open(true, true)}
            className=' fill-current w-[20px]'
            viewBox='0 0 24 24'>
            <path d='M3 22v-20l18 10-18 10z'></path>
          </svg>
        ) : isOpen ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className=' fill-current w-[20px]'
            onClick={() => open(false, false)}
            viewBox='0 0 24 24'>
            <path d='M0 10h24v4h-24z'></path>
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className=' fill-current  w-[20px]'
            onClick={() => open(true, false)}
            viewBox='0 0 24 24'>
            <path d='M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z'></path>
          </svg>
        )}
      </div>
    </div>
  );
}
