/* eslint import/no-extraneous-dependencies: 'off' */

import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import webpack from 'webpack';
import config from './webpack.config';

import index from './routes/index';
import users from './routes/users';
import students from './routes/students';

import seedDB from './seed';

require('dotenv').config();

// var index = require('./routes/index');
// var users = require('./routes/users');

const app = express();
const compiler = webpack(config);

mongoose.promise = global.Promise;
switch (process.env.ENV) {
  case 'development':
    console.log('development');
    mongoose.connect(process.env.mongoDBDev, {
      useMongoClient: true,
    });
    break;
  case 'production':
    console.log('production');
    mongoose.connect(process.env.mongoDBProd, {
      useMongoClient: true,
    });
    break;
  default:
    throw new Error(`Unknown execution environment: ${process.env.ENV}`);
}

seedDB();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../public', 'images/favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(require('webpack-dev-middleware')(compiler, {
  quiet: false,
  noInfo: false,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));

app.use('/', index);
app.use('/users', users);
app.use('/students', students);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
export default app;

