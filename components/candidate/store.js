const mysql = require('mysql');
const async = require('async');
const config = require('../../config/defineDatabase');
const filters = require('../../functions/functionsFilters');

const table = require('../../config/tables');
const statuses = require('../status/store');

const LVT_CASTING = require('../../config/defines').LVT_CASTING;

const connection = mysql.createConnection({
  host: config.HOSTNAME,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASENAME
});

function getPerson(params) {
  return new Promise((resolve, reject) => {
    let id = params.id || undefined;
    let offset = parseInt(params.offset) || 0;
    let limit = parseInt(params.limit) || undefined;
    let allstatus = params.allstatus || undefined;
    let statusCond = ` p.idpersonstatus != ${statuses.StatusEnum.DELETED}`;
    
    if(typeof(allstatus) === 'undefined' || allstatus <= 0) {
      statusCond = ` p.idpersonstatus = ${statuses.StatusEnum.ACTIVE} `;
    }
    
    let getResults = getSelectQuery(id, statusCond);

    if(typeof(id) === 'undefined') {
      if(typeof(limit) != 'undefined') {
        getResults += ` LIMIT ?,?;`;
      }
      connection.query(getResults, [offset, limit], function(err, row) {
        if(err) {
          console.log('[QUERY getField - ALL]: ' + this.sql);
          return reject(err);
        } else {
          let results;
          if(row.length > 0) {
            results = row;
          } else {
            results = undefined;
          }
          return resolve(results);
        }
      });
    } else {
      connection.query(getResults, [id], function(err, rows){
        if(err) {
          console.log('[QUERY getField - SINGLE]: ' + this.sql);
          return reject(err);
        } else {
          let results;
          if(rows.length > 0) {
            results = rows;
          } else {
            results = undefined;
          }
          return resolve(results);
        }
      });
    }
  });
}



module.exports = {
  getPerson
};
