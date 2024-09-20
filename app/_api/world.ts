import axios, { AxiosResponse } from 'axios';
import { API_PATH, CATEGORY, WORLDS } from './constant';

function getWorlds() {
  return axios
    .get(API_PATH + WORLDS)
    .then((response: AxiosResponse) => response.data)
    .catch((error: any) => console.log(error));
}

export const worlds_api = {
  getWorlds,
};
