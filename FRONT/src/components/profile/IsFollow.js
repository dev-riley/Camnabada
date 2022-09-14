import Button from '@mui/material/Button';
import React, { Component } from "react";
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
// import PersonIcon from '@mui/icons-material/Person';

const IsFollow = ({ isFollow, getFollow, followUser }) => {
  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers: {
      Authorization: accessToken,
    },
  };

  // console.log('IsFollow에서 ', isFollow);
  // console.log('팔로우 할 유저의 id ', followUser);

  const FOLLOW_URL = 'http://i6c109.p.ssafy.io:8000/follow/' + followUser;
  const follow = () => {
    console.log('팔로우');
    console.log(FOLLOW_URL);
    axios
      .post(FOLLOW_URL, {} ,HEADER)
      .then((res) => {
        console.log('-------------------------------------------------');
        console.log(res);
      });
    getFollow(true);
  }

  const unfollow = () => {
    console.log('언팔로우');
    console.log(FOLLOW_URL);
    axios
    .delete(FOLLOW_URL,HEADER)
      .then((res) => {
        console.log(res);
      });
    getFollow(false);
  }

  return (
    <div>
      {isFollow ? (
        <Button
          onClick={unfollow}
          style={{
            color: "white",
            backgroundColor: "#2e7d32",
          }}
          variant="outlined"
        >
          <PersonIcon />
          <CheckIcon />
        </Button>
      ) : (
        <Button
          onClick={follow}
          style={{
            color: "white",
            backgroundColor: "#2e7d32",
          }}
          variant="outlined"
        >
          팔로우
        </Button>
      )}
    </div>
  )
}


export default IsFollow;