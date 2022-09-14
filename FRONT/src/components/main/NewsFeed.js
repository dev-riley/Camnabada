import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import { Link } from "react-router-dom";
import ProfileImageInBoard from "../profile/ProfileImageInBoard";
import Photo from "./Photo";
import Button from "@mui/material/Button";

const theme = createTheme();

export default function NewsFeed() {
  const [boardList, setBoardList] = useState([]);
  const [followBoardList, setFollowBoardList] = useState([]);

  const [nickName, setNickName] = useState([]);
  const [loginUserProfile, setLoginUserProfile] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  
  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers: {
      Authorization: accessToken,
    },
  };
  
  const BOARD_GET_URL = "http://i6c109.p.ssafy.io:8000/board";
  const BOARD_FOLLOW_URL = "http://i6c109.p.ssafy.io:8000/board/follow";
  
  const FOLLOW_USER_URL = "http://i6c109.p.ssafy.io:8000/follow/";
  
  const ID_GET_URL = "http://i6c109.p.ssafy.io:8000/user";
  const NICKNAME_GET_URL = "http://i6c109.p.ssafy.io:8000/user/getnickname/";

  function getUserInfo(nick){
    const USERINFO_GET_URL = `http://i6c109.p.ssafy.io:8000/user/${nick}`
    axios
      .get(USERINFO_GET_URL, HEADER)
      .then((res) => {
        setUserInfo(res);
        console.log('유저 정보:', res)
        setLoginUserProfile(res.data[0].photo);
      });
  };

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
  //현재 로그인한 사용자 아이디 가져오기
  const getId = async () => {
    axios
      .get(ID_GET_URL, HEADER)
      .then((response) => {
        getFollower();
      })
      .catch((err) => {
        // console.log(err);
        // alert("로그인이 필요합니다");
      });
  };

  //모든 게시판 가져오기
  const getBoard = async () => {
    axios
      .get(BOARD_GET_URL, HEADER)
      .then((response) => {
        setBoardList(response.data);
        // console.log('ㅇㅇㅇ', response.data);
        getNickName(response.data.clientId);
        // console.log('겟보드',nickName);
      })
      .catch((err) => {
        // alert("게시물이 아예 없습니다");
      });
  };

  //팔로워 불러오기
  function getFollower() {
    const URL = FOLLOW_USER_URL + "follower";
    axios
      .get(URL, HEADER)
      .then((response) => {
        getFollowBoards(response.data);
      })
      .catch((error) => {
        //팔로워가 없어요
        // alert("팔로우가 없어요");
      });
  }

  //팔로우 유저 게시판 불러오기
  function getFollowBoards(follower) {
    let followUserList = [];
    follower.forEach((user) => {
      followUserList.push(user.following);
    });
    axios
      .post(BOARD_FOLLOW_URL, followUserList, HEADER)
      .then((response) => {
        console.log(response.data);
        if (response.data == "") {
          // alert("팔로우 유저 없습니다");
        } else {
          setFollowBoardList(response.data);
          console.log(followBoardList);
          // response.data.forEach(board=>boardList.push(board));
        }
      })
      .catch((error) => {
        alert("팔로우 사용자를 찾을 수 없습니다");
      });
  }


  function getNickName(userId) {
    const URL = NICKNAME_GET_URL + userId;
    axios.get(URL, HEADER).then((res) => {
      setNickName(res.data);
      getUserInfo(res.data);
    })
  }

  useEffect(() => {
    getBoard();
    getId();
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 5,
            pb: 2,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              sx={{
                pt: 1,
                fontWeight: "bold",
              }}
              variant="h4"
              align="left"
              color="text.primary"
              gutterBottom
            >
              뉴스피드{" "}
              <Link to={"/community"} style={{ textDecoration: "none" }}>
                <Button
                  style={{
                    border: "1px black solid",
                    color: "black",
                  }}
                  variant="outlined"
                >
                  더보기
                </Button>
              </Link>
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 0, mb: 8 }} maxWidth="lg">
          <Grid container spacing={4}>
            {followBoardList.map(
              (board, idx) =>
                idx < 3 && (
                  <Grid item key={board} xs={12} sm={6} md={4}>
                    <Link
                      to={`/board/${board.boardId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                          avatar={
                            <Photo boardList={ board } />                            
                          }
                          title={board.title}
                          subheader={setCurTime(board.date)}
                        />
                        {board.photo != "" && (
                          <CardMedia
                            component="img"
                            height="194"
                            image={board.photo}
                            alt="없음"
                          />
                        )}
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            {board.photo == "" && board.content.length > 140 && (
                              <div style={{ height: 122 }}>
                                <h2>더 보기</h2>
                              </div>
                            )}
                            {board.photo != "" && board.content.length > 140 && (
                              <div style={{ height: 28 }}>
                                <h2>더 보기</h2>
                              </div>
                            )}
                            {board.photo == "" && board.content.length <= 100 && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: board.content,
                                }}
                                style={{ height: 245 }}
                              ></div>
                            )}
                            {board.photo != "" && board.content.length <= 100 && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: board.content,
                                }}
                                style={{ height: 51 }}
                              ></div>
                            )}
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton
                            aria-label="add to favorites"
                            color="warning"
                          >
                            <FavoriteIcon />
                            <Typography>{board.like}</Typography>
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Link>
                  </Grid>
                )
            )}
            {boardList.map(
              (board, idx) =>
                idx < 3 && (
                  <Grid item key={board} xs={12} sm={6} md={4}>
                    <Link
                      to={`/board/${board.boardId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card sx={{ maxWidth: 345, maxHight: 345 }}>
                        <CardHeader
                          avatar={
                            <Photo boardList={ board } />
                          }
                          title={board.title}
                          subheader={setCurTime(board.date)}
                        />
                        {board.photo != "" && (
                          <CardMedia
                            component="img"
                            height="194"
                            image={board.photo}
                            alt="없음"
                          />
                        )}
                        <CardContent>
                          <Typography variant="body1" color="text.secondary">
                            {board.photo == "" && board.content.length > 140 && (
                              <div style={{ height: 222 }}>
                                <h2>더 보기</h2>
                              </div>
                            )}
                            {board.photo != "" && board.content.length > 140 && (
                              <div style={{ height: 28 }}>
                                <h2>더 보기</h2>
                              </div>
                            )}
                            {board.photo == "" && board.content.length <= 100 && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: board.content,
                                }}
                                style={{ height: 245 }}
                              ></div>
                            )}
                            {board.photo != "" && board.content.length <= 100 && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: board.content,
                                }}
                                style={{ height: 51 }}
                              ></div>
                            )}
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton
                            aria-label="add to favorites"
                            color="warning"
                          >
                            <FavoriteIcon />
                            <Typography>{board.like}</Typography>
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Link>
                  </Grid>
                )
            )}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
