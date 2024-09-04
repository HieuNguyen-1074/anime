import { useRouter, useSearchParams } from 'next/navigation';
import React, { SetStateAction } from 'react';

export default function topicMenu({topics , setIsHiddenName , setStatus ,isHiddenName } :{
    topics : Topic[] , 
    isHiddenName : boolean,
    setIsHiddenName : SetStateAction<boolean> , 
    setStatus : SetStateAction<number> , 
}) {
    const router = useRouter()
    const topicId = useSearchParams()
    console.log(topicId)
    
  return <div className='px-2 flex flex-col justify-center items-center h-full '>
      <div className='w-[80%]'>
        {topics.map((topic: Topic) => {
          return (
            <div
              onClick={() =>
                router.push('/about/' + '?topicId=' + topic._id)
              }
              className={
                // 'group flex justify-between items-center bg-[#59595933] px-7 py-[10px] w-full rounded-full mb-[4px] uppercase ' +
                // (topicId === topic._id && 'bg-red-400')
              }>
              <p>{topic.name}</p>
              <p>{topic.totalPost}</p>
            </div>
          );
        })}
      </div>
      <div className='flex justify-between items-center gap-2 w-[80%]'>
        <button
          onClick={() => setIsHiddenName(!isHiddenName)}
          className='bg-[#59595933] px-5 py-[10px] rounded-full'
          type='button'>
          Aa
        </button>
        <button
          onClick={() => {
            router.push('/about/?topicId=all');
            setStatus(0);
          }}
          className='flex-1 bg-[#000000] px-5 py-[10px] rounded-full uppercase '
          type='button'>
          back
        </button>
      </div>
    </div>
  ) 
}
