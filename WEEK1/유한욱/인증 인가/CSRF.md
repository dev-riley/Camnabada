# CSRF(Cross Site Request Forgery)

사용자 의자와 무관하게 공격자의 의도대로 서버에 특정 요청을 하도록 함



2가지 방어방법 존재

- referer check
  - 서버에서 request를 보낸 referrer를 확인하여 도메인이 일치하는지를 확인한다
- security token
  - 임의의 난수를 생성하고 session에 저장한다
  - 서버에서는 요청을 받을때마다 세션에 저장된 토큰값과 요청 파라미터에 전달된 토큰값이 같은지 확인한다

