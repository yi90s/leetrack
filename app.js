
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

// logger
const winston = require('winston')
const expressWinston = require('express-winston')

// var usersRouter = require('@routes/users');
var problemRouter = require('@routes/protected/problems')
var authRouter = require('@routes/auth');
var indexRouter = require('@routes/index')
var attemptRouter = require('@routes/protected/attempts')
var auth = require('@lib/middleware/auth');
var cors = require('cors')

var app = express();

// jwt authentication
app.use('/api', auth.jwt());

// logger
// app.use(expressWinston.logger({
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({filename: 'combined.log'})
//   ],
//   format: winston.format.combine(
//     winston.format.colorize(),
//     winston.format.simple()
//   ),
//   meta: true,
//   msg: "HTTP {{req.method}} {{req.url}}",
//   expressFormat: true,
//   colorize: false
// }))

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/auth', authRouter);
// app.use('/api/users', usersRouter);
app.use('/api/problems', problemRouter);
app.use('/api/attempts', attemptRouter);

// // Serve any static files
// app.use(express.static(path.join(__dirname, 'client/build')));

// // Handle React routing, return all requests to React app
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
