import $ from 'jquery';
import '../utils/md5.js';
import request from '../utils/request';
import { headersPost, headersGet } from '../utils/Constants';

export async function Login(params) {
  return request(`/user/login?userName=${params.userName}&password=${$.md5(params.password)}`, {
    method: 'post',
    headers: headersGet,
  });
}
export async function LoginOut(params) {
  return request('/user/loginout', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function ChangePwd(params) {
  return request('/user/changePwd', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
