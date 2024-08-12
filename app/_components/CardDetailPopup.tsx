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
export default function CardDetailPopup({
  children,
  card,
}: {
  children: React.ReactNode;
  card: Card;
}) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          style={{
            background: card.mainColor,
          }}
          className={`sm:max-w-[625px] bg-[${card.mainColor}]`}>
          <div className='flex items-start '>
            <div>
              <img
                src={card.image}
                alt={card.name}
              />
            </div>
            <div>
              <p className='text-[16px]'>{card.category.name}</p>
              <p className='text-[20px]'>{card.name}</p>
              <div className='flex justify-start items-center'>
                {card.emblems.map((emblem: Emblem) => {
                  return (
                    <div className=''>
                      <img
                        src={emblem.image}
                        alt={emblem.name}
                      />
                    </div>
                  );
                })}
              </div>
              <div className='flex  border-l-[2px] border-l-black/30 '>
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
                  <p className='font-normal text-[12px] text-black/50'>
                    {card.address.slice(0, 10)} ....{' '}
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
