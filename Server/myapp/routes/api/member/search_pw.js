/**
 * email 받고 해당하는 임시비밀번호를 보여주고 데이터베이스도 임시비밀번호로 바꾼다. (임시비밀번호는 난수 생성프로그램으로 보여주면 될거 같다.) 
 * email로 임시비밀번호를 보내주는 것으로 하면, 단지 웹 상에서 보여주는 것보다 보안성이 크다.
 * (추가 고려)추가로 시간이 생긴다면, 이메일로 인증하는 과정을 거쳐 2번 인증하는 수단도 고려해보면 보완성이 클 것이다.
 */
const db = require("../../../database/db_connect");
// const nodemailer = require('nodemailer');

const config = require('./number.json');
const CryptoJS = require("crypto-js");
const axios = require("axios");

exports.search = function search_pw(userEmail, phone_number) {
    
    try{
        
    // TODO 요청된 이메일이 데이터베이스 상에 있는지 확인해야한다.
    // issue: 사용자 전화번호,     
    var con = db.conn();

    // 임시비밀번호 생성
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`{}[]:;<>?,./|";
    for( var i=0; i < 10; i++ ) // 10자에 해당하는 난수 임시 비밀번호를 줄 예정
    {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    


    const user_phone_number = phone_number;
    const date = Date.now().toString(); // 날짜 string

    // 환경 변수
    const sens_service_id = config.NCP_SENS_ID;
    const sens_access_key = config.NCP_SENS_ACCESS;
    const sens_secret_key = config.NCP_SENS_SECRET;
    const sens_call_number = config.NCP_SENS_NUMBER;

    // url 관련 변수 선언
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = 'https://sens.apigw.ntruss.com/sms/v2/services/${sens_service_id}/messages';
    const url2 = '/sms/v2/services/${sens_service_id}/messages';

    // signature 작성 : cypto-js 모듈을 이용하여 암호화
    console.log(1);
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, sens_secret_key);
    console.log(2);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    console.log(sens_access_key);
    hmac.update(sens_access_key);
    const hash = hmac.finalize();
    console.log(4);
    const signature = hash.toString(CryptoJS.enc.Base64);
    console.log(5);

    // sens 서버로 요청 전송
    const smsRes = axios({
        method: method,
        url: url,
        headers: {
            "Contenc-type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": sens_access_key,
            "x-ncp-apigw-timestamp": date,
            "x-ncp-apigw-signature-v2":signature,
        },
        date: {
            type: "SMS",
            countryCode: "82",
            from: sens_call_number,
            content: '임시비밀번호는 [${text}] 입니다.',
            messages: [{ to: '${user_phone_number'}],
        },
    });
    console.log("response", smsRes.data);

    con.query('update member set pw =? where email = ?;',[text, userEmail], function(error, results, fields){
        if(error) throw error;
        console.log('수정 완료');
    })
    

    con.end();
    return text;

    }catch(err){
        console.log(err);
        return "SMS not sent";
    }
    // TODO 임시비밀번호인 text를 데이터베이스 상에 있는 비밀번호와 바꾸기 -> 나중에 회원정보 수정으로 바꾸는 것을 권장.
    // 한가지 생각이 임시비밀번호 데이터베이스 열을 만들어 로그인 시 임시비밀번호와 회원가입시 입력된 비밀번호 둘 다 확인하고 로그인 시키는 것도 좋을거 같다. (이건 금요일에 회의 통해 결정.)

    // return true; // 출력 형태는 우선 초기단계이므로 직관적인 형태로 둔 것임. 나중에 클라이언트 쪽이라 협의하에 결정해야 함.
    
    // 없는 경우
    // return false;
    
       
}