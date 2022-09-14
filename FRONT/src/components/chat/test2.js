// 채팅방 목록 표시
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SocketJsClient from "react-stomp";
import ChatBubble from "./ChatBubble";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Axios from "axios";


export default function MessageRoom({roomId, lastMessageId, totalCount}) {

  // const roomId = chatroomId.chatroomId.roomId;
  

  // console.log('roomId는', roomId);
  // 사용할 data: date, message, sender, over
  const [chats, setChats] = React.useState([]);
  //console.log("roomid : "+ roomId);
  // 채팅 기록 api
  // const [find, setFind] = React.useState([]);
  //console.log(4);
  const [count, setCount] = React.useState(-1);

  React.useEffect(() => {
    Axios.get(`http://i6c109.p.ssafy.io:8082/chat/logs/${roomId}/${lastMessageId}/${totalCount}`)
      .then(res => setChats(res.data))
  }, []);
 
  return (
    <div>
      <Grid>
        {chats.map((chat, i) => (
          <ChatBubble chat={ chat } i={ i }></ChatBubble>
          ))}
      </Grid>
      <Button 
        // onClick={getChats} 
        value="add"
        sx={{
          m: 1,
          minWidth: 100,
          height: '7ch'
        }}
      >
        입력 버튼
      </Button>
    </div>
  )
 
  
}