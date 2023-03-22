// TODO database 연결해서 email, pw가 database에 담겨있는지 확인하고 있으면 있다고 보내고 없으면 없다고 보내면 된다.
const db = require("../../../database/db_connect");
;
exports.verification = function sign_in(userEmail, userPw) {
    
    // function sign_up(userEmail, userEmailCheck, userPw, userPwCheck, userPhone_number, userName) {
  
    var con = db.conn();

   con.query('select * from member where email = ? and pw =?;',[userEmail, userPw], function(error, results, fields){
    if(error) throw error;
    else{
        console.log(results.length)
        return results.length;
    }   

})


con.end();

}

// const email = "kimms5617@naver.com";
// const pw = "qweasd123!";

// console.log(sign_in(email, pw));