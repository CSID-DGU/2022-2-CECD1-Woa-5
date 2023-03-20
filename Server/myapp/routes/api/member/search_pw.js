/**
 * email 받고 해당하는 임시비밀번호를 보여주고 데이터베이스도 임시비밀번호로 바꾼다. (임시비밀번호는 난수 생성프로그램으로 보여주면 될거 같다.) 
 * email로 임시비밀번호를 보내주는 것으로 하면, 단지 웹 상에서 보여주는 것보다 보안성이 크다.
 * (추가 고려)추가로 시간이 생긴다면, 이메일로 인증하는 과정을 거쳐 2번 인증하는 수단도 고려해보면 보완성이 클 것이다.
 */

exports.search = function search_pw(userEmail) {
    
    // TODO 요청된 이메일이 데이터베이스 상에 있는지 확인해야한다.

    // 있는 경우

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`{}[]:;<>?,./|";
    for( var i=0; i < 10; i++ ) // 10자에 해당하는 난수 임시 비밀번호를 줄 예정
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    

    // TODO 임시비밀번호인 text를 데이터베이스 상에 있는 비밀번호와 바꾸기 -> 나중에 회원정보 수정으로 바꾸는 것을 권장.
    // 한가지 생각이 임시비밀번호 데이터베이스 열을 만들어 로그인 시 임시비밀번호와 회원가입시 입력된 비밀번호 둘 다 확인하고 로그인 시키는 것도 좋을거 같다. (이건 금요일에 회의 통해 결정.)

    return true; // 출력 형태는 우선 초기단계이므로 직관적인 형태로 둔 것임. 나중에 클라이언트 쪽이라 협의하에 결정해야 함.
    
    // 없는 경우
    return false;
    
       
}