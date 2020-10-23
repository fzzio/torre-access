var cors = require('cors')
const express = require('express');
const router = require('./network/routes');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const {
  PORT = 3000,
  NODE_ENV = 'development'
} = process.env;


app.use(cors());

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST,PUT,GET,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, apikey');

  next();
});

router(app);

app.listen(PORT, () => {
  console.log(`server on port ${process.env.PORT}`);
});
