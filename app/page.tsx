import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  return (
    <>
      <div className='text-white w-full flex flex-col justify-center items-center h-screen '>
        <p>
          Hi ! Guys . this is clone website of azuki website but i'm not clone
          all page and i also change some points. if you dont know this website
          still have the backend but its just get data from moogoDb. This is
          some page that i cloned
        </p>

        <Link
          href='/about'
          className='mt-10'>
          About page
        </Link>
        <Link href='/home'>Home page </Link>
        <Link href='/beanz'>Beanz page </Link>
        <Link href='/worlds'>Worlds page </Link>
      </div>
    </>
  );
}
