import React, { useEffect } from 'react';
import axios from 'axios'
import { Container, CssBaseline, Typography, Grid, Box, TextField, Stack, Button, Link, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from "../components/common/Copyright";
import Auth from "../components/common/Auth";
import Avatar from '@mui/material/Avatar';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import camping1 from "../img/campingImg/camping1.jpg";
import camping2 from "../img/campingImg/camping2.jpg";
import camping3 from "../img/campingImg/camping3.jpg";
import camping4 from "../img/campingImg/camping4.jpg";
import camping5 from "../img/campingImg/camping5.jpg";
import Logo from "../img/logo.png";
import StickyFooter from '../components/common/Footer';


const theme = createTheme();

const imgArray = new Array();
imgArray[0] = camping1;
imgArray[1] = camping2;
imgArray[2] = camping3;
imgArray[3] = camping4;
imgArray[4] = camping5;

const imgNum = Math.round(Math.random()*4);

export default function SignInSide() {
  const KAKAO_AUTH_URL = "http://i6c109.p.ssafy.io:8000/oauth/getKakao";
  const AUTH_URL = "http://i6c109.p.ssafy.io:8000/user/login";
  const HOME_URL = "http://i6c109.p.ssafy.io:80/main";
  const HOME_TEST_URL = "http://i6c109.p.ssafy.io:80/main";

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const id = data.get('id');
    const password = data.get('password');

      axios.post(AUTH_URL, {
        "id": id,
        "password": password,
      })
        .then((response) => {
          const token = response.headers.authorization;
          localStorage.removeItem("accessToken");
          localStorage.setItem("accessToken", token);
        
          window.location.href = (HOME_TEST_URL);
        }).catch((error) => {
          //에러처리
          alert("아이디와 비밀번호를 확인해주세요");
        })
        ;
    };
  
  //테스트용
  // const kakaoLogin = ()=>{
  //   axios.get('http://i6c109.p.ssafy.io:8000/oauth/getKakao', )
  //     .then((response) => {
  //       console.log(response.data);
  //       let url = response.data;
  //       url = url.replace("i6c109.p.ssafy.io", "i6c109.p.ssafy.io");
  //       console.log(url);
  //       window.location.href=(url);
  //   });
  // }

  //배포용 - KAKAO_AUTH_URL 바꿔주세요
  const kakaoLogin = ()=>{
    axios.get(KAKAO_AUTH_URL)
      .then((response) => {
        const token = response.headers.authorization;
        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken", token);
        const url = response.data;
        window.location.href = (url);
      }).catch((error) => {
        //에러처리
      alert("아이디와 비밀번호를 확인해주세요");
    });
  } 

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundImage:  `url(${imgArray[imgNum]})` ,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              sx={{ height: 80, mb: 2 }}
              alt="logo"
              src={Logo}
                    
            >
            </Box>
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
            {/* <Typography component="h1" variant="h5">
              Login
            </Typography> */}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="id"
                label="아이디"
                name="id"
                autoComplete="id"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Stack
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  type="submit"
                  // fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: 222, height: 54, }}
                  style={{ backgroundColor: "#1b5e20" }}
                >
                  LOGIN
                </Button>
              </Stack>
              <Typography align="center" sx={{ mb: 2, }}>
                또는
              </Typography>
              <Stack align="center">
                <a id="reauthenticate-popup-btn" onClick={kakaoLogin}>
                  <img
                    src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                    width="222"
                  />
                </a>
                <p id="reauthenticate-popup-result"></p>
              </Stack>
            
              {/* <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                SOCIAL LOGIN
              </Button> */}
              <Grid container alignItems="center" justifyContent="center">
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/Signup" variant="body2" underline='none' style={{color : '#1b5e20'}}>
                    아이디가 없으신가요? 회원가입하러 가기!
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <StickyFooter></StickyFooter>
    </ThemeProvider>
  );
}