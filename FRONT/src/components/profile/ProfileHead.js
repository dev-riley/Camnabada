import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Container, CssBaseline, Typography, Grid, Stack, Box, Tabs, Tab, Card, CardMedia, Button, CardHeader, Avatar, IconButton, CardContent, CardActions, Paper } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from "@mui/material/colors";
import PropTypes from "prop-types";
import IsFollow from "./IsFollow";
import ProfileUser from "./ProfileUser";
import CampingImage from "../camping/CampingImage";
import ProfileImage from "./ProfileImage";
import Paging from '../common/Pagination';
import Photo from "../main/Photo";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const theme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: "center",
  // color: theme.palette.text.secondary,
}));

export default function ProfileHead() {
  const [value, setValue] = React.useState(0);

  // LocalStroage에서 accessToken을 가져와서 header에 Authorization 값으로 담아주기
  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers: {
      Authorization: accessToken,
    },
  };
  //페이지네이션 관련
  const [boardPageNum, setBoardPageNum] = React.useState(1);
  const [LikedCampingPageNum, setLikedCampingPageNum] = React.useState(1);
  const [numPerPage, setNumPerPage] = React.useState(3);
  
  let boardOffset = (boardPageNum - 1) * numPerPage;
  let LCOffset = (LikedCampingPageNum - 1) * numPerPage;
  const { nick } = useParams();
  const [userInfo, setUserInfo] = useState("");
  const [otherUserCheck, setOtherUserCheck] = useState("");
  const [isFollow, setIsFollow] = useState(false);

  const [loading, setLoading] = useState(true);
  const [userIntro, setUserIntro] = useState("");
  const [followerList, setFollowerList] = useState("");
  const [followingList, setFollowingList] = useState("");

  const [otherFollowerLength, setOtherFollowerLength] = useState("");
  const [otherFollowingLength, setOtherFollowingLength] = useState("");

  const [likedCampings, setLikedCampings] = useState("");

  const [boardList, setBoardList] = useState([]);

  const getFollow = (isFollow) => {
    setIsFollow(isFollow);
    getUserId();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 유저 정보 얻어오기
  // nick은 한글이라 인코딩
  

  //현재 프로필 사용자

  const uri = `http://i6c109.p.ssafy.io:8000/user/${nick}`;
  const encoded = encodeURI(uri);

  const getUserId = async() => {
    await axios.get(encoded).then((res) => {
      setUserInfo(res.data);
      console.log('resres', res);
      setLoading(false);
      setUserIntro(res.data[0].intro);

      followCheck(res.data);
    });
  };

  // getUserId();

  const getUserInfo = async() => {
    const json = await (
      await fetch(`http://i6c109.p.ssafy.io:8000/user/${nick}`)
    ).json();
    setLoading(false);
    setUserInfo(json); 
  };




  // function getUserInfo(nick) {
  //   const USERINFO_GET_URL = `http://i6c109.p.ssafy.io:8000/user/${nick}`;
  //   axios
  //     .get(USERINFO_GET_URL, HEADER)
  //     .then((res) => {
  //       setUserInfo(res);
  //       setLoading(false);
  //       console.log('131번째', res);
  //       setUserIntro(res.data[0].intro);
  //       // setLoginUserProfile(res.data[0].photo);
  //       // console.log('로그은유저프로ㅓ필',loginUserProfile);
  //     });

  // }

  // getUserInfo(nick);

  //팔로잉 리스트
  function getFollwoingList(loginUserId, profileUserId) {
    const URL = `http://i6c109.p.ssafy.io:8000/follow/${profileUserId}/following`;
    axios.get(URL, HEADER).then((res) => {
      setFollowingList(res.data);
      console.log('팔로잉`````````````````````````````````````````````````````````````');
      res.data.map((folloUser) => {
        //console.log(folloUser.following + " " + loginUserId);
        if (folloUser.follower == loginUserId) {
          console.log('팔로잉 중이야~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
          setIsFollow(true);
        }
      });
    });
  }

  //팔로워 리스트
  function getFollowerList(profileUserId) {
    const URL = `http://i6c109.p.ssafy.io:8000/follow/${profileUserId}/follower`;
    axios.get(URL, HEADER).then((res) => {
      console.log('팔로워`````````````````````````````````````````````````````````````');
      console.log(res.data);
      setFollowerList(res.data)
    });
  }

  //현재 로그인한 사용자인지 아닌지
  function followCheck(user) {
    const URI = `http://i6c109.p.ssafy.io:8000/user`;
    axios.get(URI, HEADER).then((res) => {
      getFollwoingList(res.data, user[0].id); //검색한 프로필 id
      getFollowerList(user[0].id);

      if (res.data == user[0].id)
        setOtherUserCheck(false);
      else {
        setOtherUserCheck(true);
      }
    });
  }

  //닉네임을 이용하여 해당 유저가 좋아요한 캠핑장 리스트 불러오기
  const getLikedCampingList = () => {
    axios
      .get(encodeURI(`http://i6c109.p.ssafy.io:8000/camp/like/list/${nick}`),HEADER)
      .then((res) => {
        setLikedCampings(res.data);
      });
  };

  //모든 게시판 가져오기
  const getBoardList = async() => {
    await axios
      .get(`http://i6c109.p.ssafy.io:8000/board`, HEADER)
      .then((response) => {
        setBoardList(response.data);
      })
      .catch((err) => {
        // alert("게시물이 아예 없습니다");
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



  React.useEffect(() => {
    getUserId();
    getUserInfo();
    getFollowerList();
  }, []);

  // React.useEffect(() => {
  //   getUserId();
  // }, [nick]);

  React.useEffect(() => {
    getLikedCampingList();
  }, [nick]);

  useEffect(() => {
    getBoardList();
  }, []);

  const searchList = [];
  const myBoardList = [];
  for (var i = 0; i < likedCampings.length; i++) {
    searchList.push(likedCampings[i]);
  }

  console.log('userInfo는', userInfo);

  for (var i = 0; i < boardList.length; i++) {
    if(boardList[i].clientId === userInfo[0].id)
      myBoardList.push(boardList[i]);
  }
  let totalBoardListCount = myBoardList.length;
  let totalLikedCampingCount = searchList.length;

  return (
    <div>
      {loading ? null : (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <main>
            <Container sx={{ py: 0, mt: 12, mb: 8 }} maxWidth="md">
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                  mb: 5,
                }}
              >
                <Grid item align="center" md={2.4} sx={{ mr: 4 }}>
                  {/* <div>
                    {userInfo ? (
                      null
                      ): (
                      <ProfileImage userInfo={ userInfo } />
                    )}
                  </div> */}
                  <ProfileImage userInfo={ userInfo } />
                  {/* <AccountCircleIcon sx={{ fontSize: 150 }} /> */}
                </Grid>
                <Grid item md={7.2}>
                  <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {nick}
                    </Typography>
                    {otherUserCheck == false &&
                      <ProfileUser />
                    }
                    {otherUserCheck == true && (
                        <IsFollow
                          isFollow={isFollow}
                          followUser={userInfo[0].id}
                          getFollow={getFollow}
                        ></IsFollow>
                          )}
                    {otherUserCheck == true && (
                        <Link
                          to={"/message"}
                          state={{
                            oppUserId: userInfo[0].id,
                          }}
                          style={{ textDecoration: "none" }}
                          >
                          <Button
                            style={{
                              color: "white",
                              variant: "secondary",
                              backgroundColor: "#1b5e20",
                            }}
                            variant="outlined"
                          >
                            메시지 보내기
                          </Button>
                        </Link>
                    )}
                    {otherUserCheck == false && (
                      <div>
                        <Button
                          style={{
                            border: "1px black solid",
                            color: "black",
                          }}
                          onClick={() => {
                            window.location.href = `/profile/update/${nick}`;
                          }}
                          variant="outlined"
                        >
                          프로필 편집
                        </Button>
                      </div>
                    )}
                  </Stack>
                  {/* 게시물, 팔로워, 팔로우 부분 */}
                  <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
                    <Stack direction="row" spacing={1}>
                      <Typography sx={{ fontSize: 20 }}>게시물</Typography>
                      <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                        {myBoardList.length}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Typography sx={{ fontSize: 20 }}>팔로워</Typography>
                      <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                        {otherUserCheck === true && followingList.length}
                        {otherUserCheck === false && followingList.length}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Typography sx={{ fontSize: 20 }}>팔로잉</Typography>
                      <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                        {otherUserCheck === true && followerList.length}
                        {otherUserCheck === false && followerList.length}
                      </Typography>
                    </Stack>
                  </Stack>
                  {/* 자기 소개 부분 */}
                  <Stack>
                    {/* 150자 예시 */}
                    {userIntro}
                  </Stack>
                </Grid>
                {/* <Stack
              direction="column"
              spacing={2}
            >
              <Item>
                <Link to={'/create'} style={{textDecoration:'none'}}>
                  <Button
                    style={{
                      backgroundColor: "#009688"
                    }}
                    variant="contained"
                  >
                    게시글 작성
                  </Button>
                </Link>
              </Item>
              <Item>
                <Link to={'/profile/update'} style={{textDecoration:'none'}}>
                  <Button variant="contained">
                    프로필 편집
                  </Button>
                </Link>
              </Item>
            </Stack> */}
              </Grid>

              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    centered
                  >
                    <Tab label="올린 게시물" {...a11yProps(0)} />
                    <Tab label="좋아요한 캠핑장" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0} align="center">
                  <Container sx={{ py: 0, mb: 8 }} maxWidth="lg">
                    <Grid container spacing={4}>
                      {console.log(boardList.length)}
                      {console.log(totalBoardListCount)}
                      {myBoardList.slice(boardOffset,boardOffset+numPerPage).map(
                        (board, idx) =>
                           (
                            
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
                                    <Typography
                                      variant="body1"
                                      color="text.secondary"
                                    >
                                      {board.photo == "" &&
                                        board.content.length > 140 && (
                                          <div style={{ height: 122 }}>
                                            <h2>더 보기</h2>
                                          </div>
                                        )}
                                      {board.photo != "" &&
                                        board.content.length > 140 && (
                                          <div style={{ height: 28 }}>
                                            <h2>더 보기</h2>
                                          </div>
                                        )}
                                      {board.photo == "" &&
                                        board.content.length <= 100 && (
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: board.content,
                                            }}
                                            style={{ height: 225 }}
                                          ></div>
                                        )}
                                      {board.photo != "" &&
                                        board.content.length <= 100 && (
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
                  <Paging pageNum={boardPageNum} setPageNum={setBoardPageNum} numPerPage={numPerPage} totalListCount={totalBoardListCount}></Paging>
                </TabPanel>
                <TabPanel value={value} index={1} align="center">
                  {/* <Card
                    // sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    sx={{ maxWidth: 345 }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        // pt: '56.25%',
                        pt: "0%",
                      }}
                      image="https://images.unsplash.com/photo-1641157141085-8454fbc33f3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MzExNTc1NQ&ixlib=rb-1.2.1&q=80&w=1080"
                      alt="CampingImage"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        $캠핑장 이름
                      </Typography>
                    </CardContent> */}
                  {/* 캠핑장 상세 정보 링크 걸기 */}
                  {/* <Link to={"/campingdetail"}>
                      <CardActions>
                        <Button size="small">상세정보</Button>
                      </CardActions>
                    </Link>
                  </Card> */}

                  <Container sx={{ py: 0 }} maxWidth="lg">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                      {/* {console.log("mmmmmmmmmmmmmmmmmmmmmmmmmm")} */}
                      {searchList.slice(LCOffset, LCOffset+numPerPage).map((camp) => (
                        <Grid item key={camp.campId} xs={12} sm={6} md={3}>
                          <Card
                            sx={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                            align="center"
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.href = `/camping/${camp.campId}`;
                            }}
                          >
                            <CampingImage basics={camp}></CampingImage>
                            <CardContent sx={{ flexGrow: 1 }}>
                              <Typography gutterBottom variant="subtitle1">
                                {camp.facltNm}
                              </Typography>
                            </CardContent>
                            <IconButton
                              aria-label="add to favorites"
                              color="warning"
                              align="left"
                            >
                              <FavoriteIcon />
                              <Typography>{camp.likes}</Typography>
                            </IconButton>
                            {/* <CardActions>
                    <Button size="small">상세정보</Button>
                  </CardActions> */}
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Container>
                  <Paging pageNum={LikedCampingPageNum} setPageNum={setLikedCampingPageNum} numPerPage={numPerPage} totalListCount={totalLikedCampingCount}></Paging>
                </TabPanel>
              </Box>
            </Container>
          </main>
        </ThemeProvider>
      )}
    </div>
  );
}