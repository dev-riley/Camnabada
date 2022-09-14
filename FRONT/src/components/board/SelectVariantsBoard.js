import * as React from 'react';
import Axios from 'axios'
import { Container, Box, Stack, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import CampingSearch2 from '../camping/CampingSearch2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paging from '../common/Pagination';

// d.date

export default function SelectVariants() {
  const [camp, setCamp] = React.useState('');

  const [sido, setSido] = React.useState('');

  const [sigungu, setSigungu] = React.useState('');

  const [tag, setTag] = React.useState('');

  const [isAll, setIsAll] = React.useState(false);
  
  const [dataList, setDataList] = React.useState([]);
  
  const [titleKeyword, setTitleKeyword] = React.useState('');
  
  const [targetList, setTargetList] = React.useState('');
  
  const [campings, setCampings] = React.useState([]);
  
  const [sidosjson, setSidosjson] = React.useState('');

  const [sigungusjson, setSigungusjson] = React.useState('');

  const [pageNum, setPageNum] = React.useState(1);

  const [numPerPage, setNumPerPage] = React.useState(10);

  const sidos = [];
  const sigungus = [];
  var dropbox3 = [];
  var camps = [];
  var temp = [];
  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers: {
      Authorization: accessToken,
    },
  };
  const CAMP_GET_URL = 'http://i6c109.p.ssafy.io:8000/camp/basic/list';
  const CAMP_GET_NAME_URL = `http://i6c109.p.ssafy.io:8000/camp/basic/one/`;
  const BOARD_GET_URL = 'http://i6c109.p.ssafy.io:8000/board';
  const SIGUNGU_GET_URL = `http://i6c109.p.ssafy.io:8000/camp/basic/list/sigungu/${sido}`;
  const SIDO_GET_URL = 'http://i6c109.p.ssafy.io:8000/camp/basic/list/sido';
  const KEYWORD_GET_URL = `http://i6c109.p.ssafy.io:8000/board/search/${titleKeyword}`

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
  const getTitleKeyword = (e) => {
    setTitleKeyword(e.target.value);
  }

  const handleChange = (event) => {
    setTag(event.target.value);
  };

  const handleChange1 = (event) => {
    setSido(event.target.value);
  };
  
  const handleChange2 = (event) => {
    setSigungu(event.target.value);
  };

  const handleChange3 = (event, value) => {
    setCamp(value)
  }
  
  React.useEffect(() => {
    getCampings()
  }, []);

  const getCampings = async() => {
    const json = await (
      await fetch (
        CAMP_GET_URL, HEADER
        
      )
    ).json();
    setCampings(json);
  };


  React.useEffect(() => {
    Axios.get(SIDO_GET_URL,HEADER)
      .then(res => setSidosjson(res.data))   
  }, []);


  // sido 값이 변화할 때만 api 호출!
  React.useEffect(() => {
    if (sido !== '') {
      Axios.get(SIGUNGU_GET_URL,HEADER)
        .then(res => setSigungusjson(res.data)) 
    }
  }, [sido]);

  for (var i=0; i<sidosjson.length; i++) {
    sidos.push(sidosjson[i].doNm)
  }

  for (var i=0; i<sigungusjson.length; i++) {
    sigungus.push(sigungusjson[i].sigunguNm)
  }
  
  for (var i=0; i<campings.length; i++) {
    if (sido !== '') {
      if (sigungu === '') {
        if (campings[i].doNm === sido) {
          dropbox3.push(campings[i].facltNm);
          camps.push(campings[i].campId)       
        } 
      } else {
        if (campings[i].doNm === sido && campings[i].sigunguNm === sigungu) {
          dropbox3.push(campings[i].facltNm);
          camps.push(campings[i].campId)
        }
      }
    } 
  }
  
  // 최종 선택된 캠핑장
  var finalc = '';
  for (var i=0; i<camps.length; i++) {
    if (camp === dropbox3[i]) {
      finalc = camps[i]
    }
  }

  React.useEffect(() => {
    if (sido === '' && sigungu === '') {
      setIsAll(true);
    } else {
      setIsAll(false);
    };
  }, [sido]);
  
  var campnames = [];
  
  React.useEffect(() => {
    for (var i; i<campings.length; i++) {
      campnames.push(campings[i].facltNm);
    };

  },[]);
  
  const [campId, setCampId] = React.useState('')
  
  const camping_data = (data) => {
    console.log(data[0].id);
    setCampId(data[0].id);
  }
  
  function clickButton() {
    if (finalc !== '') {
      window.location.href = `/community/${finalc}`;
    } else if (campId !== '') {
      window.location.href = `/community/${campId}`;
    } else {
    alert('캠핑장을 선택해주세요!');
    }
  }

  const getBoards = async () => {
    Axios.get(BOARD_GET_URL,HEADER)
      .then((response) => {
        let boardList = response.data;
        boardList.sort(function (a, b) {
          if(a.date > b.date)
            return -1;
          else if(a.date == b.date)
            return 0;
          else
            return 1;
        })
        addCampName(boardList);
      }).catch((error) => {
        alert("게시판이 비어있습니다");
      });
    };
const addCampName = async (boardList) => {
  for (let i = 0; i < boardList.length; i++){
    await Axios.get(CAMP_GET_NAME_URL + boardList[i].campId, HEADER).then(res => {
      if (res.data.facltNm == "string")
        boardList[i].campName = "-";
      else
        boardList[i].campName = res.data.facltNm;
    })
  }
  setDataList(boardList);
  }
  React.useEffect(() => {
    getBoards()
  }, [])

  console.log(tag)

  let selectedTag = [];

  // const [selectedTag, setSelectedTag] = React.useState('');
 
  if (tag === '' && titleKeyword === '') {
    for (var i=0; i<dataList.length; i++) {
      selectedTag.push(dataList[i]);
    }
  } else if (tag !== '' && titleKeyword === '') {
    for (var i=0; i<dataList.length; i++) {
      if (tag === dataList[i].tag) {
        selectedTag.push(dataList[i]);
      }
    };
  } else if (tag !== '' && titleKeyword !== '') {
      for (var i=0; i<dataList.length; i++) {
        if (tag === dataList[i].tag) {
          temp.push(dataList[i]);
        };
      }
      Axios.get(KEYWORD_GET_URL)
        .then(res => setTargetList(res.data))
      for (var i=0; i<targetList.length; i++) {
        if (tag === targetList[i].tag) {
          selectedTag.push(targetList[i]);
        };
      };
  } else {
    Axios.get(KEYWORD_GET_URL)
        .then(res => setTargetList(res.data))
    for (var i=0; i<targetList.length; i++) {
      selectedTag.push(targetList[i]);
    };
  }

  let totalListCount = selectedTag.length;
  let offset = (pageNum - 1) * numPerPage;

  React.useEffect(() => {
    console.log('///////');
    console.log("totalListCount : " + totalListCount);
    console.log("pageNum : " + pageNum);
    console.log("numPerPage : " + numPerPage);
    console.log("offset : " + offset);
  });

return (
  <Box
    sx={{
      // bgcolor: second,
      pt: 3,
      pb: 0,
    }}
  >
    <Container>
      <Stack
        sx={{ 
          pt: 0,
          pb: 0, 
        }}
        direction="row"
        justifyContent="center"
      >
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">전체/도</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={sido}
            onChange={handleChange1}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {sidos.map((sido) => (
              <MenuItem key={sido} value={sido}>
                {sido}
              </MenuItem>           
            ))}
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">시군구</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={sigungu}
            onChange={handleChange2}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {sigungus.map((sigungu) => (
              <MenuItem key={sigungu} value={sigungu}>
                {sigungu}
              </MenuItem>           
            ))}
          </Select>
        </FormControl>
        { isAll ? (
            <CampingSearch2 func={camping_data}></CampingSearch2>
          ) : (
            <Autocomplete
              onChange={handleChange3}
              sx={{ minWidth: 300, m: 1 }}
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={dropbox3.map((db3) => db3)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="캠핑장 이름을 입력하세요."
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />   
          )
        }
        <Button
          type="submit"
          sx={{
            m: 1,
            minWidth: 100,
            height: "7ch",
          }}
          variant="contained"
          onClick={clickButton}
          style={{ backgroundColor : '#1b5e20'}}
        >
          이동
        </Button>
      </Stack>
      <Stack
        sx={{ 
          pt: 0,
          pb: 0, 
          ml: 2.7,
        }}
        direction="row"
        justifyContent="center"
      >
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel htmlFor="tag-select">말머리</InputLabel>
          <Select
            value={tag}
            id="tag-select"
            defaultValue=""
            // value={tag}
            label="말머리"
            onChange={handleChange}
          >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader sx={{ fontWeight: 'bold' }}>캠핑 소통</ListSubheader>
            <MenuItem value="나눔">나눔</MenuItem>
            <MenuItem value="거래">거래</MenuItem>
            <MenuItem value="후기">후기</MenuItem>
            <MenuItem value="캠핑소통-자유">자유</MenuItem>
          <ListSubheader sx={{ fontWeight: 'bold' }}>자유 소통</ListSubheader>
            <MenuItem value="장비 후기" >장비 후기</MenuItem>
            <MenuItem value="자유소통-자유">자유</MenuItem>
          </Select>
        </FormControl>
        <TextField 
          onChange={getTitleKeyword}
          label="검색어를 입력하세요." 
          type="search" 
          width="8ch"
          sx={{ width: 300, m:1 }}
        />
        {/* <Button
          type="submit"
          sx={{
            m: 1,
            minWidth: 100,
            height: "7ch",
          }}
          variant="contained"
        >
          검색
        </Button> */}
        {/* <Link to={'/create'} style={{ textDecoration: 'none' }}>
          <Button 
            style={{
              color: "white",
              backgroundColor: "#4caf50"
            }}
            type="submit"
            sx={{
              m: 1,
              minWidth: 100,
              height: "7ch",
            }}
            
            variant="contained"
          >
            게시글 작성
          </Button>
        </Link> */}
      </Stack>
      <Stack>
        <TableContainer align="center" >
          <Table sx={{ m : 2, width: 900 }} aria-label="simple table">
            <TableHead >
              <TableRow sx={{ border : '1px solid black', bgcolor : '#1b5e20' }}>
                {/* <TableCell>번호</TableCell> */}
                <TableCell align="center" sx={{ fontWeight: 'bold',color : '#ffffff', fontSize: '18px' }}>말머리</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color : '#ffffff', fontSize: '18px' }}>캠핑장명</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color : '#ffffff', fontSize: '18px' }}>게시물 제목</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color : '#ffffff', fontSize: '18px' }}>작성날짜</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ border : '1px solid black'}}> 
              {selectedTag ? selectedTag.slice(offset, offset+numPerPage).map((d) => (
                <TableRow
                  key={d.boardId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {console.log(d)}
                  {/* <TableCell component="th" scope="row">
                    {d.boardId}
                  </TableCell> */}
                  <TableCell align="center" sx={{ fontSize: '15px'}}>{d.tag}</TableCell>
                  {/* <TableCell align="center" sx={{ fontSize: '15px'}}>{d}</TableCell> */}
                  <TableCell align="center" sx={{ fontSize: '15px'}}>{d.campName}</TableCell>
                  
                  <TableCell align="center" sx={{ fontSize: '15px'}}>
                    <Link to={`/board/${d.boardId}`} style={{ textDecoration: 'none', color : '#1b5e20'}}>
                    {d.title}
                    </Link>
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: '15px'}}>{setCurTime(d.date)}</TableCell>
                </TableRow>
              )) : ''}
            </TableBody>
          </Table>
          <Paging pageNum={pageNum} setPageNum={setPageNum} numPerPage={numPerPage} totalListCount={totalListCount}></Paging>
        </TableContainer>
      </Stack>
    </Container>
  </Box>
  );
}