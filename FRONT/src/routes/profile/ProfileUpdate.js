import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { Container, CssBaseline, Typography, Grid, TextField, Stack, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavBar from '../../components/common/NavBar'
import "../../styles/uploader.css"
import dog from '../../img/dog.png'
import { useParams } from 'react-router-dom';
import StickyFooter from '../../components/common/Footer';

const Input = styled('input')({
  display: 'none',
});

const spanStyle ={ 
  marginTop : "10px"
}

export default function Update() {
  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers: {
      Authorization: accessToken,
    },
  };
  // 실시간 글자수 체크
  const [ textLength, setTextLength ] = useState('0');
  
  const onKeyUp = (e) => {
    const totalText = e.target.value;
    const totalLength = totalText.length;
    setTextLength(totalLength);
  }

  // 닉네임 중복 체크 & 유효성 체크
  const [ userNickname, setUserNickname ] = useState('');

  const [nickname, setNickname] = useState('')
  const [nicknameMessage, setNicknameMessage] = useState('')
  const [isNickname, setIsNickname] = useState(false)
  
  const onChangeNickname = (e) => {
    setUserNickname(e.target.value);
    setNickname(e.target.value);
    if (nickname.length < 2 || nickname.length > 15) {
      setNicknameMessage('2글자 이상 15글자 미만으로 입력해주세요.')
      setIsNickname(false)
    } else {
      setNicknameMessage('올바른 닉네임 형식입니다 :)')
      setIsNickname(true)
    }
  }

  const onCheckDuplicate = (e) => {
    axios.get(`http://i6c109.p.ssafy.io:8000/user/${userNickname}`,HEADER)
    .then(res => {
      // console.log(res.data[0])
      if (res.data[0] !== undefined) {
        alert('다른 사용자가 사용하고 있는 닉네임입니다.')
      } else {
        alert('사용하실 수 있는 닉네임입니다.')
      }
    })
  }
  
  //비밀번호 수정 버튼
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')

  const [isPassword, setIsPassword] = useState(false)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)

  // const userId = userInfo[0].id;
  
  const onChangePassword = (e) => {
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
  }

  // 아이디, 이메일 정보 얻어오기
  const { nick } = useParams();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = React.useState('');
  
  const onChangePasswordConfirm = (e) => {
    const passwordConfirmCurrent = e.target.value
      setPasswordConfirm(passwordConfirmCurrent)

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 :)')
        setIsPasswordConfirm(true)
      } else {
        setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요')
        setIsPasswordConfirm(false)
      }
  }
  // 아이디, 이메일 정보 얻어오기
 
  const [ userIntro, setUserIntro ] = useState('');
  const [ userId, setUserId ] = useState('');
  const [ userEmail, setUserEmail ] = useState('');
  const [ intro, setIntro ] = useState('');

  // console.log(userInfo)

  useEffect(() => {
    axios.get(`http://i6c109.p.ssafy.io:8000/user/${nick}`)
      .then(res => {
        setUserInfo(res.data);
        setLoading(false);
        setUserIntro(res.data[0].intro);
        setUserId(res.data[0].id)
        setUserEmail(res.data[0].email)
      })
  }, []);
  
  // 수정 버튼
  const onChangeIntro = (e) => {
    setIntro(e.target.value)
  }
  // console.log(userInfo)
  const onChangeInfo = (res) => {
    const currentId = userInfo[0].id;
    axios.put(`http://i6c109.p.ssafy.io:8000/user/${currentId}`, {
      "id" : userInfo[0].id,
      "password" : password,
      "email" : userInfo[0].email,
      "nickname" : nickname,
      "intro" : intro
    })
    .then(res => {
      if (res.status === 200) {
      alert('수정이 완료되었습니다.')
      window.location.href = `/profile/${nick}`
    }})
  }
  console.log(nickname, intro)

  // 이미지 수정
  const [ image, setImage ] = useState({
    image_file : "",
    preview_URL : dog,
  });

  const [ loaded, setLoaded ] = useState(false);
  let inputRef;
  
  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if(e.target.files[0]) {
      setLoaded("loading")
      fileReader.readAsDataURL(e.target.files[0])
    } 
    fileReader.onload = () => {
      setImage({
        image_file : e.target.files[0],
        preview_URL : fileReader.result
      })
      setLoaded(true);
    }
  }
  
  const sendImageToServer = async () => {
    if (image.image_file) {
      const formData = new FormData()
      formData.append('file', image.image_file);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image.image_file);

      fileReader.onload = function () {
        const fileImage = fileReader.result;
        console.log(fileImage)
        axios
          .put(`http://i6c109.p.ssafy.io:8000/user/${userId}`,
            { "photo": fileImage },HEADER)
          .then(res => {
            console.log(res);
            alert("등록 완료했습니다.")
          });
        setLoaded(false);
   		};
    } else {
      alert("사진을 등록하세요!")
    }
  }

  return (
    <div>
      {loading ? null : (
        <div>
          <NavBar></NavBar>
          <CssBaseline />
          <Container maxwidth="lg" sx={{ mt: 13 }}>
            <h2>회원 정보 수정</h2>
            <Grid container>
              <Grid item xs={3}>
                {/* <AccountCircleIcon sx={{ fontSize: 150 }} /> */}
                {/* <Box sx={{ height : 100, ml : 2 }}> */}
                  {/* <img src={require("../../img/dog.png")} alt='109' width="120px" /> */}
                {/* </Box> */}
                <div className="uploader-wrapper">
                  <input type="file" accept="image/*"
                    onChange={saveImage}
                    ref={refParam => inputRef = refParam}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="img-wrapper">
                  {loaded === false || loaded === true ? (
                    <img src={image.preview_URL} alt="109"/>
                  ) : (
                    <span>이미지를 불러오는 중입니다.</span>
                  )}
                </div>
                <div className="upload-button" >
                  <Stack direction="column">
                    <Button 
                      variant="contained" 
                      sx={{ mt: 5, mr : 1, width: "23ch" }} 
                      type="primary" 
                      onClick={() => inputRef.click()}
                      style={{
                        color: "white",
                        backgroundColor: "#43a047"
                      }}
                    >
                      이미지 선택
                    </Button>
                    <Button 
                      variant="contained" 
                      component="span" 
                      sx={{ mt: 5, width: "23ch" }} 
                      onClick={sendImageToServer}
                      style={{
                        color: "white",
                        backgroundColor: "#43a047"
                      }}
                    >
                      프로필 이미지 변경
                    </Button>
                  </Stack>
                </div>
              </Grid>
              <Grid item xs={9}>
                <Stack direction="row" sx={{ mt: 2 }}>
                  <Typography>아이디</Typography>
                  <Typography sx={{ ml: "13ch", fontWeight: "bold", mb: 2 }}>
                    {userId}
                  </Typography>
                </Stack>
                <Stack direction="row" sx={{ mt: 2 }}>
                  <Typography>이메일</Typography>
                  <Typography sx={{ ml: "13ch", fontWeight: "bold", mb: 2 }}>
                    {userEmail}
                  </Typography>
                </Stack>
                <Stack direction="row" sx={{ mt: 2 }}>
                  <Typography sx={{ mr: 2, width: 150 }}>소개글</Typography>
                  <TextField
                    onChange={onChangeIntro}
                    onKeyUp={onKeyUp}
                    sx={{ width: "50ch" }}
                    multiline
                    defaultValue={userIntro}
                  />
                  <Typography sx={{ m: 2 }}> {textLength} / 150</Typography>
                </Stack>
                <Stack direction="row" sx={{ mt: 2 }}>
                  <Typography sx={{ mr: 2, width: 150 }}>닉네임</Typography>
                  <Stack>
                    <TextField
                      onChange={onChangeNickname}
                      sx={{ width: "50ch" }}
                      defaultValue={userNickname}
                    >
                    </TextField>
                    <div style={spanStyle}>
                      {nickname.length > 0 && (
                        <span
                          className={`message ${
                            isNickname ? "success" : "error"
                          }`}
                        >
                          {nicknameMessage}
                        </span>
                      )}
                    </div>
                  </Stack>
                  <Button
                    variant="contained"
                    onClick={onCheckDuplicate}
                    sx={{ ml: 2, width: "16ch", height: '7ch' }}
                    style={{
                      color: "white",
                      backgroundColor: "#43a047"
                    }}
                  >
                    중복 확인
                  </Button>
                </Stack>
                <Divider sx={{ borderBottomWidth: 2, my: 2 }} />
                <Box>

                  <Stack direction="row" sx={{ mt: 2 }}>
                    <Typography sx={{ mr: 2, width: 150 }}>비밀번호</Typography>
                    <Stack>
                      <TextField
                        onChange={onChangePassword}
                        sx={{ width: "50ch" }}
                        placeholder="비밀번호 수정을 원할 시에만 입력하세요."
                        type="password"
                      />
                      <div style={spanStyle}>
                        {password.length > 0 && (
                          <span
                            className={`message ${
                              isPassword ? "success" : "error"
                            }`}
                          >
                            {passwordMessage}
                          </span>
                        )}
                      </div>
                    </Stack>
                  </Stack>
                  <Stack direction="row" sx={{ mt: 2 }}>
                    <Typography sx={{ mr: 2, width: 150 }}>
                      비밀번호 확인
                    </Typography>
                    <Stack>
                      <TextField
                        sx={{ width: "50ch" }}
                        onChange={onChangePasswordConfirm}
                        type="password"
                      />
                      <div style={spanStyle}>
                        {passwordConfirm.length > 0 && (
                          <span
                            className={`message ${
                              isPasswordConfirm ? "success" : "error"
                            }`}
                          >
                            {passwordConfirmMessage}
                          </span>
                        )}
                      </div>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mx : 60, my : 3 }}>
                  <Button
                    onClick={onChangeInfo}
                    variant="contained"
                    sx={{ width: 200, mt: 3 }}
                    color="success"
                  >
                    수정 완료
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
      <StickyFooter></StickyFooter>
    </div>
  );
}