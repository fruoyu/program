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
  return request('/openApi/voiceQuality/getNames', {
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
export async function getQueryKeyItem(params) {
  return request('/openApi/voiceQuality/QueryKeyItemBytaskId', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function deleteFiles(params) {
  return request('/openApi/voiceQuality/deleteInsight', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function changeCutsom(params) {
  return request('/openApi/voiceQuality/changeCutsom', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
