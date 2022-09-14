import React, { Component } from "react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

class ProfileUser extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      // userE: false,
      userE: true,
    }
    
  }

  render() {
    if (this.state.userE === true) {
      return (
        <Link to={'/create'} style={{textDecoration:'none'}}>
          <Button
            style={{
              border: "1px black solid",
              color: "black"
            }}
            variant="outlined"
          >
            게시글 작성
          </Button>
        </Link>  
      ) 
    } else {
      return (
        <Link to={'/message'} style={{textDecoration:'none'}}>
          <Button
            style={{
              border: "1px black solid",
              color: "black"
            }}
            variant="outlined"
          >
            메시지 보내기
          </Button>
        </Link>  
      )
    }
  }
}

export default ProfileUser;