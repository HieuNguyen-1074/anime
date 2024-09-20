import React from 'react';
import BeanzShow from './BeanzShow';
import { beanz_api } from '@/app/_api/beanz';
import BeanzList from './BeanzList';
import Posts from './Posts';
import Music from './Music';

export default async function Wrapper() {
  const beanzs = await beanz_api.getBeanz();
  return (
    <div>
      <BeanzShow beanzs={beanzs} />
      <BeanzList beanzs={beanzs} />
      <Posts />
    </div>
  );
}
