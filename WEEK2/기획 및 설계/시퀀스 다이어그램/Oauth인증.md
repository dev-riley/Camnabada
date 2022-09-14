[![](https://mermaid.ink/img/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgVXNlci0-PkNsaWVudDogMS4g66Gc6re47J24IOyalOyyrVxuICAgIENsaWVudC0-Pk9hdXRoOiAyLiDroZzqt7jsnbggZW5kcG9pbnQg7Zi47LacLCDroZzqt7jsnbgg7Iuk7ZaJXG4gICAgT2F1dGgtPj5Vc2VyOiAzLiDroZzqt7jsnbgg64-Z7J2Y7Jes67aAIO2ZleyduCBcbiAgICBVc2VyLT4-T2F1dGg6IDQuIOuhnOq3uOyduCDrj5nsnZhcbiAgICBPYXV0aC0-PlNlcnZlcjogNS4gVGhpcmQgcGFydHkg7ZSM656r7Y-8IHJlZGlyZWN0aW9uIHVybCAmIEF1dGhvcml6YXRpb24gY29kZSDsoITri6xcbiAgICBTZXJ2ZXItPj5PYXV0aDogNi4gdXJs7J2E7Ya17ZWY7JesIO2GoO2BsCDsmpTssq1cbiAgICBPYXV0aC0-PlNlcnZlcjogNy4gcmVmcmVzaCB0b2tlbiwgYWNjZXNzIHRva2VuIO2ZleyduFxuICAgIFNlcnZlci0-PlNlcnZlciA6IDguIFVzZXIg7J247KadIOuwjyB0b2tlbuqygOymnVxuICAgIFNlcnZlci0-PkNsaWVudDogOS4g7J247KadIO2bhCDsoJXrs7Qg7KCc6rO1IiwibWVybWFpZCI6eyJ0aGVtZSI6ImRhcmsifSwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ)](https://mermaid-js.github.io/mermaid-live-editor/edit/#eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgVXNlci0-PkNsaWVudDogMS4g66Gc6re47J24IOyalOyyrVxuICAgIENsaWVudC0-Pk9hdXRoOiAyLiDroZzqt7jsnbggZW5kcG9pbnQg7Zi47LacLCDroZzqt7jsnbgg7Iuk7ZaJXG4gICAgT2F1dGgtPj5Vc2VyOiAzLiDroZzqt7jsnbgg64-Z7J2Y7Jes67aAIO2ZleyduCBcbiAgICBVc2VyLT4-T2F1dGg6IDQuIOuhnOq3uOyduCDrj5nsnZhcbiAgICBPYXV0aC0-PlNlcnZlcjogNS4gVGhpcmQgcGFydHkg7ZSM656r7Y-8IHJlZGlyZWN0aW9uIHVybCAmIEF1dGhvcml6YXRpb24gY29kZSDsoITri6xcbiAgICBTZXJ2ZXItPj5PYXV0aDogNi4gdXJs7J2E7Ya17ZWY7JesIO2GoO2BsCDsmpTssq1cbiAgICBPYXV0aC0-PlNlcnZlcjogNy4gcmVmcmVzaCB0b2tlbiwgYWNjZXNzIHRva2VuIO2ZleyduFxuICAgIFNlcnZlci0-PlNlcnZlciA6IDguIFVzZXIg7J247KadIOuwjyB0b2tlbuqygOymnVxuICAgIFNlcnZlci0-PkNsaWVudDogOS4g7J247KadIO2bhCDsoJXrs7Qg7KCc6rO1IiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRhcmtcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)



**sequenceDiagram**

  User**->>**Client: 1. 로그인 요청

  Client**->>**Oauth: 2. 로그인 endpoint 호출, 로그인 실행

  Oauth**->>**User: 3. 로그인 동의여부 확인 

  User**->>**Oauth: 4. 로그인 동의

  Oauth**->>**Server: 5. Third party 플랫폼 redirection url & Authorization code 전달

  Server**->>**Oauth: 6. url을통하여 토큰 요청

  Oauth**->>**Server: 7. refresh token, access token 확인

  Server**->>**Server : 8. User 인증 및 token검증

  Server**->>**Client: 9. 인증 후 정보 제공