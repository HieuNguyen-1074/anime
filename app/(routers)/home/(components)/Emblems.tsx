import { emblems_api } from '@/app/_api/emblems';
import Move3D from '@/app/_components/Move3D';
import React from 'react';
import EmblemsList from './EmblemsList';

export default async function Emblems() {
  const emblems = await emblems_api.getEmblems();

  return (
    <div>
      <div>
        <p className='text-[1.4rem] ml-2'>Emblems</p>
        <EmblemsList emblems={emblems} />
      </div>
    </div>
  );
}
