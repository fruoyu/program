import request from '../utils/request';
import { headersPost, headersGet } from '../utils/Constants';

export async function changeOriginalList(params) {
  return request('/openApi/voiceQuality/getAudioResultApi', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function changeFilesListByid(params) {
  return request('/openApi/voiceQuality/getFilesListByid', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function changeFileResultApi(params) {
  return request('/openApi/voiceQuality/getFileResultApi', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function editItemLeft(params) {
  return request('/openApi/voiceQuality/ItemEditLeft', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}

