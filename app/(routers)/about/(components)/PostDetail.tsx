'use client';

import React, { useEffect, useRef, useState, useTransition } from 'react';
import PropTypes from 'prop-types';
import {
  animate,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

import { useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

import scrollIcon from '@/app/_assets/_images/scroll-bar.png';
import Image from 'next/image';
import { posts_api } from '@/app/_api/posts';

function PostDetail({ postId }: { postId: string | null }) {
  const detailRef = useRef<HTMLDivElement | null>(null);
  const [hiddenScrollIcon, setHiddenScrollIcon] = useState<boolean>(false);

  const [post, setPost] = useState<Post | null>(null);
  const [isPending, startTransition] = useTransition();
  const searchs = useSearchParams();

  const { scrollY, scrollYProgress } = useScroll({
    container: detailRef,
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  useEffect(() => {}, [scaleX]);
  useEffect(() => {
    if (postId) {
      startTransition(() => getPost(postId));
    }
  }, [postId]);
  const getPost = async (postId: string) => {
    const post = await posts_api.getPostById(postId);
    setPost(post);
    return post;
  };

  useEffect(() => {
    animationChangePost(isPending);
    scaleX.set(0);
  }, [isPending, post]);

  useMotionValueEvent(scrollY, 'change', () => {
    const isHiddenScroll = scrollYProgress.get() > 0.9;
    if (isHiddenScroll !== hiddenScrollIcon) {
      setHiddenScrollIcon(isHiddenScroll);
    }
  });
  useMotionValueEvent(scrollY, 'renderRequest', () => {
    const isHiddenScroll = scrollYProgress.get() > 0.9;
    if (isHiddenScroll !== hiddenScrollIcon) {
      setHiddenScrollIcon(isHiddenScroll);
    }
  });
  return (
    <>
      <div
        className={
          'post-detail grid  grid-cols-1 lg:grid-cols-3 gap-12 text-white px-10  relative  -mt-20'
        }>
        <div className='post-short relative mt-20'>
          <p className='text-[2rem] font-bold'>{post?.name}</p>
          <p className='mb-3 ml-6'>{post?.releaseDate.split('T')[0]}</p>
          <p className='text-[1.2rem]'>{post?.shortDescription}</p>
        </div>

        <div
          ref={detailRef}
          className='post-content  lg:h-[77vh] overflow-y-scroll hidden-scroll-bar col-span-2 relative rounded-xl'>
          <motion.div
            className={`progress-bar hidden lg:block w-[${
              scaleX.get() * 100
            }%] col-span-3 h-[10px] bg-white sticky top-0 `}
            style={{ scaleX }}
          />
          <div
            className=' mt-0 lg:mt-[15px] p-4 bg-[#3d3b3b33] rounded-xl'
            dangerouslySetInnerHTML={{ __html: post?.content || '' }}
          />
          <motion.div
            className={
              'sticky bottom-0 left-full w-[80px] mr-10 ' +
              (hiddenScrollIcon && 'hidden')
            }
            animate={{
              transform: [
                'translateY(-50px)',
                'translateY(-0px)',
                'translateY(-50px)',
              ],
            }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              times: [0, 0.2, 0.4, 0.6, 0.7, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1,
            }}>
            <Image
              src={scrollIcon}
              alt='scroll icon'
            />
          </motion.div>
        </div>
      </div>
      <div className={`flex items-start gap-10 post-loading `}>
        <div className='w-[30vw] flex flex-col space-y-3'>
          <Skeleton className='h-[100px]  rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
        <div className='flex-1 flex flex-col space-y-3'>
          <Skeleton className='h-[25vh]  rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-[5vh] ' />
            <Skeleton className='h-[5vh] ' />
          </div>
        </div>
      </div>
    </>
  );
}

const animationChangePost = (isLoading: boolean) => {
  animate(
    '.post-detail',
    {
      opacity: !isLoading ? 1 : 0,
    },
    {
      duration: 0.3,
    }
  );

  animate(
    '.post-loading',
    {
      opacity: isLoading ? 1 : 0,
      display: isLoading ? 'unset' : 'none',
    },
    {
      duration: 0.3,
    }
  );

  animate(
    '.post-short',
    {
      left: 0,
      opacity: 1,
    },
    {
      duration: 0.3,
    }
  );
  animate(
    '.post-content',
    {
      left: 0,
      opacity: 1,
    },
    {
      duration: 0.3,
    }
  );
};

export default PostDetail;
