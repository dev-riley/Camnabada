import Stack from '@mui/material/Stack';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HotTubIcon from '@mui/icons-material/HotTub';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import SetMealIcon from '@mui/icons-material/SetMeal';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const Subs = (sub) => {
  // const subs = sub.sub.split(",");
  const subs = sub.sub;

  const arr = subs?.split(",");
  // console.log(arr);
  // console.log(arr?.length);
  // var arrl = arr?.length;
  // console.log(arrl);


  const [elec, setElec] = React.useState('');
  const [wifi, setWifi] = React.useState('');
  const [firewood, setFirewood] = React.useState('');
  const [hotwater, setHotwater] = React.useState('');
  const [play, setPlay] = React.useState('');
  const [fitness, setFitness] = React.useState('');
  const [swim, setSwim] = React.useState('');
  const [walk, setWalk] = React.useState('');
  const [mart, setMart] = React.useState('');
  const [store, setStore] = React.useState('');
  const [fishing, setFishing] = React.useState('');
  const [farm, setFarm] = React.useState('');
  
  

  React.useEffect(() => {
    if (arr) {
      for (var i=0; i<arr.length; i++) {
        if (arr[i] === '전기') {
          setElec(true);
        } else if (arr[i] === '무선인터넷') {
          setWifi(true);
        } else if (arr[i] === '장작판매') {
          setFirewood(true);
        } else if (arr[i] === '온수') {
          setHotwater(true);
        } else if (arr[i] === '놀이터') {
          setPlay(true);
        } else if (arr[i] === '운동시설') {
          setFitness(true);
        } else if (arr[i] === '물놀이장') {
          setSwim(true);
        } else if (arr[i] === '산책로') {
          setSwim(true);
        } else if (arr[i] === '마트') {
          setMart(true);
        } else if (arr[i] === '편의점') {
          setStore(true);
        } else if (arr[i] === '낚시') {
          setFishing(true);
        } else if (arr[i] === '농어촌체험시설') {
          setFarm(true);
        }
      }
    }
  })

  return (
    <Stack 
      sx={{ mt: 3, mb: 3, bgcolor: '#aed581', px: 8}}
      direction="row" 
      spacing={5} 
      alignItems="center" 
      justifyContent="left"
      
    >
      {elec ? (
        <Stack sx={{m:1}} alignItems="center">
          <ElectricalServicesIcon />
          <Typography>
            전기
          </Typography>
        </Stack> 
      ):null}
      {wifi ? (
        <Stack sx={{m:1}} alignItems="center">
          <WifiIcon />
          <Typography>
            무선인터넷
          </Typography>
        </Stack> 
      ):null}
      {firewood ? (
        <Stack sx={{m:1}} alignItems="center">
          <LocalFireDepartmentIcon />
          <Typography>
            장작판매
          </Typography>
        </Stack> 
      ):null}
      {hotwater ? (
        <Stack sx={{m:1}} alignItems="center">
          <HotTubIcon />
          <Typography>
            온수
          </Typography>
        </Stack> 
      ):null}
      {play ? (
        <Stack sx={{m:1}} alignItems="center">
          <ChildCareIcon />
          <Typography>
            놀이터
          </Typography>
        </Stack> 
      ):null}
      {fitness ? (
        <Stack sx={{m:1}} alignItems="center">
          <FitnessCenterIcon />
          <Typography>
            운동시설
          </Typography>
        </Stack> 
      ):null}
      {swim ? (
        <Stack sx={{m:1}} alignItems="center">
          <PoolIcon />
          <Typography>
            물놀이장
          </Typography>
        </Stack> 
      ):null}
      {walk ? (
        <Stack sx={{m:1}} alignItems="center">
          <DirectionsWalkIcon />
          <Typography>
            산책로
          </Typography>
        </Stack> 
      ):null}
      {mart ? (
        <Stack sx={{m:1}} alignItems="center">
          <LocalGroceryStoreIcon />
          <Typography>
            마트
          </Typography>
        </Stack> 
      ):null}
      {store ? (
        <Stack sx={{m:1}} alignItems="center">
          <LocalConvenienceStoreIcon />
          <Typography>
            편의점
          </Typography>
        </Stack> 
      ):null}
      {fishing ? (
        <Stack sx={{m:1}} alignItems="center">
          <SetMealIcon />
          <Typography>
            낚시
          </Typography>
        </Stack> 
      ):null}
      {farm ? (
        <Stack sx={{m:1}} alignItems="center">
          <AgricultureIcon />
          <Typography>
            농어촌체험
          </Typography>
        </Stack> 
      ):null}
    </Stack>
  )
}

export default Subs;