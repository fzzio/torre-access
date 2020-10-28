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
            error: error.response.data.error,
            message: error.response.data.message
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

function searchCandidatesByParam (params, size, offset) {
  return new Promise((resolve, reject) => {
    const url = 'https://search.torre.co/people/_search/?page=0&aggregate=true&offset=' + offset + '&size=' + size;
    const data = params.skills.map((skill, index) => {
      return {
        skill: {
          term: skill,
          experience: '1-plus-year'
        }
      };
    });

    axios.post(
      url,
      {
        and: data
      }
    )
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
            error: error.response.data.error,
            message: error.response.data.message
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
  getCandidateBioByUsername,
  searchCandidatesByParam
};
