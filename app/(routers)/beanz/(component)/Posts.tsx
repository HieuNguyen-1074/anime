import React from 'react';
import postIcon from '@/app/_assets/_images/beanz/image15.jpg';
import Image from 'next/image';
import { beanz_api } from '@/app/_api/beanz';

export default async function Posts({}: {}) {
  const beanzPost = await beanz_api.getBeanzPosts();
  return (
    <div className='relative flex items-start w-auto bg-white lg:mx-32 mt-24 p-5 box-border rounded-3xl  overflow-hidden mb-32'>
      <Image
        className='w-[700px] absolute top-0 left-0 z-[1]'
        src={postIcon}
        alt='post icon'
      />
      <div className='flex flex-col justify-start w-fit gap-2 ml-auto relative z-10'>
        {beanzPost.map((post: Post, index: number) => {
          return (
            <div
              key={index}
              className='flex gap-24 w-full lg:w-[900px] h-[150px] items-center bg-[#eeeeee] p-4 pr-0 overflow-hidden rounded-3xl hover:bg-black hover:text-white cursor-pointer '>
              <div>
                <p className='text-[1.5rem] mb-4'>{post.name}</p>
                <p>{post.shortDescription}</p>
              </div>
              <img
                className='w-[200px] rounded-3xl object-cover'
                src={post.mediaLink}
                alt=''
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
