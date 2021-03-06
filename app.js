const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const config = require('./config/config');
const cors = require('cors');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const cartRouter = require('./routes/cart');
const productsRouter = require('./routes/products');
const profileRouter = require('./routes/profile');
const storesRouter = require('./routes/stores')
const usersRouter = require('./routes/users');
const purchasesRouter = require('./routes/purchases');
const salesRouter = require('./routes/sales');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Permitir CORS
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200
}));

app.use(`${config.basePath}/`, indexRouter);
app.use(`${config.basePath}/auth`, authRouter);
app.use(`${config.basePath}/cart`, cartRouter);
app.use(`${config.basePath}/products`, productsRouter);
app.use(`${config.basePath}/profile`, profileRouter);
app.use(`${config.basePath}/stores`, storesRouter);
app.use(`${config.basePath}/users`, usersRouter);
app.use(`${config.basePath}/purchases`, purchasesRouter);
app.use(`${config.basePath}/sales`, salesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
