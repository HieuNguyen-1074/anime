import React from 'react';
import Image from 'next/image';

import shao from '@/app/_assets/_images/beanz/shao-sitting.png';
import { FOOTER } from '../_assets/constants';

export default function Footer() {
  return (
    <div className='flex bg-white gap-10 px-10  md:flex-row flex-col'>
      <div className='flex-1 flex justify-between p-6'>
        <p>Azuki</p>
        <Image
          className='w-[300px] object-contain'
          src={shao}
          alt=''
        />
      </div>
      {FOOTER.map((footer: any) => {
        return (
          <div className='w-[300px] border-l-2 p-6 flex flex-col  gap-8'>
            {footer.map((item: any) => {
              return (
                <div>
                  <p className='text-[1.2rem] font-bold'>{item.title}</p>
                  <div className='flex flex-col'>
                    {item.child.map((child: any) => {
                      return <a href=''>{child.title}</a>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
