import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TextField, Box, CssBaseline, Typography, Stack, Button } from '@mui/material';
import NavBar from '../../components/common/NavBar'
import Editor from '../../components/board/Editor'
import RadioButtonCamping from '../../components/board/RadioButtonCamping'
import CampingSearch from '../../components/camping/CampingSearch';
import StickyFooter from '../../components/common/Footer';

export default function Create() {
  const [campId, setCampId] = useState('')
  const [tag, setTag] = useState('')
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [clientId, setClientId] = useState('');
  const [photo, setPhoto] = useState('');
  
  const [communityTag, setCommnunityTag] = useState(true);
  const [campTag, setCampTag] = useState(true);

  const BOARD_CREATE_URL = 'http://i6c109.p.ssafy.io:8000/board';
  const BOARD_LIST_URL = 'http://i6c109.p.ssafy.io:80/community';
  const ID_GET_URL = 'http://i6c109.p.ssafy.io:8000/user'
  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers:{
    'Authorization': accessToken
  }
  }

  const onSubmit = () => {
    console.log(campTag + " ``````````````````` " + campId);
    if (content === "" || tag === "" || title === "" || clientId === "")
      alert("게시판에 등록할 목록을 모두 작성해 주세요");
    else if (campTag === false) {
      axios.post(BOARD_CREATE_URL, {
        "campId": 2911,//자유 게시판
        "clientId": clientId,
        "photo": photo,
        "content": content,
        "tag": tag,
        "title": title
      }, HEADER)
        .then((res) => {
          console.log(res)
          alert("게시판에 등록하였습니다!");
          window.location.href = (BOARD_LIST_URL);
        }).catch(() => {
          alert("전송에 실패하였습니다");
        })
    }
    else {
      axios.post(BOARD_CREATE_URL, {
        "campId": campId,
        "clientId": clientId,
        "photo": photo,
        "content": content,
        "tag": tag,
        "title": title
      }, HEADER)
        .then((res) => {
          console.log(res)
          alert("게시판에 등록하였습니다!");
          window.location.href = (BOARD_LIST_URL);
        }).catch(() => {
          alert("전송에 실패하였습니다");
        })
    }
  }

  //현재 로그인한 사용자 아이디 가져오기
  const getId = async () => {
    axios.get(ID_GET_URL, HEADER)
      .then((response) => {
        setClientId(response.data);
      }).catch((error) => {
        //에러처리
        alert("댓글이 없습니다");
      });
  }

  //태그 받아오기
  const tag_camp_data = (data) => {
    console.log(data);
    if (data === '장비 후기'|| data === '자유소통-자유') {
      setCommnunityTag(true);
      setCampTag(false);
    }
    else{
      setCommnunityTag(false);
      setCampTag(true);
    }
    setTag(data);
  }
  
  //캠핑 데이터 받아오기
  const camping_data = (data) => {
    console.log(data[0].id);
    setCampId(data[0].id);
  }
  
  //제목 데이터 받아오기
  const title_data = (data) => {
    console.log(data.target.value);
    setTitle(data.target.value);
  }

  //내용 받아오기
  const content_data = (data) => {
    console.log(data);
    setContent(data);
  }
  //사진 받아오기
  const image_data = (data) => {
    console.log(data);
    setPhoto(data);
  }

  useEffect(() => {
    getId();
  }, [])

  return (
    <div>
      <NavBar></NavBar>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt : 13}}>
        <Box sx={{ height : '700', border : '5px solid black', m : 5, py : 10, px : 10 }}>
          <Stack spacing={2} >
            <RadioButtonCamping
              func1={tag_camp_data}
            ></RadioButtonCamping>
          </Stack>
          <Box sx={{ width: 500, maxWidth: "100%", mt : 2}}>
          사용자 아이디: {clientId}
          </Box>
          {campTag === true &&
            <CampingSearch
              func={camping_data}
            ></CampingSearch>
          }
          <Box sx={{ width: 500, maxWidth: "100%", mt : 2}}>
            <TextField
              onChange={title_data}  
              fullWidth
              required
              label="제목을 입력해주세요"
            />
          </Box>
          <Editor
            func1={content_data}
            func2={ image_data }
          ></Editor>
          <Typography align="right" sx={{ mr : 3}}>
            <Button
              onClick={onSubmit}
              type="submit" 
              variant="contained" 
              sx={{ mt : 2 }}
            >
              작성 완료
            </Button>
          </Typography>
        </Box>
      </Container>
      <StickyFooter/>
    </div>
  )
}
