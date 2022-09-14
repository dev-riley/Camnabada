# JWT(JSON Web Token)

**JWT는 client, server 사이에 권한 인가를 위해 사용하는 토큰**



**구조**

HEADER.PAYLOAD.SIGNATURE

Json 객체를 Base64 URL-Safe로 인코딩

- HEADER - JWT를 검증하는데 필요한 정보를 가짐

  어떻게 검증하는가에 대한 내용을 담고있다. alg(서명시 사용하는 알고리즘), kid(public/private 서명시 사용하는 키)

- PAYLOAD - JWT의 내용이다. 속성들을 Claim set이라 부른다.

- SIGNATURE - HEADER & PAYLOAD를 합친 문자열을 서명한 값



**Access Token & Refresh Token**

Access Token의 경우 인증을 위한 JWT로 보안을 위해 유효기간이 짧음

Refresh Toekn 유효기간이 짧은 Access Token을 보완(재발급)하기 위한 JWT로 유효기간이 길다



**시나리오**

1. 로그인 완료시 Access Token & Refresh Token을 모두 발급한다. 이때 Refresh Token은 DB에도 저장함
2. 사용자는 Access Token을 헤더에 실어서 데이터를 요청함
3. 서버에서는 Access Token을 확인하여 맞는 데이터를 response로 전달한다.
   - 이때 Access Token의 유효기간이 만료가되면 Access Token을 만료된상태로 데이터를 요청함
4. 서버에서는 Access Token을 확인하여 권한없음을 확인하고 Refresh Token을 확인한다
5. Refresh Token을 확인한다
   - Refresh Token의 유효기간이 남아있고 서명을 확인 일치하면 -> 재발급
   - Refresh Token의 유효기간이 없는경우 재 로그인 요청
6. 로그아웃시에는 Refresh Token과 Access Token을 모두 만료시킴



**장점**

Access Token만을 이용한 방법보다 안전하다



**단점**

구현이 복잡하다

Access Token이 만료될 때마다 Refresh Token을 확인하는 과정에서 HTTP 요청횟수가 증가하므로 서버의 자원낭비로 이어진다
