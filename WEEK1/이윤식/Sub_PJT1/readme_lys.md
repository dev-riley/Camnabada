# 개요

- 인텔리제이의 사용방법을 알고 스프링부트와 JPA를 적용해보기 위한 학습
- 추후 쿠키와 세션, Auth0에 대해 학습하여 로그인 부분을 구현해볼 예정



# Intellij (인텔리제이)

- 강력한 추천 기능(Smart Completion)
- 훨씬 더 다양한 리팩토링과 디버깅 기능
- 이클립스의 깃에 비해 훨씬 높은 자유도
- 프로젝트 시작할 때 인덱싱을 하여 파일을 비롯한 자원들에 대한 빠른 검색 속도

**이클립스와의 차이점**

- workspace가 없다
- Project와 Module의 개념이 존재
- RootProject아래에 Multi module환경을 이용하면 된다
  Multi Module이란 간단하게 하나의 도메인을 위한 프로젝트 모음



# 1. 인텔리제이로 스프링부트 시작하기

## Build**란?**

- 소스코드 파일을 컴퓨터에서 실행할 수 있는 독립 소프트웨어 가공물로 변환하는 과정 또는 그에 대한 결과물 이다.
- 우리가 작성한 소스코드(java), 프로젝트에서 쓰인 각각의 파일 및 자원 등(.xml, .jpg, .jar, .properties)을 JVM이나 톰캣같은 WAS가 인식할 수 있는 구조로 패키징 하는 과정 및 결과물이라고 할 수 있다.

## B**uild tool**

- 빌드 도구란 프로젝트 생성, 테스트 빌드, 배포 등의 작업을 위한 전용 프로그램.
- 빠른기간동안 계속해서 늘어나는 라이브러리 추가, 프로젝트를 진행하며 라이브러리의 버전 동기화의 어려움을 해소하고자 등장.
- 초기의 java 빌드도구로 Ant를 많이 사용하였으나 최근 많은 빌드도구들이 생겨나
  Maven이 많이 쓰였고, 현재는 Gradle이 많이 쓰인다.
  (Ant는 스크립트 작성도 많고, 라이브러리 의존관리가 되지 않아 불편함)
- [Maven vs Gradle](https://bkim.tistory.com/13)

## 1.1 build.gradle 설정

```gradle
buildscript {
    // ext: build.gradel에서 사용하는 전역변수를 설정
    ext {
        //springBootVersion 전역변수를 생성하고 그값을 2.1.7로 한다
        springBootVersion = '2.1.7.RELEASE'
    }
    // 각종 의존성(라이브러리)들을 어떤 원격 저장소에서 받을지를 정한다.
    // mavenCentral, jcenter 가 존재하며 jcenter로 이동하는 추세다(개발자들이 직접만든 라이브러리 업로드 난이도 때문)
    repositories {
        mavenCentral()
        jcenter()
    }
    dependencies {
        //스프링 부트 그레이들 플러그인의 2.1.7REALEASE를 의존성으로 받는다.
        classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
    }
}

apply plugin: 'java'
apply plugin: 'eclipse'
apply plugin: 'org.springframework.boot'
// 스프링부트의 의존성을 관리해 주는 플러그인
apply plugin: 'io.spring.dependency-management'

group 'com.seongbinko'
version '1.0.1-SNAPSHOT'+new Date().format("yyyyMMddHHmmss")
//1 build.gradle은 Groovy 기반의 빌드툴
//2 Groovy 문법을 사용할 수 있으며 new Date()로 빌드 할때마다 그 시간이 버전에 추가되도록 구성하였다

sourceCompatibility = 1.8

repositories {
    mavenCentral()
}
// 프로젝트 개발에 필요한 의존성들을 선언하는 곳 특정 버전을 명시하지 않아야 ${springBootVersion} 부분의 버전을 따라간다.
dependencies {
    compile('org.springframework.boot:spring-boot-starter-web')  //@1
    compile('org.projectlombok:lombok') //@2
    compile('org.springframework.boot:spring-boot-starter-data-jpa') //@3
    compile('com.h2database:h2') //@3
    compile('org.springframework.boot:spring-boot-starter-mustache:') //@4 머스태치 의존성 추가
    compile('org.springframework.boot:spring-boot-starter-oauth2-client') //@5 스프링 시큐리티 의존성
    compile('org.springframework.session:spring-session-jdbc')            //@6 session 의존성 등록
    compile('org.mariadb.jdbc:mariadb-java-client') //@8 mariaDB 드라이브러를 build.gradle에 등록
    testCompile('org.springframework.boot:spring-boot-starter-test') //@1
    testCompile('org.springframework.security:spring-security-test') //@7 스프링시큐리티 테스트 지원 의존성 
}
```



## 1.2 인텔리제이에서 깃허브로 버전관리하기

- .idea디렉토리는 커밋하지 않는다.

  - .idea: 인텔리제이에서 프로젝트 실행시 자동으로 생성되는 파일

- .gitignore 파일 사용

  - 깃 체크대상에서 제외를 시킬 수 있다.

    ```ignore-list
    # Project exclude paths
    .gradle
    .idea
    build
    application-oauth.properties
    ```

     

------

# 2. 스프링부트에서 테스트코드 작성

## 2.1 테스트 코드란

### TDD

- 테스트가 주도하는 개발
- 테스트코드를 먼저작성한다.
- Red → Green → Refactor 사이클

### 단위 테스트 코드 (Unit test)

**TDD 첫번째 단계인 기능 단위의 테스트 코드를 작성하는 것**

**장점**

1. 빠른 피드백
   - 기존방식
     1. 코드작성
     2. Tomcat 실행
     3. Postman과 같은 API 테스트도구로 HTTP 요청
     4. System.out.println()으로 눈으로 검증
     5. 결과 다르면 Tomcat중지하고 코드 수정
   - 코드수정시마다 톰캣을 다시 실행하는 시간을 줄일 수 있다.
2. 자동검증
   - System.out.println()을 찍으며 수동검증 할 필요가 없어진다.
3. 개발자가 만든 기능을 안전하게 보호 해준다.
   - 기존 기능이 잘 작동되는 것을 보장해 준다.

**테스트 코드 프레임워크 xUnit**

- JUnit4 -java용 사용



## 2.2 Hello Controller 테스트코드 작성하기

### Application.java

```java
package com.seongbinko.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/*
  -Main 클래스
    @SpringBootApplication 으로 인해 스프링부트의 자동 설정, 스프링 Bean읽기와 생성을 모두 자동으로 설정
    @SpringBootApplication 위치부터 설정을 읽어가기 때문에 항상 최상단에 위치해야 한다.
    SpringApplication.run으로 인해 내장 WAS(웹어플리케이션서버) 실행
    스프링부트는 내장 WAS권장 -> '언제 어디서나 같은 환경에서 스프링부트를 배포' 
*/
//@EnableJpaAuditing //JPA Auditing 활성화 현재는 disabled
@SpringBootApplication
public class Application{
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```



### HelloController.java

```java
package com.seongbinko.springboot.web;

import com.seongbinko.springboot.web.dto.HelloResponseDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    
    // /hello로 요청이오면 문자열 hello를 반환한다.
    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }

    @GetMapping("/hello/dto")
    public HelloResponseDto helloResponseDto(@RequestParam("name") String name, @RequestParam("amount") int amount) {
        return new HelloResponseDto(name, amount);
    }
}
```



### HelloControllerTest.java

```java
package com.seongbinko.springboot.web;

import com.seongbinko.springboot.config.auth.SecurityConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@WebMvcTest(controllers = HelloController.class,
    excludeFilters = {@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)}
)
public class HelloControllerTest {
    @Autowired
    private MockMvc mvc; 
    /*
        - 웹 Api를 테스트 할 때 사용한다.
        - 스프링 MVC 테스트의 시작점
        - 이 클래스를 통해 HTTP, GET, POST 등에 대한 API 테스트를 할 수 있다.
    */    

    @WithMockUser(roles="USER")
    @Test
    public void hello() throws Exception {
        String hello = "hello";

        mvc.perform(get("/hello"))
                .andExpect(status().isOk())
                .andExpect(content().string(hello));
        /*
            mvc.perform(get("/hello"))
            - MockMvc를 통해 /hello 주소로 HTTP GET 요청
            - 체이닝을 지원
            
            .andExpect(status().isOk())
            - mvc.perform의 결과를 검증
            - HTTP Header의 Status를 검증
            - 200, 400, 500등의 상태 검증
            - OK 즉 200인지 아닌지를 검증
            
            .andExpect(content().string(hello));
            - mvc.perform의 결과를 검증
            - 응답 본문의 내용을 검증
            - Controller에서 "hello"를 리턴하는지를 검증한다.
        */
    }
    @WithMockUser(roles = "USER")
    @Test
    public void returnHelloDto() throws Exception {
        String name = "hello";
        int amount = 1000;


        mvc.perform(
                get("/hello/dto")
                    .param("name",name)
                    .param("amount" , String.valueOf(amount))
        ).andExpect(status().isOk())
                .andExpect(jsonPath("$.name",is(name)))
                .andExpect(jsonPath("$.amount", is(amount)));
        /*
            .param
                - API테스트할 때 사용될 요청 파라미터를 설정한다.
                - 값은 String만 허용
                - 숫자/날짜 등의 데이토도 등록할 때는 문자열로 내려보내야 한다.

            jsonPath()
                .andExpected(jsonPath("$.name", is(name)))
                - JSON 응답값을 필드별로 검증할 수 있는 메소드
                - $를 기준으로 필드명을 명시한다.
        */
    }
}
```



## 2.3 롬복 lombok

### 소개

- Getter, Setter, 기본생성자 toString등을 어노테이션으로 자동 생성
- 롬복은 프로젝트마다 설정하여야 한다.

### 설치

1. build.gradle의 의존성 주입
2. 롬복 플러그인 설치 Enable annotation processing 체크



## 2.4 HelloController 코드를 롬복으로 리팩토링

### HelloResponseDto

```java
package com.seongbinko.springboot.web.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class HelloResponseDto {
    private final String name;
    private final int amount;
}
```

### HelloResponseDto Test

```java
package com.seongbinko.springboot.web.dto;

import org.junit.Test;
import static org.assertj.core.api.Assertions.assertThat; //@

public class HelloResponseDtoTest {

    @Test
    public void lombokFunctionTest() {

        //given
        String name = "test";
        int amount = 1000;

        //when
        HelloResponseDto dto = new HelloResponseDto(name, amount);

        //then
        assertThat(dto.getName()).isEqualTo(name);
        assertThat(dto.getAmount()).isEqualTo(amount);
    }
}
```



------

# 3. 스프링부트에서 JPA로 데이터 베이스 다루기

- JPA/Hiibernate/Spring Data Jpa의 관계
- Spring Data Jpa를 이용하여 관계형 데이터베이스를 객체지향적으로 관리하는 방법
- JPA 더티체킹을 이용하면 Update 쿼리 없이 테이블 수정이 가능하다는 것
- JPA Auditing을 이용하여 등록/수정 시간을 자동화하는 방법

### **JPA(Java Persistent API)**

- JPA는 자바표준 ORM(Object Relation Mapping)이다.
- JPA는 객체지향 프로그래밍 언어와 관게형 데이터베이스의 패러다임 불일치 문제를 해결하기 위해 사용한다.
- 개발자는 객체지향적 방법으로 프로그래밍을 하고, JPA가 관계형데이터베이스에 맞게 SQL을 생성해서 실행한다.
- JPA를 사용하면 SQL에 종속적인 개발을 하지 않아도 된다.

### **Spring Data JPA**

- JPA는 자바 표준 명세서다.
- JPA는 Hibernate, Eclipse Link 등의 대표적인 구현체가 있다.
- Spring에서는 구현체들을 추상화시킨 Spring Data JPA를 이용해서 JPA 기술을 다룬다.
  - Spring Data JPA ← Hibernate ← JPA ← DataBase
- 등장 배경
  1. 구현체 교체의 용이성
     - Hibernate 외의 다른 구현체로 쉽게 교체하기 위함
  2. 저장소 교체의 용의성
     - 관계형 데이터베이스 외에 다른 저장소로 쉽게 교체하기 위함
     - ex) MongoDB로 교체가 필요하면 Spring Data JPA → Spring Data MongoDB로 의존성만 교체
       Spring Data의 하위 프로젝트는 CRUD의 인터페이스가 같기 때문
       Spring Data Redis 등등

### **프로젝트에 Spring Data JPA 적용하기**

1. **spring-boot-starter-jpa** 의존성 등록

   - 스프링 부트용 Spring Data Jpa 추상화 라이브러리
   - 스프링 부트 버전에 맞춰서 자동으로 JPA관련 라이브러리들의 버전관리를 해준다.

2. **H2** 인메모리 관계형 데이터베이스 사용

   - 프로젝트 의존성만으로 관리 가능
   - 메모리에서 실행되기 때문에 애플리케이션 재시작시 초기화 된다는 점을 이용하여 테스트에서 주로 사용

3. 관계형 데이터베이스의 테이블과 매핑되는 Entity클래스 작성하기

   - domain 패키지

     - 게시글, 댓글, 회원, 결제 등 소프트웨어에 대한 요구사항 혹은 문제영역 dao패키지와 비슷하나 결이 다르다

   - Posts.java

     ```java
     package com.seongbinko.springboot.domain.posts;
     
     import com.seongbinko.springboot.domain.BaseTimeEntity;
     import lombok.Builder;
     import lombok.Getter;
     import lombok.NoArgsConstructor;
     
     import javax.persistence.*;
     @Getter
     @NoArgsConstructor
     // Entity 클래스에서는 절대 Setter 메소드를 만들지 않는다
     // 차후 변경시 코드상으로 명확히 구분 못하여 복잡해지기 때문
     @Entity
     public class Posts extends BaseTimeEntity {
     
         @Id
         @GeneratedValue(strategy = GenerationType.IDENTITY)
         private Long id;
     
         @Column(length = 500, nullable = false)
         private String title;
     
         @Column(columnDefinition = "TEXT", nullable = false)
         private String content;
         private String author;
     
         @Builder
         public Posts(String title, String content, String author) {
             this.title = title;
             this.content = content;
             this.author = author;
         }
     
         public void update(String title, String content) {
             this.title = title;
             this.content = content;
         }
     }
     ```

      

4. 데이터베이스 엑세스를 담당하는 JpaRepository 생성하기

   - **PostsRepository.java**

     ```java
     package com.seongbinko.springboot.domain.posts;
     
     import org.springframework.data.jpa.repository.JpaRepository;
     import org.springframework.data.jpa.repository.Query;
     
     import java.util.List;
     
     public interface PostsRepository extends JpaRepository<Posts,Long> {
         //JPQL 쿼리문 P는 별칭 반드시 사용하여야 한다.
         @Query("select p from Posts p order by  p.id desc")
         List<Posts> findAllDesc();
     }
     ```

   - Mybatis에서 Dao라 불리는 DB Layer 접근자

   - Entity 클래스와 Entity Repository는 함께 위치해야 한다

   - @Repository를 추가할 필요가 없다

   - T: Entity클래스, ID: PK타입

   - JpaRepository<T, ID> 인터페이스를 상속받는 인터페이스를 정의한다.

   - JpaRepository<T, ID> 인터페이스를 상속받으면 기본적인 CRUD 메소드가 자동으로 생성된다.

5. Spring Data JPA 테스트 코드 작성하기

   - PostsRepositoryTest.java 생성 Save findAll기능을 수행

     ```java
     package com.seongbinko.springboot.domain.posts;
     
     import org.junit.After;
     import org.junit.Test;
     import org.junit.runner.RunWith;
     import org.springframework.beans.factory.annotation.Autowired;
     import org.springframework.boot.test.context.SpringBootTest;
     import org.springframework.test.context.junit4.SpringRunner;
     
     import java.time.LocalDateTime;
     import java.util.List;
     
     import static org.assertj.core.api.Assertions.assertThat;
     
     
     @RunWith(SpringRunner.class)
     @SpringBootTest // 별다른 설정없이 이것을 사용할 경우 H2 데이터베이스를 자동으로 실행
     public class PostsRepositoryTest {
     
         @Autowired
         PostsRepository postsRepository;
         /*
             - Junit에서 단위 클래스가 끝날 때마다 수행되는 메소드를 지정
             - 보통은 배포전 전체 테스트를 수행할 때 테스트간 데이터 침범을 막기위해 사용
             -  여러 테스트가 동시에 수행되면 H2에 데이터가 그대로 남아있어 실패할 가능성 有
         */
         @After
         public void cleanUp() {
             postsRepository.deleteAll();
         }
     
         @Test //저장된 글이 잘 저장됐는지 진행하는 테스트
         public void readSavePost() {
             //given
             String title = "테스트 게시글";
             String content = "테스트 본문";
             
             // 테이블 posts에 insert/update 쿼리를 실행한다.
             // id값이 있다면 update가, 없다면 insert 쿼리가 실행
             postsRepository.save(Posts.builder()
                             .title(title)
                             .content(content)
                             .author("wnrhd1082@gmail.com")
                             .build());
             //when
             //테이블 posts에 있는 모든 데이터를 조회해오는 메소드
             List<Posts> postsList = postsRepository.findAll();
     
     
             //then
             Posts posts = postsList.get(0);
             assertThat(posts.getTitle()).isEqualTo(title);
             assertThat(posts.getContent()).isEqualTo(content);
         }
     
         @Test
         public void registerBaseTimeEntity() {
             //given
             LocalDateTime now = LocalDateTime.of(2019,6,4,0,0,0);
             postsRepository.save(Posts.builder().title("title").content("content").author("author").build());
     
             //when
             List<Posts> postsList = postsRepository.findAll();
     
             //then
             Posts posts = postsList.get(0);
     
             System.out.println(">>>>>>>> createDate=" +posts.getCreatedDate()+ ", modifiedDate=" +posts.getModifiedDate());
     
             assertThat(posts.getCreatedDate()).isAfter(now);
             assertThat(posts.getModifiedDate()).isAfter(now);
         }
     }
     ```

      

6. DataSource 설정하기 & 쿼리 로그보기

   - H2 인메모리 데이터베이스에 대한 DataSource 설정하기

   - application.properties

     ```ini
     // 스프링부트에서 읽어가는 파일이다.
     spring.jpa.show-sql=true //@jpa 로그를 볼 수 있다.
     spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5InnoDBDialect //@H2의 쿼리를 MySql의 쿼리 로그로 바꾼다.
     spring.h2.console.enabled=true //h2 console 사용하기
     spring.profiles.include=oauth  // oauth프로파일을 읽을 수 있도록 설정한다.
     spring.session.store-type=jdbc
     ```