const { HttpStatusCode } = require('../../utils/http_helper');
const store = require('./store');

function getCandidateByUsername (params) {
  return new Promise((resolve, reject) => {
    const username = params.username;

    if (typeof (username) === 'undefined') {
      reject(new Error('Parameter not defined or empty'));
    } else {
      store.getCandidateByUsername(username)
        .then((result) => {
          if (result.status === HttpStatusCode.OK) {
            const personInfo  = result.data.person;
            const candidateInfo = {
              canidateId: personInfo.subjectId,
              id: personInfo.id,
              username: personInfo.publicId,
              phone: personInfo.phone,
              name: personInfo.name,
              picture: personInfo.picture,
              pictureThumbnail: personInfo.pictureThumbnail,
              summaryOfBio: personInfo.summaryOfBio,
              professionalHeadline: personInfo.professionalHeadline
            };
            console.log('Candidate Info');
            console.log(candidateInfo);
            resolve(candidateInfo);
          } else {
            resolve(result);
          }
        })
        .catch(reject);
    }
  });
}

module.exports = {
  getCandidateByUsername
};
