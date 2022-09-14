import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  CssBaseline,
  Typography,
  Grid,
  Stack,
  Button,
  Divider,
  Input,
  Paper,
  IconButton,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
// import StickyFooter from "../../components/common/Footer";
// import Input from '@mui/material/Input';

import ProfileImage from "../profile/ProfileImage";
import ProfileImageInBoard from "../profile/ProfileImageInBoard";

const theme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BoardDetailMine() {
  const { boardId } = useParams();

  const [allCommentLike, setAllCommentLike] = useState([]);
  const [clientId, setClientId] = useState([]);
  const [boardUserId, setBoardUserId] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [comments, setComments] = useState([]);
  const [nickName, setNickName] = useState([]);

  const [userInfo, setUserInfo] = useState([]);
  const [loginUserProfile, setLoginUserProfile] = useState([]);

  const BOARD_GET_URL = `http://i6c109.p.ssafy.io:8000/board/one/${boardId}`;
  const BOARD_GET_CAMPNAME_URL = 'http://i6c109.p.ssafy.io:8000/camp/basic/one/'
  const ID_GET_URL = "http://i6c109.p.ssafy.io:8000/user";
  const NICKNAME_GET_URL = "http://i6c109.p.ssafy.io:8000/user/getnickname/";

  const BOARD_DELETE_URL = `http://i6c109.p.ssafy.io:8000/board/${boardId}`;
  const BOARD_ONE_LIKE_URL = `http://i6c109.p.ssafy.io:8000/like/board/`;

  const COMMENT_GET_URL = `http://i6c109.p.ssafy.io:8000/comment/${boardId}`;
  const COMMENT_CREATE_URL = `http://i6c109.p.ssafy.io:8000/comment`;
  const COMMENT_DELETE_URL = `http://i6c109.p.ssafy.io:8000/comment/`;
  const COMMENT_ONE_LIKE_URL = `http://i6c109.p.ssafy.io:8000/like/comment/`;

  const HOME_TEST_URL = "http://i6c109.p.ssafy.io:80/community";
  const PROFILE_MOVE_URL = "http://i6c109.p.ssafy.io:80/profile/";

  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers: {
      Authorization: accessToken,
    },
  };

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
  //사용자 가져오기
  function getUserInfo(nick){
    const USERINFO_GET_URL = `http://i6c109.p.ssafy.io:8000/user/${nick}`
    axios
      .get(USERINFO_GET_URL, HEADER)
      .then((res) => {
        setUserInfo(res);
        setLoginUserProfile(res.data[0].photo);
        console.log('로그은유저프로ㅓ필',loginUserProfile);
      });
  };

  const addCampName = async (boardList) => {
    await axios.get(BOARD_GET_CAMPNAME_URL + boardList.campId, HEADER).then(res => {
      if (res.data.facltNm == "string")
        boardList.campName = "-";
      else
        boardList.campName = res.data.facltNm;
    })
    
    setDataList(boardList);
  }
  //게시판 가져오기
  const getBoards = async () => {
    axios
      .get(BOARD_GET_URL, HEADER)
      .then((response) => {
        setBoardUserId(response.data.clientId);
        addCampName(response.data);
        getNickName(response.data.clientId);
        const onePhoto = response.data.photo;
        console.log(onePhoto);
        if (onePhoto != "") {
          document.getElementById("userImage").setAttribute("src", onePhoto);
        }
        const oneContent = response.data.content;
      })
      .catch((error) => {
        //에러처리
        alert("게시판이 비어있습니다");
      });
  };

  //닉네임 가져오기
  function getNickName(userId) {
    const URL = NICKNAME_GET_URL + userId;
    axios.get(URL, HEADER).then((response) => {
      setNickName(response.data);
      getUserInfo(response.data);
    });
  }

  //댓글 가져오기
  const getComments = async () => {
    axios
      .get(COMMENT_GET_URL, HEADER)
      .then((response) => {
        let allLike = 0;
        response.data.forEach((oneComment) => {
          allLike += oneComment.like;
        });
        setComments(response.data);
        setAllCommentLike(allLike);
      })
      .catch((error) => {
        //에러처리
        alert("댓글이 없습니다");
      });
  };

  //현재 로그인한 사용자 아이디 가져오기
  const getId = async () => {
    axios
      .get(ID_GET_URL, HEADER)
      .then((response) => {
        setClientId(response.data);
      })
      .catch((error) => {
        //에러처리
        alert("댓글이 없습니다");
      });
  };

  //게시판 지우기
  const deleteOneBoard = () => {
    axios
      .delete(BOARD_DELETE_URL, HEADER)
      .then((response) => {
        window.location.href = HOME_TEST_URL;
      })
      .catch((error) => {
        alert("지울 수 없는 게시물입니다");
      });
  };

  //댓글 작성하기
  const createOneComment = () => {
    const oneContent = document.getElementById("newComment");
    axios
      .post(
        COMMENT_CREATE_URL,
        {
          boardId: boardId,
          clientId: clientId,
          content: oneContent.value,
        },
        HEADER
      )
      .then((response) => {
        oneContent.value = '';
        getComments();
      })
      .catch((error) => {
        alert("댓글 작성에 실패하였습니다");
      });
  }

  const onKeyPress = (e) => {
      if (e.key == 'Enter') createOneComment(); 
  }
  
  //댓글 지우기
  const deleteOneComment = (e, comment) => {
    const URL = COMMENT_DELETE_URL + comment.commentId;
    axios
      .delete(URL, HEADER)
      .then((response) => {
        getComments();
      })
      .catch((error) => {
        alert("댓글 제거에 실패하였습니다");
      });
  };

  //  //댓글 수정하기
  //  const updateOneComment = (e, comment) => {
  //    axios.put(COMMENT_CREATE_URL, {
  //     "boardId": 0,
  //     "clientId": "string",
  //     "commentId": 0,
  //     "content": "string",
  //    }, HEADER)
  //     .then((response) => {

  //     }).catch((error) => {
  //       alert("댓글 수정에 실패하였습니다");
  //     });
  // }

  //댓글 좋아요와 싫어요
  const [likeComment, setLikeComment] = useState(false);
  const commentOneLike = (e, commentId) => {
    const URL = COMMENT_ONE_LIKE_URL + commentId;
      axios
        .get(URL, HEADER)
        .then((response) => {
          if (response.status === 204) {
            axios
              .delete(URL, HEADER)
              .then((response) => {
                getComments();
                setLikeComment(false);
              })
              .catch((error) => {
                alert("싫어요에 실패하였습니다");
              });
          } else {
            //좋아요 성공
            getComments();
            setLikeComment(true);
          }
        })
        .catch((error) => {
          alert("좋아요에 실패하였습니다");
        });
    };

  //게시판 좋아요와 싫어요 & 아이콘 변경
  const [like, setLike] = useState(false);
  const boardOneLike = (e, boardId) => {
    const URL = BOARD_ONE_LIKE_URL + boardId;
      axios
        .get(URL, HEADER)
        .then((response) => {
          if (response.status === 204) {
            axios
              .delete(URL, HEADER)
              .then((response) => {
                getBoards();
                setLike(false);
              })
              .catch((error) => {
                alert("싫어요에 실패하였습니다");
              });
          } else {
            //좋아요 성공
            getBoards();
            setLike(true);
          }
        })
        .catch((error) => {
          alert("좋아요에 실패하였습니다");
        });
  };

  function goProfile(e, id) {
    window.location.href = PROFILE_MOVE_URL + id;
  }

  function formatDate(date) {
    return date.getFullYear() + '년 ' + 
      (date.getMonth() + 1) + '월 ' + 
      date.getDate() + '일 ' + 
      date.getHours() + '시 ' + 
      date.getMinutes() + '분';
  }

  useEffect(() => {
    getBoards();
    getComments();
    getId();
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [boardId]);

  const content = dataList.content;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ p:0, mt: 12, mb: 8}} maxWidth="md">
          <Typography sx={{ mb: 1 }}>
            &#60;{dataList.tag}&#62;
          </Typography>
          <Typography sx={{ mb: 1 }}>
            &#60;{dataList.campName}&#62;
          </Typography>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {dataList.title}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              mb: 2,
            }}
          >
              {/* <ProfileImage userInfo={ dataList } /> */}
            <Grid sx={{width: '5ch'  }} onClick={(e) => {goProfile(e, nickName);}}>
              <ProfileImageInBoard loginUserProfile={ loginUserProfile } />
            </Grid>
            <Grid>
              <Stack direction='row' alignItems="center">
                <Typography>
                  {nickName}
                </Typography>
                  { like ? <FavoriteIcon onClick={(e)=>{boardOneLike(e, dataList.boardId)}} sx={{ fontSize : 20, mx : 1, color : '#f44336'}}/> 
                  : <FavoriteBorderIcon onClick={(e)=>{boardOneLike(e, dataList.boardId)}} sx={{ fontSize : 20, mx : 1, color : '#f44336'}}/> }
                <Typography >
                  {dataList.like}
                </Typography>
              </Stack>
              <Typography>
                {setCurTime(dataList.date)}
              </Typography>
            </Grid>
          </Stack>

          <img id="userImage" width="850" />
          <Box sx={{ mb: 2 }}>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
            {/* {dataList.content.innerText} */}
          </Box>
          <Divider sx={{ borderBottomWidth: 5, mb: 1 }} />
          <Stack direction="row" spacing={2} alignItems="center">
            <Grid>
              <Stack direction="row" alignItems="center">
                {like ? (
                  <FavoriteIcon
                    onClick={(e) => {
                      boardOneLike(e, dataList.boardId);
                    }}
                    sx={{ fontSize: 25, mx: 1, color: "#f44336" }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={(e) => {
                      boardOneLike(e, dataList.boardId);
                    }}
                    sx={{ fontSize: 25, mx: 1, color: "#f44336" }}
                  />
                )}
                <Typography>{dataList.like}</Typography>
                <Grid>
                  <ChatBubbleOutlineIcon sx={{ fontSize: 21, mx: 1 }} />
                </Grid>
                <Grid>댓글 {comments.length}</Grid>
              </Stack>
            </Grid>
          </Stack>
          <Divider sx={{ borderBottomWidth: 5, my: 1 }} />
          {/* 댓글 출력 부분 */}
          <Stack direction="column">
            {comments.map((comment) => (
              <Grid item key={comment}>
                <Grid>
                  <Stack direction="row" alignItems="center">
                    <Typography sx={{ fontWeight: "bold" }}>
                      {comment.clientId}
                    </Typography>
                    { comment.like ? <FavoriteIcon onClick={(e)=>{commentOneLike(e, comment.commentId)}} sx={{ fontSize : 25, mx : 1, color : '#f44336'}}/> 
                    : <FavoriteBorderIcon onClick={(e)=>{commentOneLike(e, comment.commentId)}} sx={{ fontSize : 25, mx : 1, color : '#f44336'}}/> }
                    <Typography >
                      {comment.like}
                    </Typography>
                    <Grid sx={{ ml : 1}}>
                      <IconButton>
                        {clientId == comment.clientId &&
                          <DeleteIcon onClick={(e)=>{deleteOneComment(e, comment)}} sx={{ color : '#f44336' }}/>
                          // <Button variant="outlined" style={{ backgroundColor : "#f44336"}}
                          //   onClick={(e)=>{deleteOneComment(e, comment)}}
                          // >
                          // 삭제
                          // </Button>
                        }
                      </IconButton>
                    </Grid>
                  </Stack>
                </Grid>
                <Grid>
                  <Typography id="boardcontent">{comment.content}</Typography>
                </Grid>
                <Grid>
                  <Typography>
                    {setCurTime(comment.date)}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Stack>
          <Stack
            direction="row"
            sx={{
              mb: 2,
            }}
          >
            <Input
              placeholder="댓글을 남겨보세요."
              id="newComment"
              onKeyPress={onKeyPress}
            >
            </Input>
            <Button
              id="summitBtn"
              type="submit"
              sx={{
                m: 1,
                minWidth: 70,
                height: "6ch",
              }}
              variant="contained"
              onClick={createOneComment}
              style={{ backgroundColor: "#1b5e20" }}
            >
              등록
            </Button>
          </Stack>
          {clientId === dataList.clientId && (
            <Stack direction="row" spacing={2} justifyContent="right">
              <Item>
                <Link
                  to={`/board/update/${boardId}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#1b5e20" }}
                  >
                    게시글 수정
                  </Button>
                </Link>
              </Item>
              <Item>
                <Button
                  style={{
                    backgroundColor: "#f44336",
                  }}
                  variant="contained"
                  onClick={deleteOneBoard}
                >
                  게시글 삭제
                </Button>
              </Item>
            </Stack>
          )}
        </Container>
      </main>
      {/* <StickyFooter/> */}
    </ThemeProvider>
  );
}

