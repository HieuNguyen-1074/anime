import React from 'react';
import DirectMenu from './DirectMenu';

export default function Header() {
  return (
    <div className='fixed top-0 left-0 w-full h-[70px] flex justify-between items-center px-5 z-10'>
      <h1 className='text-[1.1rem] text-white bg-red-600 px-4 py-1 rounded-md font-extrabold uppercase'>
        azuki
      </h1>
      <DirectMenu />
      <button className='btn-connect flex items-center gap-2 hover:bg-white/85 rounded-[70px] px-4 py-2'>
        Connect
      </button>
    </div>
  );
}
