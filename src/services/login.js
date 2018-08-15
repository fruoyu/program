import request from '../utils/request';
import { headersPost, headersGet } from '../utils/Constants';

export async function Login(params) {
  return request('/api/user/login', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
