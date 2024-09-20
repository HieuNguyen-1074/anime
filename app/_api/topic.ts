import axios, { AxiosResponse } from 'axios';
import { API_PATH, TOPICS } from './constant';

function getTopics() {
  return axios
    .get(API_PATH + TOPICS)
    .then((response: AxiosResponse) => response.data)
    .catch((error: any) => console.log(error));
}

export const topics_api = {
  getTopics,
};
