import Image from 'next/image';
import Wrapper from './(components)/Wrapper';

export default async function Home() {
  return (
    <div className=' w-full h-screen bg-[url("https://azk.imgix.net/dragon_azukis/ikz1_3602.png?fm=jpg")] bg-no-repeat bg-cover'>
      <Wrapper />
    </div>
  );
}
