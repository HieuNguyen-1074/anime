import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { STATUS_ABOUT_PAGE } from '@/app/_assets/constants';
export default function TopicMenu({
  topics,
  topicId,
  setIsHiddenName,
  setAction,
  setTopicId,
  isHiddenName,
  isSuff,
  setIsSuff,
}: {
  topics: Topic[];
  topicId: string | null;
  isHiddenName: boolean;
  setAction: Dispatch<string | null>;
  setTopicId: Dispatch<string | null>;
  setIsHiddenName: Dispatch<boolean>;
  isSuff: boolean;
  setIsSuff: Dispatch<boolean>;
}) {
  return (
    <div
      className={
        'menu ' +
        ' h-[250px] ' +
        '  post text-white absolute hover:scale-95 cursor-pointer  font-petch '
      }>
      <div className='px-1 flex flex-col justify-center items-center h-full post-bound bg-white/10 w-[98%] rounded-2xl mx-auto'>
        <div className='w-full'>
          {topics.map((topic: Topic) => {
            return (
              <div
                onClick={() => setTopicId(topic._id)}
                className={
                  'group flex justify-between items-center bg-black/40 px-7 py-[6px] w-full rounded-2xl mb-[2px] uppercase text-[1.2rem] ' +
                  (topicId === topic._id && 'bg-red-400')
                }>
                <p>{topic.name}</p>
                <p>{topic.totalPost}</p>
              </div>
            );
          })}
        </div>
        <div className='flex justify-between items-stretch gap-[5px] w-[98%]  text-[1.2rem]   '>
          <button
            onClick={() => setIsHiddenName(!isHiddenName)}
            className='bg-[#00000033] px-5 py-[10px] rounded-2xl'
            type='button'>
            Aa
          </button>
          <div className='flex  justify-center relative rounded-2xl overflow-hidden h-[90%] mt-1'>
            <button
              className={
                'bg-white/35 h-full w-[50px] transition-all rounded-2xl absolute top-0 left-0 ' +
                (isSuff ? 'translate-x-full' : '')
              }
              type='button'></button>
            <button
              onClick={() => setIsSuff(false)}
              className='bg-[#00000033] px-5  w-[50px]'
              type='button'>
              <svg
                width='17'
                height='14'
                viewBox='0 0 17 14'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                className='text-white'>
                <path d='M14.0303 0.71967C13.7374 0.426777 13.2626 0.426777 12.9697 0.71967C12.6768 1.01256 12.6768 1.48744 12.9697 1.78033L13.4393 2.25H11.6085C10.5741 2.25 9.61272 2.78286 9.0645 3.66L8.84076 4.01799L10.0203 5.90437L10.7605 4.72C10.9432 4.42762 11.2637 4.25 11.6085 4.25H13.4393L12.9697 4.71967C12.6768 5.01256 12.6768 5.48744 12.9697 5.78033C13.2626 6.07322 13.7374 6.07322 14.0303 5.78033L16.0303 3.78033C16.171 3.63968 16.25 3.44891 16.25 3.25C16.25 3.05109 16.171 2.86032 16.0303 2.71967L14.0303 0.71967Z'></path>
                <path d='M4.3915 2.25C5.38269 2.25 6.30688 2.7393 6.8647 3.55196L10.1801 8.85433C10.1885 8.86777 10.1973 8.88083 10.2064 8.89351L10.7605 9.78C10.9432 10.0724 11.2637 10.25 11.6085 10.25H13.4393L12.9697 9.78033C12.6768 9.48744 12.6768 9.01256 12.9697 8.71967C13.2626 8.42678 13.7374 8.42678 14.0303 8.71967L16.0303 10.7197C16.171 10.8603 16.25 11.0511 16.25 11.25C16.25 11.4489 16.171 11.6397 16.0303 11.7803L14.0303 13.7803C13.7374 14.0732 13.2626 14.0732 12.9697 13.7803C12.6768 13.4874 12.6768 13.0126 12.9697 12.7197L13.4393 12.25H11.6085C10.649 12.25 9.75225 11.7915 9.18989 11.025L5.82011 5.63567C5.80201 5.60672 5.78217 5.57951 5.76082 5.5541L5.2395 4.72C5.05676 4.42762 4.73629 4.25 4.3915 4.25H1.5C0.947715 4.25 0.5 3.80228 0.5 3.25C0.5 2.69772 0.947715 2.25 1.5 2.25H4.3915Z'></path>
                <path d='M5.98299 8.59043L5.2395 9.78C5.05676 10.0724 4.73629 10.25 4.3915 10.25H1.5C0.947715 10.25 0.5 10.6977 0.5 11.25C0.5 11.8023 0.947715 12.25 1.5 12.25H4.3915C5.42587 12.25 6.38728 11.7171 6.9355 10.84L7.16249 10.4768L5.98299 8.59043Z'></path>
              </svg>
            </button>
            <button
              onClick={() => setIsSuff(true)}
              className='bg-[#00000033] px-5  w-[50px]'
              type='button'>
              <svg
                width='17'
                height='14'
                viewBox='0 0 17 14'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                className='text-white'>
                <path d='M14.0303 0.71967C13.7374 0.426777 13.2626 0.426777 12.9697 0.71967C12.6768 1.01256 12.6768 1.48744 12.9697 1.78033L13.4393 2.25H11.6085C10.5741 2.25 9.61272 2.78286 9.0645 3.66L8.84076 4.01799L10.0203 5.90437L10.7605 4.72C10.9432 4.42762 11.2637 4.25 11.6085 4.25H13.4393L12.9697 4.71967C12.6768 5.01256 12.6768 5.48744 12.9697 5.78033C13.2626 6.07322 13.7374 6.07322 14.0303 5.78033L16.0303 3.78033C16.171 3.63968 16.25 3.44891 16.25 3.25C16.25 3.05109 16.171 2.86032 16.0303 2.71967L14.0303 0.71967Z'></path>
                <path d='M4.3915 2.25C5.38269 2.25 6.30688 2.7393 6.8647 3.55196L10.1801 8.85433C10.1885 8.86777 10.1973 8.88083 10.2064 8.89351L10.7605 9.78C10.9432 10.0724 11.2637 10.25 11.6085 10.25H13.4393L12.9697 9.78033C12.6768 9.48744 12.6768 9.01256 12.9697 8.71967C13.2626 8.42678 13.7374 8.42678 14.0303 8.71967L16.0303 10.7197C16.171 10.8603 16.25 11.0511 16.25 11.25C16.25 11.4489 16.171 11.6397 16.0303 11.7803L14.0303 13.7803C13.7374 14.0732 13.2626 14.0732 12.9697 13.7803C12.6768 13.4874 12.6768 13.0126 12.9697 12.7197L13.4393 12.25H11.6085C10.649 12.25 9.75225 11.7915 9.18989 11.025L5.82011 5.63567C5.80201 5.60672 5.78217 5.57951 5.76082 5.5541L5.2395 4.72C5.05676 4.42762 4.73629 4.25 4.3915 4.25H1.5C0.947715 4.25 0.5 3.80228 0.5 3.25C0.5 2.69772 0.947715 2.25 1.5 2.25H4.3915Z'></path>
                <path d='M5.98299 8.59043L5.2395 9.78C5.05676 10.0724 4.73629 10.25 4.3915 10.25H1.5C0.947715 10.25 0.5 10.6977 0.5 11.25C0.5 11.8023 0.947715 12.25 1.5 12.25H4.3915C5.42587 12.25 6.38728 11.7171 6.9355 10.84L7.16249 10.4768L5.98299 8.59043Z'></path>
              </svg>
            </button>
          </div>

          <button
            onClick={() => {
              setIsSuff(false);
              setAction(STATUS_ABOUT_PAGE.INIT);
              setTopicId(null);
            }}
            className='flex-1 bg-[#000000] px-5 py-[10px] rounded-2xl uppercase '
            type='button'>
            back
          </button>
        </div>
      </div>
    </div>
  );
}
