import jwt from 'jsonwebtoken';

const getCookie = (target) => {
    // let cookie = document.cookie;
  let arr;
  const reg = new RegExp(`(^| )${target}=([^;]*)(;|$)`);
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  } else {
    return null;
  }
};
const setCookie = (name, data) => {
  document.cookie = `${name}=${data}`;
};
const delCookie = (name) => { // 为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
  const date = new Date();
  date.setTime(date.getTime() - 1);
  const cval = getCookie(name);
  if (cval != null) { document.cookie = `${name} = ${cval};expires = ${date.toGMTString()}`; }
};
// 生成token
const sign = (payload) => {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + 10, // 1h
    data: payload,
  }, 'moxilogin');
};
// 解析token
const verify = (ck) => {
  jwt.verify(getCookie('token'), 'moxilogin', (err, decoded) => {
    ck(err, decoded);
  });
};
// 判断token是否过期
const ifToken = (ck) => {
  verify((err) => {
    if (err) { // cookie 超时了;
      // 登出删除token
      delCookie('token');
      location.href = '/';
    } else {
      ck();
    }
  });
}
export { getCookie, setCookie, delCookie, sign, verify, ifToken };
