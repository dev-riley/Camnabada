import React, { useState, useCallback } from 'react';
import axios from 'axios'
import { Container, TextField, Box, CssBaseline, Typography, Button, Link, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from "../img/logo.png";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import StickyFooter from '../components/common/Footer';

const theme = createTheme();
const BASE_URL_USER = 'i6c109.p.ssafy.io:8000';

export default function SignUp() {
  //아이디, 닉네임, 이메일, 비밀번호, 비밀번호 확인 초기 상태값 선언
  const [id, setId] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  //오류메시지 상태저장
  const [idMessage, setIdMessage] = useState('')
  const [nicknameMessage, setNicknameMessage] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')

  // 유효성 검사
  const [isId, setIsId] = useState(false)
  const [isNickname, setIsNickname] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)

  // 중복 검사
  const [ userNickname, setUserNickname ] = useState();
  const [ userId, setUserId ] = useState();

  
  const handleJoin = async () => {
    if (isId == true && isNickname == true && isEmail == true && isPassword == true && isPasswordConfirm == true) {
      await axios
        .post('http://i6c109.p.ssafy.io:8000/user/', {
          //보내고자 하는 데이터 
          id: id,
          password: password,
          nickname: nickname,
          email: email,
        }).then((res) => {
          console.log(res)
          alert("회원가입에 성공하셨습니다!");
          window.location.href = "http://i6c109.p.ssafy.io/"
        }).catch((error) => {
          console.error(error);
        });
    }
    else
      alert('회원가입 양식을 지켜주세요')
  }

  // 아이디
  const onChangeName = useCallback((e) => {
    setUserId(e.target.value)
    setId(e.target.value)
    if (e.target.value.length < 5 || e.target.value.length > 15) {
      setIdMessage('5글자 이상 15글자 미만으로 입력해주세요.')
      setIsId(false)
    } else {
      setIdMessage('올바른 이름 형식입니다 :)')
      setIsId(true)
    }
  }, [])

  // 아이디 중복 검사
  const onCheckId = (e) => {
    axios.get(`http://i6c109.p.ssafy.io:8000/user/valid/${userId}`)
    .then(res=> {
      console.log(res)
      if (userId.length < 5 || userId.length > 15) {
        alert('5글자 이상 15글자 미만으로 입력해주세요.')
        setIsId(false)
      } else {
        if (res.data == 'OK' && (5 <= userId.length && userId.length <= 15)) {
          alert('사용할 수 있는 아이디입니다.')
          setIsId(true)
        } else {
          alert('사용할 수 없습니다.')
          console.log(userId.length)
          setIsId(false)
        }
      }
      
      
    }).catch(e => {
      alert('아이디를 다시 확인해주세요')
    })
  }

   // 닉네임
   const onChangeNickname = useCallback((e) => {
    setUserNickname(e.target.value);
    setNickname(e.target.value)
    if (e.target.value.length < 2 || e.target.value.length > 15) {
      setNicknameMessage('2글자 이상 15글자 미만으로 입력해주세요.')
      setIsNickname(false);
    } else {
      setNicknameMessage('올바른 닉네임 형식입니다 :)')
      setIsNickname(true);
    }
  }, [])

  // 닉네임 중복 검사
  const onCheckNickname = (e) => {
    axios.get(`http://i6c109.p.ssafy.io:8000/user/${userNickname}`)
    .then(res => {
      // console.log(res.data[0])
      if (res.data[0] !== undefined) {
        alert('다른 사용자가 사용하고 있는 닉네임입니다.')
        setIsNickname(false);
      } else {
        if (userNickname.length < 2 || userNickname.length > 15) {
          alert('2글자 이상 15글자 미만으로 입력해주세요.')
          setIsNickname(false);
        } else {
          alert('사용가능한 닉네임입니다')
          setIsNickname(true);
        }
      }
    }).catch(e => {
      alert('닉네임을 다시 확인해주세요')
    })
  }

   // 이메일
   const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    const emailCurrent = e.target.value
    setEmail(emailCurrent)

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요')
      setIsEmail(false)
    } else {
      setEmailMessage('올바른 이메일 형식이에요 :)')
      setIsEmail(true)
    }
  }, [])

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
      setIsPassword(false)
    } else {
      setPasswordMessage('안전한 비밀번호에요 :)')
      setIsPassword(true)
    }
  }, [])

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value
      setPasswordConfirm(passwordConfirmCurrent)

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 :)')
        setIsPasswordConfirm(true)
      } else {
        setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요')
        setIsPasswordConfirm(false)
      }
    },
    [password]
  )

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mb : 4}}>
        <CssBaseline />
        <Box
          component="img"
          sx={{ height: 100, mt: 3, ml: 5 }}
          alt="logo"
          src={Logo}
        ></Box>
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar xs={{ m: 2, bgcolor: '#1b5e20' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 6, mt: 2 }}>
            Sign up
          </Typography>
          <Box component="form" noValidate xs={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <TextField
                  onChange={onChangeName}
                  autoComplete="given-name"
                  name="id"
                  required
                  fullWidth
                  id="id"
                  label="아이디"
                  autoFocus
                />
                {id.length > 0 && (
                  <span className={`message ${isId ? "success" : "error"}`}>
                    {idMessage}
                  </span>
                )}
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={onCheckId}
                  variant="contained"
                  size="large"
                  sx={{ width: 126, height: 55 }}
                  style={{backgroundColor: "#2e7d32"}}
                >
                  중복 확인
                </Button>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  onChange={onChangePassword}
                  required
                  fullWidth
                  name="password"
                  label="비밀번호 (숫자 + 영문자 + 특수문자 조합으로 8자리 이상)"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {password.length > 0 && (
                  <span
                    className={`message ${isPassword ? "success" : "error"}`}
                  >
                    {passwordMessage}
                  </span>
                )}
              </Grid>
              <Grid item xs={9}>
                <TextField
                  onChange={onChangePasswordConfirm}
                  required
                  fullWidth
                  name="password-Confirmation"
                  label="비밀번호확인"
                  type="password"
                  id="password-Confirmation"
                  autoComplete="new-password"
                />
                {passwordConfirm.length > 0 && (
                  <span
                    className={`message ${
                      isPasswordConfirm ? "success" : "error"
                    }`}
                  >
                    {passwordConfirmMessage}
                  </span>
                )}
              </Grid>
              <Grid item xs={9}>
                <TextField
                  onChange={onChangeNickname}
                  required
                  fullWidth
                  id="nickname"
                  label="닉네임"
                  name="nickname"
                  autoComplete="email"
                />
                {nickname.length > 0 && (
                  <span
                    className={`message ${isNickname ? "success" : "error"}`}
                  >
                    {nicknameMessage}
                  </span>
                )}
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={onCheckNickname}
                  variant="contained"
                  size="large"
                  sx={{ width: 126, height: 55 }}
                  style={{backgroundColor: "#2e7d32"}}
                >
                  중복 확인
                </Button>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  onChange={onChangeEmail}
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                />
                {email.length > 0 && (
                  <span className={`message ${isEmail ? "success" : "error"}`}>
                    {emailMessage}
                  </span>
                )}
              </Grid>

            </Grid>
            {/* 위의 유효성 검사가 성립된다면 버튼 활성화 */}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1, height: 55 }}
              style={{ backgroundColor: "#1b5e20", color: '#fafafa' }}
              onClick={handleJoin}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item >
                <Link href="/login" variant="body2" underline='none' style={{color : '#1b5e20'}}>
                  계정이 이미 있으신가요?? 로그인하러 가기!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <StickyFooter></StickyFooter>
    </ThemeProvider>
  );
}