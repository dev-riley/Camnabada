import ProfileDefaultImage from "../../img/dog.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";

const UserPhoto = ( {boardList} ) => {

  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers: {
      Authorization: accessToken,
    },
  };

  const NICKNAME_GET_URL = "http://i6c109.p.ssafy.io:8000/user/getnickname/";

  const [nickName, setNickName] = useState([]);

  const [userInfo, setUserInfo] = useState([]);

  const [loginUserProfile, setLoginUserProfile] = useState([]);
  
  // console.log('Photo.js에서 아이디', boardList.clientId)

  // console.log('포토제이에스에서 닉네임',nickName);

  const getBB = async () => {
    getNickName(boardList.clientId);   
  }

  function getNickName(userId) {
    const URL = NICKNAME_GET_URL + userId;
    axios.get(URL, HEADER).then((response) => {
      setNickName(response.data);
      getUserInfo(response.data);
    });
  }
  
  function getUserInfo(nick){
    const USERINFO_GET_URL = `http://i6c109.p.ssafy.io:8000/user/${nick}`
    axios
      .get(USERINFO_GET_URL, HEADER)
      .then((res) => {
        setUserInfo(res);
        // console.log('유저인포 res', res.data[0].photo);
        setLoginUserProfile(res.data[0].photo);
        console.log('로그은유저프로ㅓ필',loginUserProfile);
      });
  };

  useEffect(() => {
    getBB();
    getNickName();
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [boardList.clientId]);


  if (boardList.photo === null || boardList.photo === 'string' || boardList.photo === 'null' ) {
    return (
      <img src={ProfileDefaultImage} width="100%" alt="ProfileDefaultImage"></img>
    )} else {
      return (
        <img src={boardList.photo} width="100%" alt="CampingDefaultImage"></img>
      )
    }
}

export default UserPhoto;