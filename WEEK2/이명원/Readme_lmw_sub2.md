## Spring boot와 React로 채팅을 위한 TCP 통신 구현하기

## TCP 통신

### 왜 TCP를 사용하는가?

TCP vs UDP

- TCP는 데이터를 주고 받을 양 끝단을 연결하고 그 연결을 통해 양방향으로 데이터를 전송
- UDP는 연결 생성하지 않고 수신자가 준비가 되어있는지 확인하는 과정을 생략하고 단방향으로 데이터를 전송
- 신뢰성 : TCP는 메세지 수신을 확인 / UDP는 메세지 수신을 확인하지 않음
- 순서 정렬 : TCP는 메세지가 보내진 순서를 보장 / UDP는 메세지 도착 순서를 예측할 수 없음
- 부하 : TCP 보다 UDP가 오버헤드가 적어서 속도가 일반적으로 빠르다.

-> 좀 더 신뢰성이 있고 메세지의 순서를 보장하기 때문에 1:1 채팅에는 TCP가 더 적합하다고 생각해서 이번 프로젝트에서는 TCP를 이용하여 채팅을 구현하기로 했다.

### 개념 정리

TCP : Transmission Control Protocol

- 프로토콜 중 하나로 근거리 통신망이나 인트라넷, 인터넷에 연결된 컴퓨터에서 실행되는 프로그램 간의 일련의 옥텟을 안정적으로, 순서대로, 에러없이 교환할 수 있게 한다.
- OSI 7계층 중 전송 계층에 위치한다.
- 웹 브라우저들이 월드 와이드 웹에서 서버에 연결할 때 사용되며, 이메일 전송이나 파일 전송에도 사용된다.

소켓

- 양방향 통신을 할 때 텍스트 등의 데이터가 전송되는 도착지점

WebSocket

![websocket](/uploads/dddabc951d5fcf5b4d0efb69f315171f/websocket.png)
- 기존의 단방향 HTTP 프로토콜과 호환되어 양방향 통신을 제공하기 위해 개발된 프로토콜
- 일반 Socket 통신과 달리 HTTP 80 Port를 사용하므로 방화벽에 제약이 없다.
- 접속까지는 HTTP 프로토콜을 이용하고 그 이후 통신은 WebSocket 프로토콜로 통신하게 된다.

WebSocket Emulation

- WebSocket은 브라우저, 버전마다 지원되는것이 있고 안되는 것이 있다.
- 우선 WebSocket을 시도하고 실패할 경우 HTTP기반의 다른 기술로 전환해 다시 연결을 시도한다.
- nodeJS는 Socket.io, Spring은 SockJS를 사용하는것이 일반적이다.

SockJS

![sockjs](/uploads/a4a0b9b2c347521f0640a13bc17f09c8/sockjs.png)

- 어플리케이션에서 우선적으로 WebSocket을 사용하도록 하지만 사용할 수 없는 경우에는 런타임 시점에 코드 변경없이 WebSocket이외의 대안으로 대체해준다.

WebSocket Emulation Process

1. Client "GET/info"를 호출하여 정보확인
   1. 서버가 WebSocket을 지원하는지
   2. 전송과정에서 Cookies 지원이 필요한지
   3. CORS를 위한 Origin 정보
2. 전송 타입 결정
3. 전송 요청
   URL 구조 : https://host:port/myApp/myEndpoint/{server-id}/{session-id}/{transport}
   1. server-id : 클러스터에서 요청을 라우팅 하는데 사용
   2. session-id : SockJS 세션에 소속되는 http 요청과 연관있음
   3. transport : 전송 타입

STOMP : Simple Text Oriented MEssaging Protocol

![stomp](/uploads/3663e30bfc8ea72d7e70be823b178923/stomp.png)

- 메세지 전송을 효율적으로 하기 위해 만들어진 프로토콜이다.
- TCP 또는 WebSocket등 양방향 네트워크 프로토콜을 기반으로 동작한다.
- Publisher와 Subscriber 개념이 있다.
  (ex)
  채팅방 생성 : publisher, subscriber 구현을 위한 topic 생성
  채팅방 입장 : Topic 구독
  채팅방에서 메세지를 송수신 : 해당 Topic으로 메세지를 송신(publish), 메세지를 수신(subscribe)
- 장점
  1.  Messaging Protocol을 만들고 메세지 형식을 Customizing할 필요가 없다.
  2.  RadditMQ, ActiveMQ 같은 Message Broker를 이용해 구독을 관리하고 메세지를 브로드캐스팅 할 수 있다.
  3.  WebSocket기반으로 각 연결마다 WebSocketHandler를 구현하는 것보다 @Controller 된 객체를 이용해 조직적으로 관리할 수 있다.
- 설정 예시

      import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
      import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

      @Configuration
      @EnableWebSocketMessageBroker
      public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

         @Override
         public void registerStompEndpoints(StompEndpointRegistry registry) {
            registry.addEndpoint("/example").withSockJS();
         }
         @Override
         public void configureMessageBroker(MessageBrokerRegistry config) {
            config.setApplicationDestinationPrefixes("/test");
            config.enableSimpleBroker("/topic", "/queue");
         }

      }
      
다음주부터는 위 개념들과 예시들을 이용해 기본 채팅방 이동 구현과 실시간 채팅 구현을 할 예정이다.
