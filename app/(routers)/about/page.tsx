import { posts_api } from '@/app/_api/posts';
import React, { useEffect, useRef, useState } from 'react';
import Introduce from './(components)/Introduce';
import { topics_api } from '@/app/_api/topic';

export default async function AboutPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [postId: string]: string | undefined };
}) {
  const posts = await posts_api.getPosts('all');
  const topics = await topics_api.getTopics();

  return (
    <div className=''>
      <Introduce
        // topicId={searchParams?.topicId}
        posts={posts}
        topics={topics}
        // postDetail={postDetail}
      />
    </div>
  );
}
