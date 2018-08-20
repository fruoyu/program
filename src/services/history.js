import request from '../utils/request';
import { headersPost } from '../utils/Constants';

export async function getFilesList(params) {
  return request('/openApi/voiceQuality/getFilesListByid', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function getName(params) {
  return request('/user/getName', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function getSingleData(params) {
  return request('/openApi/voiceQuality/getFileResultApi', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}