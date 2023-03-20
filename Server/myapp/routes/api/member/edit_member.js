/**
 * condition
 * pw: 기존 비밀번호가 맞는지 확인하고. 2. 새로운 비밀번호는 회원가입 규칙에 의거하여 입력받는다.
 * phone_number, name도 회원가입 규칙에 의거하여 수정된 것을 받는다.
 */

exports.edit = function edit_member(userEmail, old_pw, new_pw, new_pw_check, phone_number, name) {
    


    // TODO email을 PK로 두어 이메일에 해당하는 정보 연결하기
    // TODO 매기변수로 가져온 old_pw가 데이터베이스 상의 기존 비밀번호가 동일한 지 확인 

    
        if(new_pw != new_pw_check){
            console.log("확인용 비밀번호와 다릅니다.");
            return false;
        }
    
        var num = new_pw.search(/[0-9]/g);
        var eng = new_pw.search(/[a-z]/ig);
        var spe = new_pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
       
        if(new_pw.length < 8 || new_pw.length > 20){
       
         console.log("8자리 ~ 20자리 이내로 입력해주세요.");
         return false;
        }else if(new_pw.search(/\s/) != -1){
         console.log("비밀번호는 공백 없이 입력해주세요.");
         return false;
        }else if(num < 0 || eng < 0 || spe < 0 ){
         console.log("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
         return false;
        }else {
           console.log("통과"); 
        //    return true;
        }
    
        if(phone_number.toString().length != 11){
            console.log("전화번호 다시 입력하세요.");
            
        }
        console.log(Number(phone_number)); // 만약 숫자로 필요하다면 이렇게 변환하여 쓸 수 있다는 점. 주의) 01012345678 => 1012345678 로 출력됨 
    

        // TODO 여기까지 온 것은 조건이 다 부합한 것이므로 새로운 비밀번호(new_pw), 전화번호, 이름 모두 기존 데이터베이스 값을 수정하기
        return true;
       
    }