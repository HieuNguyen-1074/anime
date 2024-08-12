import { emblems_api } from '@/app/_api/emblems';
import Move3D from '@/app/_components/Move3D';
import React from 'react';

export default async function Emblems() {
  const emblems = await emblems_api.getEmblems();

  return (
    <div>
      <div>
        <p className='text-[1.4rem] ml-2'>Emblems</p>
        <div className='flex  flex-wrap w-[590px] mt-4'>
          {emblems
            .slice(0, 11)
            .map(({ image, name, _id }: Emblem, index: number) => {
              return (
                <div
                  key={_id.$oid}
                  className={`size-[80px] p-1 rounded-full hover:bg-white/35 ${
                    index === 6 && 'ml-[34px]'
                  }`}>
                  <Move3D className=''>
                    <img
                      src={image}
                      alt={name}
                    />
                  </Move3D>
                </div>
              );
            })}
          {emblems.length > 11 && (
            <div className='size-[80px] bg-[#373737] cursor-pointer   hover:bg-white/35 rounded-full p-2'>
              <p className='w-full h-full text-center text-white/45 text-[20px] leading-[70px] mx-[auto] border-b-2  bg-black  border-b-white/50 rounded-full'>
                +{emblems.length - 11}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
