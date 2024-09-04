'use client';
import Masonry from '@/app/_components/Masonry';
import { calGridCols } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import shuffle from 'lodash.shuffle';
import { stagger, animate } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Introduce({
  posts,
  topics,
  topicId,
  postDetail,
}: {
  posts: Post[];
  topics: Topic[];
  topicId: string | undefined;
  postDetail: Post | {};
}) {
  const [data, setData] = useState<any>(posts);
  const [isHiddenName, setIsHiddenName] = useState<boolean>(true);

  useEffect(() => {
    shuffleChange(state);
  }, [posts, topicId]);

  const router = useRouter();

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
  }, [state, data]);

  const shuffleChange = (state: number) => {
    setState(state);
    let data: any = posts;

    if (state === 1) {
      data = [
        {
          _id: 'menu',
          col: 1,
        },
        ...data.reverse(),
      ];
    } else {
      setIsHiddenName(true);
    }
    setData(data);
  };

  return (
    <div>
      <div
        className={
          (state === 2 ? 'h-[240px] w-screen ' : 'overflow-x-hidden') +
          ' hidden-scroll-bar relative ' +
          ((state === 0 || state === 2) && 'overflow-y-hidden ')
        }>
        <Masonry
          className={`relative w-screen  h-screen main hover:translate-x-10 pt-20`}
          cols={6}
          gaps={10}
          onClick={() => state === 0 && shuffleChange(1)}
          onHover={hoverMainHandle}
          onLeave={mouseLeaveMainHandle}
          data={data}
          height={state === 2 ? 150 : 300}
          isInOneLine={state === 2}
          isOdd={state === 0}
          childClass='post'
          keyId='_id'>
          {data.map((post: any, index: number) => {
            return (
          
            );
          })}
        </Masonry>
        {state === 2 && (
          <p
            className='absolute w-[100px] bg-black top-1/2 -translate-y-1/2 cursor-pointer
          -left-[50px] pt-[40px] h-[100px] rounded-r-[3rem] text-white text-right uppercase pr-5 hover:left-0 hover:text-center transition-all  '
            onClick={() => shuffleChange(1)}>
            back
          </p>
        )}
      </div>
    </div>
  );
}
