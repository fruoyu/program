import request from '../utils/request';
import { headersPost } from '../utils/Constants';

export async function Login(params) {
  return request('/user/login', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function LoginOut(params) {
  return request('/user/logout', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function ChangePwd(params) {
  return request('/user/updatePassword ', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}

