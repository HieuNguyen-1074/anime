import axios, { AxiosResponse } from 'axios';
import { API_PATH, CARD_WRAPPER, COLLECTORS } from './constant';
import { FetchServerResponseResult } from 'next/dist/client/components/router-reducer/fetch-server-response';

function getCollectors() {
  return fetch(API_PATH + COLLECTORS)
    .then((response: any) => response.json())
    .catch((error: any) => console.log(error));
}

export const collectors_api = {
  getCollectors,
};
