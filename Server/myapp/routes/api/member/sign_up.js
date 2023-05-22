
/**
 * condition
 * email: 1. 확인용과 일치여부 판단 2. @com과 같은 형식 판단 3. 데이터베이스에 동일한 email 있으면 이미 회원가입되었다고 한다.
 * pw: 1. 확인용과 일치여부 판단 2. 특수문자, 숫자, 영문자 조합 인정 각각 최소 한개씩 필수 3. 최소 6자 ~ 18자까지 인정
 * phone_number: 1. 숫자만 입력하도록 한다. 2. 11자가 맞는지 확인만 한다.
 * name: 한글자 3~4 있는대로 받는다. -> 추후 수정가능 
 */

// 테스트 용으로 만든 것 추후 포스트맨으로 api 통신예정
//   const userEmail = "kimms5617@naver.com";
//   const userEmailCheck = "kimms5617@naver.com";
//   const userPw = "qweasd123!";
//   const userPwCheck = "qweasd123!";
//   const userPhone_number = ""; // 문자로 받고 필요하면 변환하자.
//   const userName = "김민수";

//   sign_up(userEmail, userEmailCheck, userPw, userPwCheck, userPhone_number, userName);

exports.verification = function sign_up(userEmail, userEmailCheck, userPw, userPwCheck, userPhone_number, userName, manage_number) {
    
// function sign_up(userEmail, userEmailCheck, userPw, userPwCheck, userPhone_number, userName) {
    if(userEmail != userEmailCheck){
        console.log("확인용 이메일이 동일하지 않습니다.");
        return 1;
    }
    var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if(!reg_email.test(userEmail)) {   
        console.log("이메일 형식에 맞지 않습니다.");     
        console.log(userEmail);              
        return 2;         

    }else{
        console.log("이메일 형식에 맞습니다.");
        // return true;
    } 

    // TODO 이메일이 데이터베이스에 있는지 확인해주는 메소드 구현
    
    if(userPw != userPwCheck){
        console.log("확인용 비밀번호와 다릅니다.");
        return 3;
    }

    var num = userPw.search(/[0-9]/g);
    var eng = userPw.search(/[a-z]/ig);
    var spe = userPw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
   
    if(userPw.length < 8 || userPw.length > 20){
   
     console.log("8자리 ~ 20자리 이내로 입력해주세요.");
     return 4;
    }else if(userPw.search(/\s/) != -1){
     console.log("비밀번호는 공백 없이 입력해주세요.");
     return 5;
    }else if(num < 0 || eng < 0 || spe < 0 ){
     console.log("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
     return 6;
    }else {
       console.log("통과"); 
    //    return true;
    }

    if(userPhone_number.toString().length != 11){
        console.log("사용자 전화번호 다시 입력하세요.");
        return 7;
    }
    console.log(Number(userPhone_number)); // 만약 숫자로 필요하다면 이렇게 변환하여 쓸 수 있다는 점. 주의) 01012345678 => 1012345678 로 출력됨 

    if(manage_number.toString().length != 11){
        console.log("관리자 전화번호 다시 입력하세요.");
        return 8;
    }

    return 0;
    
    res.json({status: res.statusCode});
    res.send();

   
}