const Login = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./routes/Login'));
  }, 'Login');
};
const History = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./routes/History'));
  }, 'History');
};
const UserPortrait = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./routes/UserPortrait'));
  }, 'UserPortrait');
};
const Main = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./routes/Main'));
  }, 'Main');
};
const Popup = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./routes/Popup'));
  }, 'Popup');
};
const NotFoundPage = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./routes/NotFoundPage'));
  }, '404');
};
export default {
  Login,
  History,
  UserPortrait,
  Main,
  Popup,
  NotFoundPage,
};
