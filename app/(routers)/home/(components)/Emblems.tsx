import { emblems_api } from '@/app/_api/emblems';
import React from 'react';

export default async function Emblems() {
  const emblems = await emblems_api.getEmblems();

  return (
    <div>
      {emblems.map(({ image, name }: Category) => {
        return (
          <div>
            <img
              src={image}
              alt={name}
            />
          </div>
        );
      })}
    </div>
  );
}
