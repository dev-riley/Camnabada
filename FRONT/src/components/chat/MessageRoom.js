// 채팅방 목록 표시
import React, { Component,useRef } from "react";
import { Grid, Box, Typography, Container, Button, Input} from '@mui/material';
import { Link } from "react-router-dom";
import SocketJsClient from "react-stomp";
import ChatBubble from "./ChatBubble";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


export default function MessageRoom(props) {
  const [user, setUser] = React.useState({});
  const [oppUser, setOppUser] = React.useState({});
  const [roomId, setRoomId] = React.useState(0);
  const [chats, setChats] = React.useState([]);
  const [find, setFind] = React.useState({});
  const [count, setCount] = React.useState(0);
  const [chatDone, setChatDone] = React.useState(false);
  const [buttonVisible, setButtonVisible] = React.useState(false);
  const [buttonStyle, setButtonStyle] = React.useState({});
  let sock = new SockJS("http://i6c109.p.ssafy.io:8082/stomp/chatting");
  let stomp = Stomp.over(sock);
  const accessToken = localStorage.getItem("accessToken");
  const [getLastMesssage, setGetLastMessage] = React.useState(false);
  console.log(props);

  const getFind = async () => {
    if (roomId === 0) {
      return;
    }
    console.log("getFind act");
    await fetch(
      `http://i6c109.p.ssafy.io:8000/chat/counts/${roomId}`, {
        headers: {
          'Authorization': accessToken
        }
      }
    ).then(res => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
    }).then(data => {
      console.log(data);
      let currentFind = data[0];
      if (currentFind.lastMessageId === null) {
        currentFind.lastMessageId = 0;
      }
      setFind((prevFind) => {
        return Object.assign({}, currentFind);
      });
    });
  };
  ///logs/{chatroomId}/{lastMessageId}/{totalCount}/{count}
  const getChats = async (type) => {
    if (roomId === 0) {
      return;
    }
    console.log("getChats act");
    console.log(count);
    setCount(count+1);
    await fetch (
        `http://i6c109.p.ssafy.io:8000/chat/logs/${roomId}/${find.lastMessageId}/${find.totalCount}/${count+1}`, {
          headers: {
            'Authorization': accessToken
          }
        }
    ).then(res => {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
      if (res.status === 202) {
        setGetLastMessage(true);
        return res.json();
      }
    }).then(data => {
      console.log(data);
      setChats(data.concat(chats));
      if(type === 1)
        setChatDone(true);
      setButtonVisible(true);
    });
  };
  const getLogs = () => {
    return chats;
  };
  const scroll = (e) => {
    if (getLastMesssage)
      return;
    if (e.target.scrollTop == 0)
      getChats(2);
  };
  // stomp 연결
  const startStomp = () => {
    console.log(roomId);
    if (roomId === 0) {
      return;
    }
    let prevChats = getLogs();
    stomp.connect({
        'Authorization': accessToken
    }, function (frame) {
      //console.log(frame);
      console.log("Stomp conn!");
      stomp.subscribe("/sub/chatting/room/" + roomId, function (chat) {
        let content = JSON.parse(JSON.parse(JSON.stringify(chat)).body);
        prevChats = prevChats.concat(content);
        console.log(prevChats);
        setChats(prevChats);
        props.getLists();
      }, {'Authorization': accessToken});
    });
  };
  const sendMessage = () => {
    let msg = document.getElementById("userMessageInput");
    let date = new Date();
    stomp.send('/pub/chatting/message', {'Authorization': accessToken}, JSON.stringify({ chatroomId: roomId, date: date, message: msg.value, sender: user.userId }));
    msg.value = '';
  };

  const onKeyPress = (e) => {
    console.log(e);
      if (e.key == 'Enter') sendMessage(); 
  }

  React.useEffect(() => {
    console.log("use Effect1 act");
  }, []);
  React.useEffect(() => {
    console.log("useEffect 2 act");
    console.log(props.roomId);
    if (roomId !== props.roomId) {
      setRoomId(props.roomId);
      setUser({ userId: props.userId, nickname: props.nickname });
      setOppUser({ oppUserId: props.oppUserId, oppNickname: props.oppNickname });
      setCount(0);
      setChats([]);
      setButtonVisible(false);
    }
    if (chatDone) {
      startStomp();
      setChatDone(false);
    }
  });
  React.useEffect(() => {
    //props.getLists();
  },[chats])
  React.useEffect(() => {
    console.log("useEffect 3 act");
    getFind();
  }, [roomId]);
  React.useEffect(() => {
    console.log("useEffect 4 act");
    getChats(1);
  }, [find]);
  React.useEffect(() => {
    console.log(buttonVisible);
    if (!buttonVisible)
      setButtonStyle({ visibility: 'hidden' });
    else
      setButtonStyle({ visibility: 'visible' });
    console.log(buttonStyle);
  },[buttonVisible]);
  
  return (
    <div >
      <div style={{ height: 700, overflowY: 'auto' }} onScroll={scroll}>
        <Grid>
          {console.log(props.oppNickname)}
          {chats.map((chat, i) => (
            <ChatBubble chat={chat} i={i} userId={props.userId} oppNickname={props.oppNickname} ></ChatBubble>
            ))}
        </Grid>
      </div>
      <div style={buttonStyle} align="right">
        <Input id='userMessageInput'sx={{ width : '650px' }} type="text" onKeyPress={onKeyPress}></Input>
        <Button
          onClick={sendMessage}
          variant="contained"
          sx={{backgroundColor : '#1b5e20', ml : 1}}
        >전송</Button>
      </div>
    </div>
  )
 
  
}
