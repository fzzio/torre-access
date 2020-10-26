const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const labels = require('../../config/labels');
const { HttpStatusCode } = require('../../utils/http_helper');
const router = express.Router();

router.get('/simple/:username', function (req, res) {
  const params = {
    username: req.params.username || undefined
  };
  if (typeof (params.username) !== 'undefined') {
    controller.getCandidateSimpleBioByUsername(params)
      .then((result) => {
        if ((typeof (result) !== 'undefined' && result.length > 0) || (typeof (result) === 'object')) {
          if (result.status === HttpStatusCode.OK){
            response.success(req, res, result.data, HttpStatusCode.OK);
          }else{
            response.error(req, res, result.error, result.status, result.error, result);
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

router.get('/extended/:username', function (req, res) {
  const params = {
    username: req.params.username || undefined
  };
  if (typeof params.username !== 'undefined') {
    controller.getCandidateExtendedBioByUsername(params)
      .then((result) => {
        if ((typeof result !== 'undefined' && result.length > 0) || (typeof result === 'object')) {
          if (result.status === HttpStatusCode.OK){
            response.success(req, res, result.data, HttpStatusCode.OK);
          }else{
            response.error(req, res, result.error, result.status, result.error, result);
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

router.post('/search/', function (req, res) {
  let opts = {
    skills: req.body.skills || '',
    size: req.body.size || 5,
    offset: req.body.offset || 0
  }
  if(opts.size <= 0) {
    response.error(req, res, labels.LABEL_ERROR_SERVER, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error in params value.');
  } else {
    controller.searchCandidatesBySkills(opts)
      .then((result) => {
        if ((typeof (result) !== 'undefined' && result.length > 0) || (typeof (result) === 'object')) {
          if (result.status === HttpStatusCode.OK){
            response.success(req, res, result.data, HttpStatusCode.OK);
          }else{
            response.error(req, res, result.error, result.status, result.error, result);
          }
        } else {
          response.error(req, res, labels.LABEL_EMPTY_DATA, HttpStatusCode.UNAUTHORIZED);
        }
      })
      .catch((error) => {
        response.error(req, res, labels.LABEL_ERROR_SERVER, HttpStatusCode.INTERNAL_SERVER_ERROR, error);
      });
  }
});


module.exports = router;
