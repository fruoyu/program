import request from '../utils/request';
import { headersPost, headersGet } from '../utils/Constants';

export async function changeAssignRolesList(params) {
  return request('/admin/assignroles/getAssignRolesList', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function deleteAssignRoles(params) {
  return request('/admin/assignroles/deleteAssignRoles', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function changeDepartmentName(params) {
  return request('/admin/assignroles/updateAssignRoles', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function distributionUsers(params) {
  return request('/admin/assignroles/distributionAssignRoles', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function searchUsers(params) {
  return request('/admin/assignroles/qWhetherBingUser', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}
export async function addStructure(params) {
  return request('/admin/assignroles/addAssignRoles', {
    method: 'post',
    headers: headersPost,
    body: JSON.stringify(params),
  });
}