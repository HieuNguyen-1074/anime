import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import React, { Dispatch } from 'react';
import logo from '@/app/_assets/_images/beanz-logo.png';
import { lightOrDark } from '@/lib/checkColorType';

export default function ModalBeanz({
  detail,
  children,
}: {
  detail: Beanz;
  children: React.ReactNode;
}) {
  const textColorOut = lightOrDark(detail.color) === 'dark' ? 'white' : 'black';
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent
        className='max-w-[700px]  h-fit '
        style={{ background: detail.color, color: textColorOut }}>
        <Image
          className='absolute -top-[40px] -left-[75px]  w-[150px] -rotate-45 '
          src={logo}
          alt={'logo'}
        />
        <div className='flex justify-center items-start relative flex-col md:flex-row max-h-[80vh] overflow-auto md:overflow-visible hidden-scroll-bar'>
          <img
            className='w-[300px] object-contain mx-auto md:absolute bottom-0 left-0'
            src={detail.avatar}
            alt={detail.name}
          />
          <div className='min-w-[20vw] md:ml-[300px] pl-10 min-h-[300px]'>
            <p className='text-[3rem]'>{detail.name}</p>
            <p>{detail.description}</p>
            <div className='flex items-center   bg-white/10 rounded-lg pt-1 mt-4'>
              <img
                className='w-[70px] object-contain -ml-[35px]'
                src={detail.icon}
                alt={detail.name}
              />
              <p>{detail.traits}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
