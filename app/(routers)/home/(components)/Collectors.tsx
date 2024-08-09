'use client';

import React, { useState } from 'react';

export default function Collectors({
  collectors,
}: {
  collectors: CollectionItem[];
}) {
  const [slectedCollector, setSelectedCollector] =
    useState<CollectionItem | null>(null);
  const onC = (sele: any) => {
    setSelectedCollector(sele);
  };
  return (
    <div className='relative z-[2] flex items-start  mt-24'>
      <div className='flex items-center left-0 relative w-fit h-[50px] z-[2] ml-7'>
        {collectors.map((collector: CollectionItem, index: number) => {
          return (
            <div
              className={`w-[50px] h-[50px] ${
                slectedCollector &&
                collector._id !== slectedCollector._id &&
                'hidden'
              } transition-[1s]`}
              key={index}
              style={{
                position: 'absolute',
                left: `${
                  slectedCollector?._id === collector._id || index === 0
                    ? '0'
                    : index * 25
                }px`,
                zIndex: collectors.length - index,
              }}>
              <img
                onClick={() => onC(collector)}
                className={!slectedCollector ? `hover:-translate-y-1` : ''}
                src={collector.image}
                alt=''
              />
              <p
                className={` ${
                  slectedCollector || 'hidden'
                } absolute bottom-0 right-0 cursor-pointer bg-black text-white w-fit h-fit text-[13px]  py-[4px] px-[6px] rounded-full leading-[10px] hover:scale-105`}
                onClick={() => setSelectedCollector(null)}>
                x
              </p>
            </div>
          );
        })}
      </div>
      <div
        className={`w-[300px] ml-16 -mt-3 z-[2] ${
          !slectedCollector && 'hidden'
        }`}>
        <p className='text-[20px] font-bold'>{slectedCollector?.title}</p>
        <p className='text-black/60'>{slectedCollector?.description}</p>
        <p className='text-[10px] mt-2 text-black/50'>
          {slectedCollector?.numberOfowner} owner
        </p>
      </div>
    </div>
  );
}
