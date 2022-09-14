// 채팅방 목록 표시
import React, {useRef} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios'
// import SockJsClient from 'react-stomp';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { createRoutesFromChildren, Link, useLocation } from "react-router-dom";
import MessageRoom from './MessageRoom';
import IfRoomId from './IfRoomId';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function MessageRooms() {
  
  const [userInfo, setUserInfo] = React.useState({});
  const [oppUser, setOppUser] = React.useState({});
  const location = useLocation();
  console.log(location.state);
  let fromProfile = false;
  // 채팅 리스트 불러오기
  // date, user, message, chatroomId
  const [lists, setLists] = React.useState([]);
  // 유저 일단 B로 설정
  const [roomId, setRoomId] = React.useState(0);
  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers: {
      'Authorization': accessToken
    }
  }
  // 시간 변환 함수
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
  // 채팅 리스트를 클릭하면 해당 채팅방 내용을 어떻게 띄워줄지?????
  // 초기에 roomNum을 null이면 채팅방 내용X 
  // -> 채팅방 클릭시 해당 채팅방 내용 표시
  function getLists() {
    console.log("getLists act");
    axios.get(
      `http://i6c109.p.ssafy.io:8000/chat/list`, HEADER
    ).then(res => {
      console.log(res.data);
      getNicknames(res.data);
      //setLists(res.data);
    })
  }
  const getNicknames = async (list) => {
    console.log("getNicknames act");
    console.log(list.length);
    let finalLists = [];
    for (let i = 0; i<list.length;i++) {
        console.log(i);
        await axios.get(`http://i6c109.p.ssafy.io:8000/user/getnickname/${list[i].user}`).then(
          res => {
            list[i].nickname = res.data;
            finalLists.push(list[i]);
            console.log(finalLists);
          }
        )
    }
    setLists(finalLists);
  };
  const getUserId = async () => {
    let userId = ""
    let nickname = "";
    console.log("getUserId act");
    axios.get(`http://i6c109.p.ssafy.io:8000/chat/user`, HEADER)
      .then(res => {
        console.log(res);
        userId = res.data;
        axios.get(`http://i6c109.p.ssafy.io:8000/user/getnickname/${res.data}`).then(res => {
          nickname = res.data;
          setUserInfo({ userId: userId, nickname: nickname });
          getLists();
        })
    })
  };
  const createRoom = (userFromProfile) => {
    axios.post(`http://i6c109.p.ssafy.io:8000/chat/room/${userFromProfile}`, {}, HEADER).then(
      res => {
        console.log(res);
        if (res.status === 200) {
          setRoomId(res.data.chatroomId);
          console.log("room created");
          getLists();
        }
        else {
          console.log(res.data.message);
        }
      }
    )
  };
  const getRoomId = (userFromProfile) => {
    console.log("getRoomId act");
    axios.get(`http://i6c109.p.ssafy.io:8000/chat/enter/${userFromProfile}`, HEADER)
      .then(res => {
        console.log(res);
        if (res.status === 204) {
          //방을 새로 만들어야할 때
          createRoom(userFromProfile);
        }
        else {
          console.log(res.data.chatroomId);
          setRoomId(res.data.chatroomId);
          getLists();
        }
      })
  };
  const getOppNickname = (oppUserId) => {
    axios.get(`http://i6c109.p.ssafy.io:8000/user/getnickname/${oppUserId}`).then(
      res => {
        console.log(res.data);
        setOppUser({ oppUserId: oppUserId, oppNickname: res.data });
      }
    )
  }
  React.useEffect(() => {
    getUserId();
    if (location.state !== null) {
      const userFromProfile = location.state.oppUserId;
      console.log(userFromProfile);
      getRoomId(userFromProfile);
      getOppNickname(userFromProfile);
    }
  }, []);
  console.log(userInfo);
  const createMessageRoom = (chatroomId,oppUserId,oppNickname) => {
    setRoomId(chatroomId);
    setOppUser({ oppUserId: oppUserId, oppNickname: oppNickname });
    console.log(roomId);
  };
  console.log(roomId);
  

  
  return (

    <Grid container maxWidth="xl" component="main" sx={{ mt: 12, mx : 3}} >
      <CssBaseline />
      <Grid
        item
        md={6}
        align="center"
        style={{ border : '1px solid black'}}
      >
        <Typography variant="h4" sx={{ my : 2}}>
          Message List
        </Typography>
        {lists.map((list , i) => (
          <Grid 
            onClick={() => { createMessageRoom(list.chatroomId, list.user, list.nickname); }}
            justifyContent="center"
            alignItems="center"
            md={8}
            direction="row"
            style={{ border : '1px solid black'}}
          >
            <Stack direction="row" alignItems="center" style={{ mt : 1}}>
              <Grid item align="center" sx={{ mr:1 }}>
                <AccountCircleIcon sx={{ fontSize: 50, m : 1 }} />
              </Grid>
              <Grid>
                <Stack direction="row" spacing={2}>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {list.nickname}님
                  </Typography>
                  <Typography align="right">
                  </Typography>
                </Stack>
                <Stack>
                  <Typography align="left">
                    {list.message} 
                  </Typography>
                </Stack>
              </Grid>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        md={6}
        align="center"
      >
        <IfRoomId roomId={roomId} userId={userInfo.userId} nickname={userInfo.nickname} oppUserId={oppUser.oppUserId} oppNickname={oppUser.oppNickname} getLists={getLists} getNicknames={getNicknames} lists={lists} setLists={setLists}></IfRoomId>
       </Grid>
    </Grid>

    // <Container>
    //   <Grid direction="row">
    //     {lists.map((list , i) => (
    //       <Grid 
    //         onClick={() => { createMessageRoom(list.chatroomId); }}
    //         justifyContent="center"
    //         alignItems="center"
    //         md={6}
    //       >
    //         <Grid item align="center" md={2.4} sx={{ mr: 4 }}>
    //           <AccountCircleIcon sx={{ fontSize: 50 }} />
    //         </Grid>
    //         <Stack direction="row">
    //           <Stack direction="row">
    //             <Typography sx={{ fontWeight: 'bold' }}>
    //               {list.user}
    //             </Typography>
    //             <Typography>
    //               {list.date} 
    //             </Typography>
    //           </Stack>
    //         </Stack>
    //         <Typography>
    //           {list.message} 
    //         </Typography>
    //       </Grid>
    //     ))}
    //     <Grid 
    //       item
    //       md={6}  
    //       align="center"
    //     >
    //       <IfRoomId roomId={roomId}></IfRoomId>
    //     </Grid>
    //   </Grid>
    // </Container>
 
    

  )
  
}

