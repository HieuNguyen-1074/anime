import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { lightOrDark } from '@/lib/checkColorType';
export default function CardDetailPopup({
  children,
  card,
}: {
  children: React.ReactNode;
  card: Card;
}) {
  const textColorOut =
    lightOrDark(card.mainColor) === 'dark' ? 'white' : 'black';
  if (!card) {
    return <></>;
  }
  return (
    <>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent
          style={{
            background: card.mainColor,
          }}
          className={` max-w-full md:max-w-[600px]  bg-[${card.mainColor}]   color-[${textColorOut}] uppercase`}>
          <div className='flex items-start gap-5'>
            <div className='w-1/2'>
              <img
                src={card.image}
                alt={card.name}
              />
            </div>
            <div className={`text-${textColorOut} w-1/2 flex flex-col gap-4`}>
              <p className='text-[16px]'>{card.category.name}</p>
              <p className='text-[20px]'>{card.name}</p>
              <div
                className={`flex justify-start items-center gap-2 py-3 border-t-[0.5px]  border-b-[0.5px] border-${textColorOut}`}>
                {card.emblems.map((emblem: Emblem) => {
                  return (
                    <div
                      className={`size-[40px]  border-[1px] rounded-full border-${textColorOut}`}>
                      <img
                        className='size-full object-contain'
                        src={emblem.image}
                        alt={emblem.name}
                      />
                    </div>
                  );
                })}
              </div>
              <div className='flex '>
                <svg
                  className='w-[40px] h-[30px]'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='2'
                  stroke='currentColor'
                  aria-hidden='true'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4'></path>
                </svg>
                <div>
                  <p>address</p>
                  <p className='font-normal text-[12px] '>
                    {card.address.slice(0, 10)} ....
                    {card.address.slice(30, card.address.length)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
