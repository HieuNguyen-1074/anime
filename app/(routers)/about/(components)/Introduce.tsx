'use client';
import Masonry from '@/app/_components/Masonry';
import { calGridCols } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import shuffle from 'lodash.shuffle';
import { stagger, animate } from 'framer-motion';

export default function Introduce({ posts }: { posts: Post[] }) {
  const [datas, setData] = useState<any>(posts);
  const postR = [...posts].reverse();
  const [state, setState] = useState(0);
  console.log(posts);
  const hoverMainHandle = () => {
    if (state === 0) {
      animate('.main', { transform: 'translate(48%, 0px)' }, { duration: 0.3 });
      animate('.post-bound', { transform: 'scale(1.02)' }, { duration: 0.3 });
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
    }
    setData(data);
  };

  return (
    <div className=''>
      <Masonry
        className={`relative w-screen  ${
          state === 3 || 'h-screen'
        } main hover:translate-x-10`}
        cols={7}
        gaps={10}
        onHover={hoverMainHandle}
        onLeave={mouseLeaveMainHandle}
        data={datas}
        height={300}
        isInOneLine={state === 3}
        isOdd={state === 0}
        childClass='post'
        keyId='_id'>
        {datas.map((post: any, index: number) => {
          return (
            <div
              onClick={() => shuffleChange(3)}
              key={post._id}
              className={
                post._id +
                '  post text-white absolute h-[300px]   hover:scale-95 cursor-pointer'
              }>
              <div className='post-bound w-full h-full overflow-hidden rounded-2xl'>
                {post._id === 'menu' && !post?.mediaType ? (
                  <div></div>
                ) : post?.mediaType.indexOf('video') !== -1 ? (
                  ''
                ) : (
                  <img
                    className='w-full h-full object-cover'
                    src={post.mediaLink}
                    alt=''
                  />
                )}
                {}
              </div>
            </div>
          );
        })}
      </Masonry>
      <button
        className='text-white mt-7'
        onClick={() => shuffleChange(0)}>
        shuffleChange
      </button>
      <button
        className='text-white mt-7'
        onClick={() => shuffleChange(1)}>
        shuffleChange
      </button>
      <button
        className='text-white mt-7'
        onClick={() => shuffleChange(3)}>
        shuffleChange
      </button>
    </div>
  );
}
