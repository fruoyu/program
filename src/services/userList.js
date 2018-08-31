import request from '../utils/request';
import { headersPost } from '../utils/Constants';

export async function getUserList(params) {
  return request('/user/getUsers', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function deleteUser(params) {
  return request('/user/deleteUser', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function revisePwd(params) {
  return request('/user/resetPwd', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
