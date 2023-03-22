// database 연결 구조
const db = require("mysql");
require("dotenv").config(); // .env 하기 위한 dotenv 라이브러리 

module.exports.conn = function(){
    const conn = db.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    });
    conn.connect(function(err){
        if(err){
            console.error('에러 connect:' + err.stack);
            return;
        }
        console.log("Mysql DB Connect완료! ID : " + conn.threadId);
        
    });
    return conn;
   
}

const con = this.conn();
// con.connect();

con.query('SELECT * from member', (error, rows, fields) => {
  if (error) throw error;
  console.log('User info is: ', rows); // RowDataPacket 정보 출력
  console.log('User info is: ', rows[1]); // 배열의 순서에 해당하는 행 보여줌.
});

con.end();