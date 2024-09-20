import axios, { AxiosResponse } from 'axios';
import { API_PATH, POSTS } from './constant';

function getPosts(topicId: string) {
  return axios
    .get(API_PATH + POSTS + '?topicId=' + topicId)
    .then((response: AxiosResponse) => response.data)
    .catch((error: any) => console.log(error));
}
async function getPostById(postId: string | null) {
  try {
    const post = await axios.get(API_PATH + POSTS + postId);
    return post.data;
  } catch (error) {
    return error;
  }
}
export const posts_api = {
  getPosts,
  getPostById,
};
