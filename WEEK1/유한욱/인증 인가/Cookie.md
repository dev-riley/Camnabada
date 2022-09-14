# Cookie

**cookie는 client에 key, value로 구성된 String 형태로 저장되어 있는 데이터 파일이다.**

- 유효시간을 정하여, 사용자가 브라우저를 종료하여도 인증이 유지됨
- client에 최대 300개까지 저장가능, 하나의 cookie값은 4kb까지 저장가능
- cookie는 사용자가 요청하지 않아도, 브라우저가 request시에 request header를 넣어 자동으로 서버로 전달



**저장위치**

client(local)



**구성요소**

이름, 값, 유효시간, 도메인, 경로으로 구성되어 있다.



**동작방식**

1. client가 request를 요청 -> 
2. server에서 cookie를 생성 -> 
3. server에서 http header에 cookie를 포함시켜 response -> 
   - 브라우저는 유효시간동안 cookie를 계속 보관
   - 같은 요청시, http header에 cookie를 포함시켜 request
   - server에서는 header를 읽어 cookie 수정사항을 받아들여 header를 수정 후 response



**사용예제**

- 아이디와 비밀번호 기억하기
- 쇼핑몰 장바구니
- 오늘 더 이상 이 창을 보지 않음 페이지 등
