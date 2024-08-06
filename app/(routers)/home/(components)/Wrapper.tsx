'use client';

import React, { useEffect } from 'react';

export default function Wrapper() {
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
  return (
    <div className=' wrapper h-[85vh] w-full  overflow-hidden sticky top-0 z-[-1] rounded-b-3xl'>
      <div className='h-[100%] overflow-hidden '>
        <img
          className=' object-cover duration-200 w-full h-full object-bottom'
          src='https://azk.imgix.net/dragon_azukis/ikz1_3602.png?fm=jpg'
          alt=''
        />
      </div>
    </div>
  );
}
