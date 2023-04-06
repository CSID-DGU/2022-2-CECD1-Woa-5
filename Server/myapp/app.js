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
const make_number = require('./routes/api/member/make_number');
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

const cors = require('cors');
app.use(cors({
  origin: "http://localhost:19006",
  credentials: true,
}));

// Sign Up (input: email, email(check), pw, pw(check), phone_number, name)

app.post('/API/Sign_up', (req, res) => {
  console.log("[Call Sign up API]");

  const userEmail = req.body.email;
  const userEmailCheck = req.body.emailCheck;
  const userPw = req.body.pw;
  const userPwCheck = req.body.pwCheck;
  const userPhone_number = req.body.phone_number;
  const userName = req.body.name;
  const manage_number = req.body.opponent_number;
  const Verify_number = req.body.Verify_number;

  var con = db.conn();
  con.query('SELECT * FROM member where email = ?', [userEmail], function(error, results, fields){
    if(error) throw error
    if(results.length > 0){
      res.json({status: res.statusCode, check : null}); // 이미 존재한다.
    }
    con.query('SELECT * FROM call_member where phone_number = ?',[userPhone_number], function(error, results, fields){
      if(error) throw error
      if(results.length > 0){
        console.log(results[0].verification);
        if(Verify_number != results[0].verification){
          res.json({status: res.statusCode, check : "인증번호 틀림"}); // 인증 번호와 맞지가 않는다. 
        }else{
          const check = sign_up.verification(userEmail, userEmailCheck, userPw, userPwCheck, userPhone_number, userName, manage_number); 
          console.log(check);
          if(check == 0){
            con.query('insert into member values(?, ?, ?, ?, ?, ?);',[userEmail, userPw, userPhone_number, userName, manage_number, Verify_number], function(error, results, fields){
              if(error) throw error;
              console.log('회원 가입 완료');
              res.json({status: res.statusCode, check : true});
          })
        }else{
          res.json({status: res.statusCode, check : check});
        }
        }
      }else{
        res.json({status: res.statusCode, check : "이것간?"}); // 존재하지 않는 연락처이므로 인증 실패
      }
    })
  })
})

// Log in | Sign in(input: email, pw) 

app.post('/API/Sign_in', (req, res) => {
  console.log("[Call Sign in API]");

  const userEmail = req.body.email;
  const userPw = req.body.pw;
  // tmp = sign_in.verification(userEmail, userPw);

  var con = db.conn();
  
  con.query('select * from member where email = ? and pw =?;',[userEmail, userPw], function(error, results, fields){
    if(error) throw error;
    else{
        // console.log(results.length);
        if(results.length > 0){
          res.json({status: res.statusCode, check: true});
        }else{
          res.json({status: res.statusCode, check: false});
        }
        
    }   
  })

  con.end();
   // 있으면 1, 없으면 0
  
  // database 연결해서 email, pw가 database에 담겨있는지 확인하고 있으면 있다고 보내고 없으면 없다고 보내면 된다.
})


// search PW (input: email)

app.post('/API/Search_pw', (req, res) => {
  console.log("[Call Search pw API]");

  const userEmail = req.body.email; 

  var con = db.conn();
  con.query('SELECT pw, phone_number from member where email = ?', [userEmail], function(error, results, fields){
    if(error) throw error;
    if(results.length > 0){
      // console.log(results.length);
      // console.log(results[0].phone_number);
      res.json({status: res.statusCode, pw: search_pw.search(userEmail, results[0].phone_number)});
    }else{
      res.json({status: res.statusCode, pw: null }); // 없음
    }  
  })
  con.end();
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

  var con = db.conn();
  con.query('SELECT pw from member where email = ?',[userEmail], function(error, results, fields){
    console.log(results[0].pw);
    console.log(old_pw);
    if(old_pw == results[0].pw){
      if(edit_member.edit(userEmail, old_pw, new_pw, new_pw_check, phone_number, name)){
        con.query('UPDATE member SET pw = ?, phone_number =?, name=? where email = ?',[new_pw, phone_number, name, userEmail], function(error, results, fields){
          if(error) throw error;
          console.log('수정완료')
          res.json({status: res.statusCode, check: true});
        })
      }else{
        res.json({status: res.statusCode, check: false });
      }
    }else{
      console.log("no");
      res.json({status: res.statusCode, check: false });
    }

})

})

app.post('/API/Get_number', (req, res) => {
  console.log("[Call Get number API]");

  const userEmail = req.body.email; // PK

  var con = db.conn();

  con.query('SELECT opponent_number from member where email = ?', [userEmail], function(error, results, fields){
    if(error) throw error;
    if(results.length > 0){ // 해당하는 값 존재여부
      // console.log(results.length);
      // console.log(results[0].phone_number);
      res.json({status: res.statusCode, number: results[0].opponent_number});
    }else{
      res.json({status: res.statusCode, number: null }); // 없음
    }  
  })

})

app.post('/API/Verify_number', (req, res) =>{
  console.log("[Call Verify number API]");
  const number = req.body.phone_number;
  console.log(number)
  const check = make_number.make(number);
  console.log(check)
  if(check){
    var con = db.conn();
    con.query('insert into call_member values(?, ?);',[number, check], function(error, results, fields){
      if(error) throw error
      res.json({status: res.statusCode, number: true});
    })
  }else{
    res.json({status: res.statusCode, number: null});
  }
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
