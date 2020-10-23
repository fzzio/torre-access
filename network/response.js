const statusMessages = {
  200: 'Done',
  201: 'Create',
  400: 'Invalid Format',
  404: 'Not found',
  500: 'Internal Error',
}

exports.success = function(req, res, message, status) {
  let statusCode = status;
  let statusMessage = message;

  if(!status) {
    statusCode = 200;
  }

  if(!message) {
    statusMessage = statusMessages[status];
  }

  res.status(statusCode).send({
    error: '',
    data: statusMessage,
  });
}

exports.error = function(req, res, error, status, details) {
  let statusCode = status;
  let statusMessageError = error;

  if(!status) {
    statusCode = 500;
  }

  if(!error) {
    statusMessageError = statusMessages[status];
  }

  console.error('[response error]: ' + details)
  res.status(statusCode).send({
    error: statusMessageError,
    data: ''
  });
}
