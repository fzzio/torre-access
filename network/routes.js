const candidate = require('../components/candidate/network');

const router = function (server) {
  server.use('/candidate', candidate);
};

module.exports = router;
