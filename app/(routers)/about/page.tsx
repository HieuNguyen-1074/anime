import { posts_api } from '@/app/_api/posts';
import React, { useEffect, useRef, useState } from 'react';
import Introduce from './(components)/Introduce';

export default async function AboutPage() {
  const posts = await posts_api.getPosts();
  return (
    <div className=''>
      <Introduce posts={posts} />
    </div>
  );
}
