import { STATUS_ABOUT_PAGE } from '@/app/_assets/constants';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { Dispatch } from 'react';

export default function PostItem({
  post,
  state,
  isHiddenName,
  postId,
  setPostId,
  setAction,
}: {
  post: Post;
  state: string | null;
  isHiddenName: boolean;
  postDetail: Post | undefined;
  postId: string | null;
  setPostId: Dispatch<string | null>;
  setAction: Dispatch<string | null>;
}) {
  const onSelectPost = (id: string) => {
    if (state === STATUS_ABOUT_PAGE.INIT) return;
    if (state === STATUS_ABOUT_PAGE.DETAIL) {
      setPostId(id);
    } else {
      setAction(STATUS_ABOUT_PAGE.DETAIL);
      setTimeout(() => {
        setPostId(id);
      }, 1500);
    }
  };
  return (
    <div
      className={
        post._id +
        '' +
        (postId === post._id &&
          ' border-4 border-white rounded-2xl  scale-95') +
        (state === STATUS_ABOUT_PAGE.DETAIL ? ' h-[100px]' : ' h-[250px] ') +
        '  post text-white absolute opacity-0 hover:scale-95 cursor-pointer '
      }>
      <div
        className='post-bound w-full h-full overflow-hidden rounded-2xl'
        onClick={() => onSelectPost(post._id)}>
        {post?.mediaType.indexOf('video') !== -1 ? (
          <video
            className={
              'w-full h-full object-cover transition-all' +
              (postId === post._id && ' transition-all scale-50')
            }
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
            className={
              'w-full h-full object-cover  transition-all' +
              (postId === post._id && ' transition-all scale-75')
            }
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
}
