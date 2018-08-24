import request from '../utils/request';
import { headersPost } from '../utils/Constants';

export async function sGetClientList(params) {

  // FIXME: 接口还没出，下面接口是模拟的，功能需完善
  return request('/user/getClientList', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}