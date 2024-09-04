import React from 'react';

export default function PostItem() {
  return (
    <div
      key={post._id}
      className={
        post._id +
        (state === 2 ? ' h-[150px]' : ' h-[300px] ') +
        '  post text-white absolute    hover:scale-95 cursor-pointer ' +
        (postDetail?._id === post._id && ' opacity-50 ')
      }>
      <div className='post-bound w-full h-full overflow-hidden rounded-2xl'>
        {post._id === 'menu' && !post?.mediaType ? (
          <div className='px-2 flex flex-col justify-center items-center h-full '>
            <div className='w-[80%]'>
              {topics.map((topic: Topic) => {
                return (
                  <div
                    onClick={() =>
                      router.push('/about/' + '?topicId=' + topic._id)
                    }
                    className={
                      'group flex justify-between items-center bg-[#59595933] px-7 py-[10px] w-full rounded-full mb-[4px] uppercase ' +
                      (topicId === topic._id && 'bg-red-400')
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
                  shuffleChange(0);
                }}
                className='flex-1 bg-[#000000] px-5 py-[10px] rounded-full uppercase '
                type='button'>
                back
              </button>
            </div>
          </div>
        ) : post?.mediaType.indexOf('video') !== -1 ? (
          <video
            onClick={() => state === 1 && shuffleChange(2)}
            className='w-full h-full object-cover transition-all'
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
            className='w-full h-full object-cover  transition-all'
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
