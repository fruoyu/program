import request from '../utils/request';
import { headersPost } from '../utils/Constants';

export async function sGetClientList(params) {

  // FIXME: 接口还没出，下面接口是模拟的，功能需完善
  return request('/admin/customer/customerquery.json', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function sAddClient(params) {
  return request('/admin/customer/customeradd.json', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function sUpdateClient(params) {
  return request('/admin/customer/customerupdate.json', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function sDelClient(params) {
  return request('/admin/customer/customerdelete.json', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}

