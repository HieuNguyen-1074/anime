import axios, { AxiosResponse } from 'axios';
import { API_PATH, CARD_WRAPPER, COLLECTORS, EMBLEMS } from './constant';
import { FetchServerResponseResult } from 'next/dist/client/components/router-reducer/fetch-server-response';

function getEmblems() {
  return fetch(API_PATH + EMBLEMS, { cache: 'no-store' })
    .then((response: any) => response.json())
    .catch((error: any) => console.log(error));
}

export const emblems_api = {
  getEmblems,
};
