'use client';

import { worlds_api } from '@/app/_api/world';
import React, { useEffect, useState } from 'react';
import HorizontalScroll from 'react-scroll-horizontal';

export default function WorldsPage() {
  const [worlds, setWorlds] = useState<World[]>([]);
  useEffect(() => {
    worlds_api.getWorlds().then((res: [World]) => {
      setWorlds(res);
    });
    return () => {};
  }, []);

  return (
    <div>
      <div className='h-screen'>
        <HorizontalScroll>
          {worlds.map((world: World) => {
            return (
              <div className='group relative bg-white w-[400px]  '>
                <div className=' w-full h-full transition duration-500 group-hover:-translate-y-16'>
                  <img
                    className={`w-full h-full object-cover filter ${
                      !world.isNew && 'grayscale'
                    }  group-hover:grayscale-0`}
                    src={world.image}
                    alt=''
                  />
                  <div
                    className={`absolute top-0 left-0 w-full h-full transition duration-[1s]  fill-neutral-50 ${
                      world.isNew &&
                      'bg-black/50 group-hover:bg-black/0 bg-world '
                    } group-hover:bg-world animate-move-animation  bg-400`}></div>
                </div>
                <div className='absolute bottom-0 w-full  bg-black text-[4rem] text-white uppercase font-bold py-7 px-5  transition duration-500  translate-y-full group-hover:translate-y-0 flex justify-start gap-5'>
                  <p>{world.name}</p>
                  {world.isNew && (
                    <p className='text-[1rem] text-yellow-500 leading-[4rem]'>
                      New
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </HorizontalScroll>
      </div>
    </div>
  );
}
