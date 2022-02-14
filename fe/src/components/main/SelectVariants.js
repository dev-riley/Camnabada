import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Axios from "axios";

export default function SelectVariants() {
  
  const [camp, setCamp] = React.useState('');

  const [sido, setSido] = React.useState('');

  const [sigungu, setSigungu] = React.useState('');

  const handleChange1 = (event) => {
    setSido(event.target.value);
  };
  
  const handleChange2 = (event) => {
    setSigungu(event.target.value);
  };

  const handleChange3 = (event, value) => {
    setCamp(value)
  }
 
  var dropbox3 = [];

  var camps = [];

  const [campings, setCampings] = React.useState([]);

  React.useEffect(() => {
    Axios.get('http://i6c109.p.ssafy.io:8092/camp/basic/list')
      .then(res => setCampings(res.data))   
  }, []);

  const [sidosjson, setSidosjson] = React.useState('');

  React.useEffect(() => {
    Axios.get('http://i6c109.p.ssafy.io:8092/camp/basic/list/sido')
      .then(res => setSidosjson(res.data))   
  }, []);

  const [sigungusjson, setSigungusjson] = React.useState('');

  // sido 값이 변화할 때만 api 호출!
  React.useEffect(() => {
    if (sido !== '') {
      Axios.get(`http://i6c109.p.ssafy.io:8092/camp/basic/list/sigungu/${sido}`)
        .then(res => setSigungusjson(res.data)) 
    }
  }, [sido]);

  const sidos = [];

  const sigungus = [];

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
  
  function searchButton() {
    if (sido !== '' && sigungu !== '' && camp !== '') {
      window.location.href = `/camping/${finalc}`
    } else if (sido !== '' && sigungu === '' && camp === '') {
      window.location.href = `/search/${sido}`
    }
    
  }
  
  // 최종 선택된 캠핑장
  var finalc = '';
  for (var i=0; i<camps.length; i++) {
    if (camp === dropbox3[i]) {
      finalc = camps[i]
    }
  }

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 10,
        pb: 0,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          sx={{ 
            mb: 5, 
          }}
          direction="row"
          justifyContent="center"
        >
          <img src={require("../../img/logo.png")} alt="logo"></img>
        </Stack>
        <Typography
          sx={{
            fontWeight: 'bold',
          }}
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          캠핑장을 검색하세요!
        </Typography>
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
          <Button
              onClick={searchButton}
              type="submit"
              sx={{
                m: 1,
                minWidth: 100,
                height: '7ch'
              }}
              variant="contained"
            >
              검색
          </Button> 
          {/* <Link to={`/camping/${finalc}`}>
          </Link>           */}
        </Stack>
      </Container>  
    </Box>
  );
}
