const axios = require('axios');
const { HttpStatusCode } = require('../../utils/http_helper');

function getCandidateBioByUsername (username) {
  return new Promise((resolve, reject) => {
    axios.get('https://torre.bio/api/bios/' + username)
      .then((response) => {
        const responseData = {
          status: response.status,
          data: response.data
        };
        resolve(responseData);
      })
      .catch((error) => {
        if (error.response) {
          const responseData = {
            status: error.response.status,
            code: error.response.data.code,
            error: error.response.data.message
          };
          resolve(responseData);
        } else if (error.request) {
          reject(error.request);
        } else {
          reject(error.message);
        }
      });
  });
}


module.exports = {
  getCandidateBioByUsername
};
