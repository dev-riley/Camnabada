import Stack from '@mui/material/Stack';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const Review = ({ details }) => {
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
  return (
    <Stack>
      {details.map((oneReview) => (
        <Stack><Typography sx={{ fontWeight: 'bold', width: '50ch' }}>          
          [{oneReview.tag}] {setCurTime(oneReview.date)} 
          </Typography>
          <Typography sx={{fontWeight: 'bold', width: '18ch'}}>
          {oneReview.clientId}님의 후기
          </Typography>
           <Typography dangerouslySetInnerHTML={{ __html: oneReview.content }}></Typography>
          <Divider sx={{ borderBottomWidth: 3, my: 1 }} />
          </Stack>
      )
      )}
      {details.length == 0 &&
        <Stack>
        <Typography sx={{fontWeight: 'bold', width: '100ch'}}>
         작성된 후기가 없습니다
        </Typography>
        </Stack>
      }

    </Stack>
  )
}

export default Review;