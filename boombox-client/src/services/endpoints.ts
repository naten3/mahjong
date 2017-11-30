const ROOT = process.env.NODE_ENV === 'production' ? 'https://boombox-server.herokuapp.com' : 'http://localhost:3000';

export default {
  auth: {
    joinRoom: `${ROOT}/session`
  },
  search: {
    bulk: `${ROOT}/search`
  },
  queue: {
    main: `${ROOT}/queue`
  }
};
