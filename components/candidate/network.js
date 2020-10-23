const express = require('express');
const moment = require('moment');
const controller = require('./controller');
const response = require('../../network/response');
const { LVT_PERSON } = require('../../config/defines');
const labels = require('../../config/labels');
const { HttpStatusCode } = require('../../utils/http_helper');
const router = express.Router();

router.get('/', function (req, res) {
  const params = {
    username: req.query.username || undefined
  };
  if (typeof (params.idmodule) !== 'undefined') {
    controller.list(params)
      .then(data => {
        if ((typeof (data) !== 'undefined' && data.length > 0) || (typeof (data) === 'object' && typeof (data.defaultfields) !== 'undefined')) {
          response.success(req, res, data, 200);
        } else {
          response.error(req, res, labels.LABEL_EMPTY_DATA, HttpStatusCode.UNAUTHORIZED);
        }
      })
      .catch(e => {
        response.error(req, res, labels.LABEL_ERROR_SERVER, HttpStatusCode.INTERNAL_SERVER_ERROR, e);
      });
  } else {
    console.error(params);
    response.error(req, res, labels.LABEL_ERROR_SERVER, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error in the id module, please check that its not empty');
  }
});



module.exports = router;
