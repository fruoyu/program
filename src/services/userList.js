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
export async function addUser(params) {
  return request('/user/addUser', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function updateUser(params) {
  return request('/user/updateUser', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function construction(params) {
  return request('/admin/assignroles/queryAllConstruction', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
