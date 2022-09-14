# Session

**session은 브라우저 당 1개씩 생성되어 Object 형태로 저장되어있는 데이터 파일이다.**

- cookie를 기반으로 하고 있지만, server측에서 관리
- server에서는 각 브라우저별로 session ID를 부여하며 브라우저가 종료되면 사라짐
- 정보를 server에 두어 cookie보다 보안에 좋지만, 용량에 제한이 없어 메모리를 많이 차지함



**저장위치**

client(local) - session cookie : session ID 저장용

server - session



**구성요소**

저장데이터에 제한이 없음



**동작방식**

1. client가 request를 요청-> 
2. server에서 session ID를 발급하여 response header에 포함하여 전달-> 
   - client에서는 이 session ID에 대해서 쿠키를 이용해 보관
   - 앞으로의 통신에서는 발급받은 session ID를 포함시켜 server에 request 요청
3. server는 session ID를 확인해서 session에 있는 client 정보를 사용함
4. client 정보를 처리하여 client로 response



**사용예제**

- 로그인

