import axios, { AxiosResponse } from 'axios';
import { API_PATH, POSTS } from './constant';

function getPosts() {
  return axios
    .get(API_PATH + POSTS)
    .then((response: AxiosResponse) => response.data)
    .catch((error: any) => console.log(error));
}

export const posts_api = {
  getPosts,
};
