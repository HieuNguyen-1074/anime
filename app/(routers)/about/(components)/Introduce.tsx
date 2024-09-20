'use client';

import { calGridCols, getTranslateX } from '@/lib/utils';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { stagger, animate } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

import Masonry from '@/app/_components/Masonry';
import TopicMenu from '@/app/(routers)/about/(components)/topicMenu';
import PostItem from './PostItem';
import { posts_api } from '@/app/_api/posts';
import PostDetail from './PostDetail';
import { STATUS_ABOUT_PAGE } from '@/app/_assets/constants';
import Loading from './Loading';

export default function Introduce({
  posts,
  topics,
}: // topicId,
// postDetail,
{
  posts: Post[];
  topics: Topic[];
  // postDetail: Post | undefined;
}) {
  const [isHiddenName, setIsHiddenName] = useState<boolean>(true);
  const searchs = useSearchParams();
  const [postId, setPostId] = useState<string | null>(null);
  const [topicId, setTopicId] = useState<string | null>(null);
  const [action, setAction] = useState<string | null>(STATUS_ABOUT_PAGE.INIT);
  const [data, setData] = useState<any>([...posts]);
  const [isSuff, setIsSuff] = useState<boolean>(false);

  const mainRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  useEffect(() => {
    if (action !== STATUS_ABOUT_PAGE.LIST) {
      setIsHiddenName(true);
    }

    const dataNew = isSuff ? [...posts].reverse() : posts;
    console.log(isSuff, posts, dataNew);
    const data = [
      ...(action === STATUS_ABOUT_PAGE.LIST
        ? [
            {
              _id: 'menu',
              col: 1,
            },
          ]
        : []),
      ...dataNew,
    ];
    setData(data);
  }, [action, isSuff]);

  const hoverMainHandle = () => {
    if (action === STATUS_ABOUT_PAGE.INIT && data.length > 0) {
      animate('.post-bound', { transform: 'scale(0.98)' }, { duration: 0.3 });
    }
  };

  const mouseLeaveMainHandle = () => {
    if (action === STATUS_ABOUT_PAGE.INIT && data.length > 0) {
      animate('.post-bound', { transform: 'scale(1)' }, { duration: 0.3 });
    }
  };
  useEffect(() => {
    if (data.filter((da: any) => da._id !== 'menu').length === 0) return;
    animate('.post-bound', { transform: 'scale(1)' }, { duration: 0.3 });
    if (action === STATUS_ABOUT_PAGE.INIT) {
      animate('.main', { transform: 'translate(45%, 0)' }, { duration: 1 });
    }

    if (
      action === STATUS_ABOUT_PAGE.LIST ||
      action === STATUS_ABOUT_PAGE.DETAIL
    ) {
      animate('.main', { transform: 'translate(0%, 0px)' }, { duration: 1 });
    }
  }, [action, data]);
  useEffect(() => {
    if (!postId) return;

    try {
      const transformX = postId && getTranslateX(postId);

      if (transformX && mainRef?.current) {
        scrollListTo(transformX - window.outerWidth / 5, false);
      }
    } catch (error) {}
  }, [postId]);

  function scrollListTo(left: number, isPlus: boolean) {
    mainRef?.current?.scrollTo({
      left: isPlus ? mainRef?.current?.scrollLeft + left : left,
      behavior: 'smooth',
    });
  }

  return (
    <>
      <Loading />
      <div className='overflow-x-hidden'>
        <div
          className={` transition-opacity duration-1000 absolute text-white bottom-28 ml-6 w-1/3 z-10 ${
            action !== STATUS_ABOUT_PAGE.INIT &&
            'opacity-0 pointer-events-none '
          } `}>
          <h2 className='text-[4rem]'>WHO WE ARE</h2>
          <p>
            At Azuki, we are building the future of anime through decentralized
            IP co-created with the community and innovative products that enrich
            the anime fan experience. Our Azuki collectibles have generated over
            $1B in secondary trading volume. Here are some things we’ve created
            so far.
          </p>
          <button
            onClick={() => setAction(STATUS_ABOUT_PAGE.LIST)}
            className='text-[1.5rem] mt-9 cursor-pointer bg-white/10 px-10 py-3 rounded-2xl hover:bg-white/30'>
            Explode now -&gt;
          </button>
        </div>
        <div
          ref={mainRef}
          className={
            'main w-screen m-auto  group flex justify-center ' +
            (action === STATUS_ABOUT_PAGE.DETAIL
              ? 'h-[180px] w-screen  '
              : ' h-screen') +
            ' hidden-scroll-bar relative ' +
            ((action === STATUS_ABOUT_PAGE.INIT ||
              action === STATUS_ABOUT_PAGE.DETAIL) &&
              'overflow-y-hidden  ')
          }
          onMouseMove={hoverMainHandle}
          onMouseLeave={mouseLeaveMainHandle}>
          <Masonry
            className={`relative   h-full transition-all  w-[90%] ${
              action !== STATUS_ABOUT_PAGE.INIT
                ? 'pt-20  '
                : 'group-hover:translate-x-10'
            } ${action === STATUS_ABOUT_PAGE.DETAIL && 'h-[180px]'}`}
            cols={6}
            gaps={5}
            onClick={() =>
              action === STATUS_ABOUT_PAGE.INIT &&
              (setIsSuff(true), setAction(STATUS_ABOUT_PAGE.LIST))
            }
            data={data}
            height={action === STATUS_ABOUT_PAGE.DETAIL ? 100 : 250}
            isInOneLine={action === STATUS_ABOUT_PAGE.DETAIL}
            isOdd={action === STATUS_ABOUT_PAGE.INIT}
            childClass='post'
            showKey={'topicId'}
            showVal={topicId}
            keyId='_id'>
            {data.map((post: any, index: number) => {
              return post._id === 'menu' && !post?.mediaType ? (
                <TopicMenu
                  isHiddenName={isHiddenName}
                  setIsHiddenName={setIsHiddenName}
                  topics={topics}
                  key={post._id}
                  setAction={setAction}
                  isSuff={isSuff}
                  setIsSuff={setIsSuff}
                  setTopicId={setTopicId}
                  topicId={topicId}
                />
              ) : (
                <PostItem
                  isHiddenName={isHiddenName}
                  post={post}
                  setPostId={setPostId}
                  postId={postId}
                  state={action}
                  postDetail={undefined}
                  key={post._id}
                  setAction={setAction}
                />
              );
            })}
          </Masonry>
        </div>
        <div
          className={`${
            action !== STATUS_ABOUT_PAGE.DETAIL && 'hidden'
          } flex justify-start items-center text-white gap-2 w-fit bg-white/15 px-2 py-[6px] rounded-3xl ml-10 relative z-10`}>
          <div className='bg-[#000000] px-2 py-[5px]  rounded-xl uppercase text-[1.5rem]'>
            <button
              onClick={() => {
                scrollListTo(-(window.outerWidth / 5), true);
              }}
              className=' bg-white/30 px-4 rounded-xl  mr-2'
              type='button'>
              &lt;
            </button>
            <button
              onClick={() => {
                scrollListTo(window.outerWidth / 5, true);
              }}
              className=' bg-white/30 px-4 rounded-xl '
              type='button'>
              &gt;
            </button>
          </div>
          <button
            onClick={() => {
              setPostId(null);
              setIsSuff(true);
              setAction(STATUS_ABOUT_PAGE.LIST);
              setTopicId(null);
            }}
            className=' bg-[#000000] px-5 py-[10px] w-fit rounded-xl uppercase '
            type='button'>
            back
          </button>
        </div>
        <div
          className={`${action !== STATUS_ABOUT_PAGE.DETAIL && 'hidden'} mt-4`}>
          <PostDetail postId={postId} />
        </div>
      </div>
    </>
  );
}
