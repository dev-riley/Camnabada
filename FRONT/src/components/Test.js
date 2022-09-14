import Axios from "axios";
import { useEffect, useState } from "react";


export default function Test () {
  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers: {
      Authorization: accessToken,
    },
  };

  const [nickname, setNickname] = useState("");

  const getNickname = () => {
    Axios.get(`http://i6c109.p.ssafy.io:8000/user`, HEADER)
      .then((res) => setNickname(res.data))
  }

  React.useEffect(() => {
    getNickname();
    console.log('가져온 유저 닉네임은:', nickname);
  }, []);

  console.log('zz')
 

  


    
  return (
    <div>
      {/* <h1>{user[0].intro}</h1> */}
      <h1>ㅋㅋㅋ</h1>
    </div>
  )

}