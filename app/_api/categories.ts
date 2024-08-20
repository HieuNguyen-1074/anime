import axios, { AxiosResponse } from 'axios';
import { API_PATH, CATEGORY } from './constant';

function getCategories() {
  return axios
    .get(API_PATH + CATEGORY)
    .then((response: AxiosResponse) => response.data)
    .catch((error: any) => console.log(error));
}

export const categories_api = {
  getCategories,
};
