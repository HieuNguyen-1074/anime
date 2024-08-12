import axios, { AxiosResponse } from 'axios';
import { API_PATH, CARD_WRAPPER, CARD_HIGHLIGHT } from './constant';

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

export const cards_api = {
  getCardWrapper,
  getCardHighlight,
};
