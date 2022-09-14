import NavBar from '../../components/common/NavBar'
import RadioButtonCamping from '../../components/board/RadioButtonCamping'
import CampingSearch from '../../components/camping/CampingSearch';
import { Container, TextField, Box, CssBaseline, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import StickyFooter from '../../components/common/Footer';

export default function BoardUpdate() {
  useEffect(() => {
    getBoards();
  }, [])

  const [campId, setCampId] = useState('')
  const [tag, setTag] = useState('')
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { boardId } = useParams();
  const [dataList, setDataList] = useState([]);

  const BOARD_GET_URL = `http://i6c109.p.ssafy.io:8000/board/one/${boardId}`;
  const BOARD_UPDATE_URL = 'http://i6c109.p.ssafy.io:8000/board';
  const HOME_TEST_URL = `http://i6c109.p.ssafy.io:80/board/${boardId}`;

  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers:{
    'Authorization': accessToken
    }
  }

  //게시판 가져오기
  const getBoards = async () => {
    axios.get(BOARD_GET_URL,HEADER)
      .then((response) => {
        document.getElementById("clientId").innerText = response.data.clientId;
        setDataList(response.data);
      }).catch((error) => {
        alert("찾을 게시판이 없습니다");
      });
  };
  
  //태그 받아오기
  const tag_camp_data = (data) => {
    setTag(data);
  }
  
  const tag_commnunity_data = (data) => {
    setTag(data);
  }
  
  //캠핑 데이터 받아오기
  const camping_data = (data) => {
    setCampId(data[0].id);
  }
  
  //제목 데이터 받아오기
  const title_data = (data) => {
    setTitle(data.target.value);
  }

  //내용 받아오기
  const content_data = (data) => {
    setContent(data.target.value);
  }
    
  const handleSubmit = (event) => {
    if (campId == "" || content == "" || tag == "" || title == "")
      alert("수정할 항목을 모두 작성해주세요");
    else {
      //게시판 수정하기
      axios.put(BOARD_UPDATE_URL,{
        "boardId": boardId,
        "campId": campId,
        "clientId": dataList.clientId,
        "content": content,
        "photo": dataList.photo,
        "tag": tag,
        "title": title
      },HEADER)
        .then((response) => {
          console.log(response)
          window.location.href = HOME_TEST_URL;
      }).catch((error) => {
        alert("찾을 게시판이 없습니다");
      });
    }
  }
  return (
    <div>
      <NavBar></NavBar>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt : 13}}>
        <Box sx={{ height : '700', border : '5px solid black', m : 5, py : 10, px : 15 }}>
          <Stack spacing={2} >
            <RadioButtonCamping
              func1={tag_camp_data}
              func2={tag_commnunity_data}
            ></RadioButtonCamping>
          </Stack>
          <Box sx={{ width: 500, maxWidth: "100%", mt: 2 }}>
          사용자 아이디: <span id="clientId"/>
          </Box>
          <CampingSearch
          func={camping_data}
          ></CampingSearch>
          <Box sx={{ width: 500, maxWidth: "100%", mt : 2}}>
            <TextField 
              onChange={title_data}
              fullWidth
              required
              label="제목을 입력해주세요"
            />
          </Box>
          <Box sx={{ width : 500, maxwidth: "100%", mt : 2 }}>
            <TextField
              onChange={content_data}
              label="내용을 입력해주세요."
              required
              fullWidth
              multiline
              minRows={7}
            />
          </Box>
          <Typography align="right" sx={{ mr : 3}}>
            <Button
              onClick={handleSubmit}
              type="submit" 
              variant="contained" 
              sx={{ mt : 2 }}
            >
              수정 완료
            </Button>
          </Typography>
        </Box>
      </Container>
      <StickyFooter/>
    </div>
  )
}