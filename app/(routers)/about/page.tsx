import { posts_api } from '@/app/_api/posts';
import React, { useEffect, useRef, useState } from 'react';
import Introduce from './(components)/Introduce';
import { topics_api } from '@/app/_api/topic';

export default async function AboutPage() {
  const posts = await posts_api.getPosts();
  const topics = await topics_api.getTopics();
  console.log(topics);
  return (
    <div className=''>
      <Introduce
        posts={posts}
        topics={topics}
      />
    </div>
  );
}
