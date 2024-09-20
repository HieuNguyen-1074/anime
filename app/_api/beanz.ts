import axios, { AxiosResponse } from 'axios';
import { API_PATH, BEANZ, BEANZ_POST } from './constant';

function getBeanz() {
  return axios
    .get(API_PATH + BEANZ)
    .then((response: AxiosResponse) => response.data)
    .catch((error: any) => console.log(error));
}
function getBeanzPosts() {
  return axios
    .get(API_PATH + BEANZ_POST)
    .then((response: AxiosResponse) => response.data)
    .catch((error: any) => console.log(error));
}

export const beanz_api = {
  getBeanz,
  getBeanzPosts,
};
