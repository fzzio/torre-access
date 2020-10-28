const { HttpStatusCode } = require('../../utils/http_helper');
const store = require('./store');

class Candidate {
  constructor (candidate) {
    this.person = candidate.person;
    this.person.location = candidate.person.location.name || '';
    this.experiences = candidate.experiences || [];
    this.interests = candidate.interests || [];
    this.jobs = candidate.jobs || [];
    this.projects = candidate.projects || [];
    this.languages = candidate.languages || [];
    this.strengths = candidate.strengths || [];
    this.professionalCultureGenomeResults = candidate.professionalCultureGenomeResults || [];
  }

  getBasicBio () {
    const { person } = this;

    return {
      candidateId: person.subjectId,
      username: person.publicId,
      name: person.name,
      picture: person.picture,
      pictureThumbnail: person.pictureThumbnail,
      summaryOfBio: person.summaryOfBio,
      professionalHeadline: person.professionalHeadline,
      location: person.location
    };
  }

  getExperiences () {
    const { experiences } = this;
    return (experiences || []).map((experience, indexItem) => {
      return {
        name: experience.name,
        duration: (experience.fromMonth ? experience.fromMonth + ' ' + experience.fromYear + ' to ' : '') + (experience.toMonth ? experience.toMonth + ' ' + experience.toYear : 'Present'),
        organizations: (experience.organizations || []).map((organization) => {
          return organization.name;
        }).join(', ')
      };
    });
  }

  getStrengths () {
    const { strengths } = this;
    return (strengths || []).map((strength, indexItem) => {
      return strength.name;
    }).join(', ');
  }

  getInterests () {
    const { interests } = this;
    return (interests || []).map((interest, indexItem) => {
      return interest.name;
    }).join(', ');
  }

  getJobs () {
    const { jobs } = this;
    return (jobs || []).map((job, indexItem) => {
      return {
        name: job.name,
        duration: (job.fromMonth ? job.fromMonth + ' ' + job.fromYear + ' to ' : '') + (job.toMonth ? job.toMonth + ' ' + job.toYear : 'Present'),
        organizations: (job.organizations || []).map((organization) => {
          return organization.name;
        }).join(', ')
      };
    });
  }

  getProfessionalCulture () {
    const { professionalCultureGenomeResults } = this;
    return (professionalCultureGenomeResults.groups || []).map((group, indexItem) => {
      return group.text;
    }).join(', ');
  }

  getExtendedBio () {
    return {
      basicBio: this.getBasicBio(),
      experiences: this.getExperiences(),
      strengths: this.getStrengths(),
      interests: this.getInterests(),
      jobs: this.getJobs(),
      professionalCulture: this.getProfessionalCulture()
    };
  }
}

function getCandidateSimpleBioByUsername (params) {
  return new Promise((resolve, reject) => {
    const username = params.username;

    if (typeof username === 'undefined') {
      reject(new Error('Parameter not defined or empty'));
    } else {
      store.getCandidateBioByUsername(username)
        .then((result) => {
          const status = result.status;
          if (result.status === HttpStatusCode.OK) {
            const candidateObj = new Candidate(result.data);
            resolve({
              status: status,
              data: candidateObj.getBasicBio()
            });
          } else {
            resolve(result);
          }
        })
        .catch(reject);
    }
  });
}

function getCandidateExtendedBioByUsername (params) {
  return new Promise((resolve, reject) => {
    const username = params.username;

    if (typeof username === 'undefined') {
      reject(new Error('Parameter not defined or empty'));
    } else {
      store.getCandidateBioByUsername(username)
        .then((result) => {
          const status = result.status;
          if (result.status === HttpStatusCode.OK) {
            const candidateObj = new Candidate(result.data);
            resolve({
              status: status,
              data: candidateObj.getExtendedBio()
            });
          } else {
            resolve(result);
          }
        })
        .catch(reject);
    }
  });
}

function searchCandidatesBySkills (opts) {
  return new Promise((resolve, reject) => {
    const { skills, size, offset } = opts;

    if (typeof skills === 'undefined') {
      reject(new Error('Parameter not defined or empty'));
    } else {
      const params = {
        skills: skills.split(',')
      };

      store.searchCandidatesByParam(params, size, offset)
        .then((result) => {
          const status = result.status;
          if (result.status === HttpStatusCode.OK) {
            const candidatesObj = (result.data.results || []).map((person, index) => {
              return {
                candidateId: person.subjectId,
                username: person.username,
                name: person.name,
                picture: person.picture,
                pictureThumbnail: person.picture,
                location: person.locationName,
                professionalHeadline: person.professionalHeadline,
                skills: (person.skills || []).map((skill, index) => {
                  return skill.name;
                }).join(', ')
              };
            });
            resolve({
              status: status,
              data: {
                results: candidatesObj,
                resultCount: result.data.total
              }
            });
          } else {
            resolve(result);
          }
        })
        .catch(reject);
    }
  });
}

module.exports = {
  getCandidateSimpleBioByUsername,
  getCandidateExtendedBioByUsername,
  searchCandidatesBySkills
};
