import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
export default function CardsTooltip({ cards }: { cards: Card[] }) {
  return (
    <>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger></TooltipTrigger>
          <TooltipContent className=' r w-[500px] min-h-[300px] -left-[200px] gap-2 mr-4'>
            <div className='flex flex-wrap'>
              {cards.map((card: Card) => {
                return (
                  <div
                    className='w-[50px] h-[50px]   flex justify-center items-center '
                    key={card.name}>
                    <img
                      src={card.image}
                      alt={card.name}
                    />
                  </div>
                );
              })}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
