var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const sign_up = require('./routes/api/member/sign_up');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// Sign Up (input: email, email(check), pw, pw(check), phone_number, name)

app.post('/API/Sign_up', (req, res) => {
  console.log("[Call Sign up API]");

  const userEmail = req.body.email;
  const userEmailCheck = req.body.emailCheck;
  const userPw = req.body.pw;
  const userPwCheck = req.body.pwCheck;
  const userPhone_number = req.body.phone_number;
  const userName = req.body.name;

  
  if(sign_up.verification(userEmail, userEmailCheck, userPw, userPwCheck, userPhone_number, userName)){
    res.json({status: res.statusCode});
  }else{
    console.log('error');
    return res.send({error});
  }  
})

// Log in | Sign in(input: email, pw) 




// edit account(input: pw, phone_number, name)



// session 도입하여 삭제.



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
