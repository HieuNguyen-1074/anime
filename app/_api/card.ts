import axios, { AxiosResponse } from 'axios';
import {
  API_PATH,
  CARD_WRAPPER,
  CARD_HIGHLIGHT,
  CARD_BY_CATEGORY,
} from './constant';

function getCardWrapper() {
  return axios
    .get(API_PATH + CARD_WRAPPER)
    .then((response: AxiosResponse) => response.data)
    .catch((error: any) => console.log(error));
}

function getCardHighlight() {
  return axios
    .get(API_PATH + CARD_HIGHLIGHT)
    .then((response: AxiosResponse) => response.data)
    .catch((error: any) => console.log(error));
}

function getCardsByCategory(
  categoryId: string | null | undefined,
  pageSize: number,
  pageNo: number
) {
  return axios
    .get(
      API_PATH +
        CARD_BY_CATEGORY +
        (categoryId || 'ALL' + '/pageSize=' + pageSize + '&&pageNo=' + pageNo)
    )
    .then((response: AxiosResponse) => response.data)
    .catch((error: any) => console.log(error));
}

export const cards_api = {
  getCardWrapper,
  getCardHighlight,
  getCardsByCategory,
};
