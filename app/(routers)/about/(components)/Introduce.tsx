'use client';
import Masonry from '@/app/_components/Masonry';
import { calGridCols } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import shuffle from 'lodash.shuffle';
import { stagger, animate } from 'framer-motion';

export default function Introduce({
  posts,
  topics,
}: {
  posts: Post[];
  topics: Topic[];
}) {
  const [datas, setData] = useState<any>(posts);
  const [isHiddenName, setIsHiddenName] = useState<boolean>(true);
  const postR = [...posts].reverse();
  const [state, setState] = useState(0);
  const hoverMainHandle = () => {
    if (state === 0) {
      animate('.main', { transform: 'translate(48%, 0px)' }, { duration: 0.3 });
      animate('.post-bound', { transform: 'scale(0.95)' }, { duration: 0.3 });
    }
  };

  const mouseLeaveMainHandle = () => {
    if (state === 0) {
      animate('.main', { transform: 'translate(50%, 0px)' }, { duration: 0.3 });
      animate('.post-bound', { transform: 'scale(1)' }, { duration: 0.3 });
    }
  };
  useEffect(() => {
    animate('.post-bound', { transform: 'scale(1)' }, { duration: 0.3 });
    if (state === 0) {
      animate('.main', { transform: 'translate(50%, 0px)' }, { duration: 1 });
    }

    if (state === 1 || state === 3) {
      animate('.main', { transform: 'translate(0%, 0px)' }, { duration: 1 });
    }
  }, [state]);

  const shuffleChange = (state: number) => {
    setState(state);
    let data: any = posts;

    if (state === 1) {
      data = [
        {
          _id: 'menu',
          col: 1,
        },
        ...postR,
      ];
    } else {
      setIsHiddenName(true);
    }
    setData(data);
  };

  return (
    <div>
      <div
        onClick={() => state === 0 && shuffleChange(1)}
        className={
          (state === 2
            ? 'h-[240px] w-screen overflow-y-scroll'
            : 'overflow-x-hidden') +
          ' hidden-scroll-bar ' +
          ((state === 0 || state === 2) && 'overflow-y-hidden ')
        }>
        <Masonry
          className={`relative w-screen  h-screen main hover:translate-x-10 pt-20`}
          cols={6}
          gaps={10}
          onHover={hoverMainHandle}
          onLeave={mouseLeaveMainHandle}
          data={datas}
          height={state === 2 ? 150 : 300}
          isInOneLine={state === 2}
          isOdd={state === 0}
          childClass='post'
          keyId='_id'>
          {datas.map((post: any, index: number) => {
            return (
              <div
                key={post._id}
                className={
                  post._id +
                  (state === 2 ? ' h-[150px]' : ' h-[300px] ') +
                  '  post text-white absolute    hover:scale-95 cursor-pointer '
                }>
                <div className='post-bound w-full h-full overflow-hidden rounded-2xl'>
                  {post._id === 'menu' && !post?.mediaType ? (
                    <div className='px-2 flex flex-col justify-center items-center h-full '>
                      <div className='w-[80%]'>
                        {topics.map((topic: Topic) => {
                          return (
                            <div className='flex justify-between items-center bg-[#59595933] px-7 py-[10px] w-full rounded-full mb-[4px] uppercase'>
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
                          onClick={() => shuffleChange(0)}
                          className='flex-1 bg-[#000000] px-5 py-[10px] rounded-full uppercase '
                          type='button'>
                          back
                        </button>
                      </div>
                    </div>
                  ) : post?.mediaType.indexOf('video') !== -1 ? (
                    <video
                      onClick={() => state === 1 && shuffleChange(2)}
                      className='w-full h-full object-cover'
                      muted
                      autoPlay
                      loop={true}
                      preload='true'>
                      <source
                        className='w-full h-full'
                        src={post.mediaLink}
                        type={post.mediaType}
                      />
                    </video>
                  ) : (
                    <img
                      onClick={() => state === 1 && shuffleChange(2)}
                      className='w-full h-full object-cover'
                      src={post.mediaLink}
                      alt=''
                    />
                  )}
                  {post?.name && !isHiddenName && (
                    <p className='absolute bottom-0 bg-black p-3 mb-3 m-x-auto'>
                      {post.name}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </Masonry>
      </div>
    </div>
  );
}
