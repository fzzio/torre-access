const store = require('./store');

function getPerson(params) {
  return new Promise((resolve, reject) => {
    let id = params.id;
    if (typeof (id) === 'undefined') {
      resolve(store.getPerson(params));
    } else {

      let getDefaultField = function (opts = {}) {
        return new Promise((resolve, reject) => {
          store.getPerson(params)
            .then(data => {
              if(typeof(data) != 'undefined') {
                let defaultFields = data.map(obj => {
                  return {
                    idperson: obj.idperson,
                    dni: obj.dni,
                    firstname: obj.firstname,
                    lastname: obj.lastname,
                    gender: obj.gender,
                    height: obj.height,
                    weight: obj.weight,
                    city: obj.city,
                    countrycode: obj.countrycode,
                    dob: obj.dob,
                    age: obj.age,
                    email: obj.email,
                    phone1: obj.phone1,
                    phone2: obj.phone2,
                    ruc: obj.ruc,
                    observations: obj.observations,
                    address: obj.address,
                    manager: obj.manager,
                    skills: obj.skills,
                    created: obj.created,
                    modified: obj.modified,
                    idpersonstatus: obj.idpersonstatus,
                    createdby: obj.createdby,
                    modifiedby: obj.modifiedby,
                  }
                });
                opts.defaultfields = defaultFields[0];
              } else {
                opts.defaultfields = undefined
              }
              resolve(opts);
            })
            .catch(reject)
        });
      };


      getDefaultField()
      .then((opts) => {
        resolve(opts)
      })
      .catch(e => {
        reject(e);
      })
    }
  });
}

module.exports = {
  list: getPerson
}
