import $ from 'jquery';
import '../utils/md5.js';
import request from '../utils/request';
import { headersPost, headersGet } from '../utils/Constants';

export async function Login(params) {
  return request(`/user/login?userName=${params.userName}&password=${$.md5(params.password)}`, {
    method: 'post',
    headers: headersGet,
// stringify(params),
  });
}
