var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const sign_up = require('./routes/api/member/sign_up');
const sign_in = require('./routes/api/member/sign_in');
const search_pw = require('./routes/api/member/search_pw');
const edit_member = require('./routes/api/member/edit_member');
const db = require('./database/db_connect');

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
    res.send({error});
  }  
})

// Log in | Sign in(input: email, pw) 

app.post('/API/Sign_in', (req, res) => {
  console.log("[Call Sign in API]");

  const userEmail = req.body.email;
  const userPw = req.body.pw;
  console.log(' 이제 들어감 ', )
  // tmp = sign_in.verification(userEmail, userPw);

  var con = db.conn();

  con.query('select * from member;', function(error, results, fields){
   if(error) throw error;
   console.log(results.length);
   tmp = results.length;
  //  res.json({status:res.statusCode, number: tmp});
  })  

  con.end();

  // if(tmp > 0){
  //   res.json({status: res.statusCode});
  // }else{
  //   console.log('error');
  //   res.send({error});
  // }
  
  // TODO database 연결해서 email, pw가 database에 담겨있는지 확인하고 있으면 있다고 보내고 없으면 없다고 보내면 된다.
})


app.get('/api', (req,res) => {
  const con = db.conn();

})

// search PW (input: email)

app.post('/API/Search_pw', (req, res) => {
  console.log("[Call Search pw API]");

  const userEmail = req.body.email; 

  search_pw.search(userEmail, (error, {})=> {
    if(error){
      console.log('error');
      return res.send({error})
    }

    res.json({status: res.statusCode});
  })
})



// edit account(input: pw, phone_number, name)

app.post('/API/Edit_member', (req, res) => {
  console.log("[Call Edit member API]");

  const userEmail = req.body.email; // PK로 가져와야할 거 같다고 생각이 들어서 HTML hidden 식으로 들고오면 될거 같다.
  const old_pw = req.body.old_pw;
  const new_pw = req.body.new_pw;
  const new_pw_check = req.body.new_pw_check;
  const phone_number = req.body.phone_number;
  const name = req.body.name;

  edit_member.edit(userEmail, old_pw, new_pw, new_pw_check, phone_number, name, (error, {}) => {
    if(error){
      console.log('error');
      return res.send({error})
    }

    res.json({status: res.statusCode});
  })

})

// session 도입하여 논의



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
