import request from '../utils/request';
import { headersPost, headersGet } from '../utils/Constants';

export async function ChangePictureDetails(params) {
  console.log(params)
  return request('/openApi/voiceQuality/getAudioResultApi', {
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
