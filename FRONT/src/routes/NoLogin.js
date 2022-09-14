import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Container, CssBaseline, Grid, Typography, Box, Stack, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavbarIndex from '../components/common/NavBarIndex'
import camping from '../img/campingImg/camping_Area.png'
import social from '../img/campingImg/social_media.png'
import share from '../img/campingImg/share1.png'
import fire from '../img/campingImg/fire.png'
import camping11 from '../img/campingImg/camping11.png'
import { teal, green, lightGreen, lime } from '@mui/material/colors';
import { Link } from "react-router-dom";
import StickyFooter from '../components/common/Footer';

const theme = createTheme();
export default function NoLogin () {
  const primary = green[50];
  const second = lightGreen[50];
  const third = lime[50];
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const divStyle = {
    backgroundImage: `url(${camping11})`,
    // backgroundImage: `url(${fire})`,
    backgroundSize: 'cover',
    height: '600px'
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavbarIndex />
      {/* <div style={divStyle}>

      </div> */}
      <Grid
        Container
        sx={{
          // backgroundImage:  `url(${camping11})`, 
          backgroundImage: `url(${fire})`,
          backgroundSize: 'cover',
          height: '600px',
        }}
      >
        <Grid item sx={{ mt: 4}}>
          <Typography 
            variant="h2" 
            fontWeight="bold" 
            sx={{ mx : 2, mt:8, mb : 2, pt: 15}}
            align="center"
            color="white"
          >
            캠나바다의 다양한 서비스를 이용해보세요.
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold" 
            sx={{ my : 3, ml : 3, mr : 10}}
            align="center"
            color="white"
          >
            당신을 위한 캠핑장 커뮤니티
          </Typography>
          <Box textAlign="center">
            <Link to={'/signup'} style={{textDecoration:'none'}}>
              <Button
                sx={{ mt: 3, mb: 2, width: 222, height: 54, }}
                style={{
                  color: "white",
                  backgroundColor: "#004d40",
                  fontSize: '25px'
                }}
              >
                지금 시작하기
              </Button>
            </Link>
            {/* <Typography
              color="white"
            >
              이미 아이디가 있으시다면
            </Typography> */}
          </Box>
        </Grid>
      </Grid>
      {/* <Box
        component="img"
        sx={{ 
          // mt : 8, 
          // height: 550,
          //  width : 1690
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
        }}
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        alt="불멍"
        src={camping11}
      ></Box> */}
      {/* <Carousel /> */}
      <Grid container sx={{ border : '1px solid second', bgcolor : second, height: 500 }}>
        <Grid item xs={6}>
          <Box
            component="img"
            sx={{ height: 400, my : 5, mx : 25}}
            fullWidth
            alt="공유"
            src={share}
          >
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ mt : 3 }}>
          <Typography variant="h3" fontWeight="bold" sx={{ mx : 2, mt : 20, mb : 2}}>실시간 물품 공유</Typography>
          <Typography variant="h6" sx={{ my : 3, ml : 3, mr : 10}}>
          캠핌장별 커뮤니티를 통해 실시간으로 필요한 물품을 공유하거나 나눠쓸 수 있고, 챙기지 못한 물건이 있을 때 나눔을 통해 만족스러운 캠핑을 즐길 수 있다.
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ border : '1px solid primary', bgcolor : primary, height : 500}}>
        <Grid item xs={6} sx={{ mt : 3}}>
          <Typography variant="h3" fontWeight="bold" sx={{ mx : 20, mt : 20, mb : 2}}>캠핑장 정보 공유</Typography>
          <Typography variant="h6" sx={{ my : 3, ml : 20, mr : 17}}>사용자들의 후기나 실시간 반응을 통해 현재 캠핑장의 상태나 날씨 등 다양한 정보를 공유할 수 있다.</Typography>
        </Grid>
        <Grid item xs={6}>
          <Box
            component="img"
            sx={{ height: 400, my : 7, mx : 30}}
            fullWidth
            alt="캠핑장"
            src={camping}
          ></Box>

        </Grid>
      </Grid>
      <Grid container sx={{ border : '1px solid third', bgcolor : third, height: 500 }}>
        <Grid item xs={6}>
        <Box
            component="img"
            sx={{ height: 500, width : 750}}
            fullWidth
            alt="소셜"
            src={social}
          ></Box>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="h3" fontWeight="bold" sx={{ mx : 3, mt : 25, mb : 2}}>취향 맞는 친구 찾기</Typography>
            <Typography variant="h6" sx={{ my : 3, ml : 3, mr : 22}}>팔로우 기능을 통해 비슷한 취향을 가진 사용자의 게시물을 볼 수 있고 메세지 기능으로 정보 공유와 함께 캠핑 취향 맞는 친구를 찾을 수 있다.</Typography>
        </Grid>
      </Grid>
      <StickyFooter/>
    </ThemeProvider>
  );
};