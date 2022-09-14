### 버전 및 환경

- 개발 도구

1. 프론트엔드 :  react 17.0.2, styled-component 5.3.3,  mui: 5.3.1, react-stomp 5.1.8, sockejs-client: 1.5.2  

2. 백엔드 : Spring Boot 2.3.9.RELEASE, Spring JPA 2.3.9.RELEASE,  Spring cloud gateway 2.2.9.RELEASE, auth0 3.18.2 

3. 데이터베이스 : My SQL Ver 15.1 Distrib 10.3.32-MariaDB 

4. 운영체제 Ubuntu 20.04 LTS, nginx 1.18.0, open jdk 1.8.0_312

   

- nginx 설정 

경로 : /etc/nginx/sites-available

파일명 : PJT.conf

설정 내용 :

```shell
server {
   listen 80;
   location / {
      root /home/ubuntu/FRONT/build;
      index index.html;
      try_files $uri $uri/ /index.html;
   }
}
```



- DB 설정

포트 : 3306

아이디 : root

비밀번호 : qorrn1!