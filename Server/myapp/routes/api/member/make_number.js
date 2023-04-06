const config = require('./number.json');
const request = require('request');
const CryptoJS = require('crypto-js');

exports.make =function send_message(phone) {
  let str = ''
  for (let i = 0; i < 6; i++) {
    str += Math.floor(Math.random() * 10)
  }

    var user_phone_number = phone;//수신 전화번호 기입
    var resultCode = 404;
    const date = Date.now().toString();
    const uri = config.NCP_SENS_ID; //서비스 ID
    const secretKey = config.NCP_SENS_SECRET;// Secret Key
    const accessKey = config.NCP_SENS_ACCESS;//Access Key
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
    const url2 = `/sms/v2/services/${uri}/messages`;
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);
    request({
      method: method,
      json: true,
      uri: url,
      headers: {
        "Contenc-type": "application/json; charset=utf-8",
        "x-ncp-iam-access-key": accessKey,
        "x-ncp-apigw-timestamp": date,
        "x-ncp-apigw-signature-v2": signature,
      },
      body: {
        type: "SMS",
        countryCode: "82",
        from: '01063645617',
        content: `임시 비밀번호는 [${str}] 입니다.`,
        messages: [
          { to: `${user_phone_number}`, },],
      },
    },
      function (err, res, html) {
        if (err) {
          console.log(err);
          return false;
        }
        else { resultCode = 200; console.log(html); }
      }
    );
    return str;
  }