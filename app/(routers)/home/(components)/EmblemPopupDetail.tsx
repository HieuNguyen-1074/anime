import { emblems_api } from '@/app/_api/emblems';

export async function getEmblemDetail(emblemId: string | undefined) {
  'use server';
  if (!emblemId) return {};
  const emblem = await emblems_api.getEmblemDetail(emblemId);
  return emblem;
}
