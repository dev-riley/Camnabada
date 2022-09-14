import Button from '@mui/material/Button';
import React, { Component,useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import { Link } from "react-router-dom";
import { ListItem } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Axios from "axios";

//const [moreButtonStyle, setMoreButtonStyle] = React.useState({});

const ChatBubble = ({ chat, i, userId, oppNickname }) => {
  const [isClicked, setIsClicked] = React.useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const [isSec, setIsSec] = React.useState(false);
  const [originM, setoriginM] = React.useState("");
  const [overdM, setoverdM] = React.useState("");
  console.log(chat.date);
  function setCurTime(tmp) {
    let date = new Date(tmp);
    let year = date.getFullYear();
    let isYun = false;
    if (year % 4 == 0) {
      if (year % 100 == 0) {
        if (year % 400 == 0) {
          isYun = true;
        }
      } else {
        isYun = true;
      }
    }
    let dayPerMonth = [];
    if (isYun) {
      dayPerMonth = [0,31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else {
      dayPerMonth = [0,31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    let minute = date.getMinutes();
    let hour = date.getHours() + 9;
    let day = date.getDate();
    if (hour >= 24) {
      hour = hour % 24;
      day++;
    }
    let month = date.getMonth() + 1;
    if (day > dayPerMonth[month]) {
      day %= dayPerMonth[month];
      month++;
    }
    if (month > 12) {
      month %= 12;
      year++;
    }
    
    let curTime = year+"년 "+month+"월 "+day+"일 "+hour+"시 "+minute+"분";
    return curTime;
  }
  
  console.log(oppNickname + " " + userId)
  const getOverMessage = async (messageId) => {
    console.log("getOverMessage act");
    if (isSec) {
      let cM = document.getElementById(chat.message_id);
      cM.innerText = originM + overdM;
    }
    else {
      await fetch(
        `http://i6c109.p.ssafy.io:8000/chat/over/${messageId}`, {
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
        setoverdM(data.overMessage);
        setIsSec(true);
        let cM = document.getElementById(chat.message_id);
        cM.innerText = chat.message + data.overMessage;
      });  
    }
    setIsClicked(true);
  };
  const deleteOverMessage = () => {
    let cM = document.getElementById(chat.message_id);
    cM.innerText = originM;
    setIsClicked(false);
  }
  React.useEffect(() => {
    setoriginM(chat.message);
  }, [])
  
  {console.log(setCurTime(chat.date))}
  // 전송자가 본인일 때
  if (chat.sender == userId) {
    if (chat.over) {
      return (
        <Grid align="right">
          <Typography id={chat.message_id} >
            {chat.message}
          </Typography>
          <Typography>
            {setCurTime(chat.date)}
          </Typography>
          {isClicked ? <Button onClick={() => { deleteOverMessage() }}>줄이기</Button>
          : <Button onClick={() => { getOverMessage(chat.message_id) }}>더보기</Button>}
        </Grid>
      )
    }
    else {
      return (
        // 본인 채팅
        <Grid align="right" sx={{ py : 2, pr : 3}}>
          <Typography sx={{border : '1px solid #f9fbe7', maxWidth : "200px", backgroundColor : "#f9fbe7"}}>
            {chat.message}
          </Typography>
          <Typography >
            {setCurTime(chat.date)}
          </Typography>
        </Grid>
      )
    }
  } else {
    if (chat.over) {
      return (
        <Grid align="left" >
          <Typography sx={{ fontWeight: 'bold' }}>
            {oppNickname}
          </Typography>
          <Typography id={chat.message_id} sx={{ border : '1px solid black'}}>
            {chat.message}
          </Typography>
          <Typography>
            {setCurTime(chat.date)}
          </Typography>
          {isClicked ? <Button onClick={() => { deleteOverMessage() }}>줄이기</Button>
          : <Button onClick={() => { getOverMessage(chat.message_id) }}>더보기</Button>}
        </Grid>
      )
    }
    else {     
      return (
        // 상대방 채팅
        <Grid align="left" sx={{ py : 2, pl : 3}}>
          <Typography sx={{ fontWeight: 'bold', fontSize : 20 }}>
            {oppNickname}
          </Typography>
          <Typography id={chat.message_id} sx={{border : '1px solid #f1f8e9', maxWidth : "200px", backgroundColor : "#f1f8e9"}}>
            {chat.message}
          </Typography>
          <Typography>
            {setCurTime(chat.date)}
          </Typography>
        </Grid>
      )
    }
  }
}



export default ChatBubble;