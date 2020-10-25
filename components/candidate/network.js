const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const labels = require('../../config/labels');
const { HttpStatusCode } = require('../../utils/http_helper');
const router = express.Router();

router.get('/:username', function (req, res) {
  const params = {
    username: req.params.username || undefined
  };
  if (typeof (params.username) !== 'undefined') {
    controller.getCandidateByUsername(params)
      .then((data) => {
        if ((typeof (data) !== 'undefined' && data.length > 0) || (typeof (data) === 'object')) {
          if (data.status === HttpStatusCode.OK){
            response.success(req, res, data, HttpStatusCode.OK);
          }else{
            response.error(req, res, data.error, data.status, data.error, data);
          }
        } else {
          response.error(req, res, labels.LABEL_EMPTY_DATA, HttpStatusCode.UNAUTHORIZED);
        }
      })
      .catch((e) => {
        response.error(req, res, labels.LABEL_ERROR_SERVER, HttpStatusCode.INTERNAL_SERVER_ERROR, (e));
      });
  } else {
    console.error(params);
    response.error(req, res, labels.LABEL_ERROR_SERVER, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error in the username, please check that its not empty');
  }
});

module.exports = router;
