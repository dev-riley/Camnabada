import * as React from 'react';
import axios from 'axios';
import { Container, CssBaseline, Typography, Grid, Button, Box, Tabs, Tab, Card, CardMedia, CardHeader, CardContent, CardActions, IconButton, Avatar} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const theme = createTheme();

export default function ProfileHeadOther() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    const NOW_PAGE = `http://i6c109.p.ssafy.io:80/camping/${campId}`;
  
  // const CAMPING_LIKE_URL = `http://i6c109.p.ssafy.io:8092/camp/like/`
  const CAMPING_LIKE_URL = `http://i6c109.p.ssafy.io:8000/camp/like/`

  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers: {
      'Authorization': accessToken
    }
  }

  //캠핑 좋아요
  const campingLike= (e, campId) =>{{
    // console.log(campId);
    const URL = CAMPING_LIKE_URL + campId;
    axios.post(URL, {}, HEADER)
      .then((response) => {
        console.log(response);
        console.log(response.status);
        if (response.status == 204) {
          axios.delete(URL, HEADER)
            .then((response) => {
              window.location.href = NOW_PAGE;
          }).catch((error) => {
            alert("싫어요에 실패하였습니다");
          });
        }
        else {//좋아요 성공
          window.location.href = NOW_PAGE;
        }
      }).catch((error) => {
        alert("좋아요에 실패하였습니다");
      });
  };}

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py:0, mt: 12, mb: 8}} maxWidth="md">
          <Grid 
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              mb: 10
            }}
          >
            <Grid item align="center" md={2.4}>
              <AccountCircleIcon  sx={{ fontSize: 120 }} />
              <Typography variant="h5">
                닉네임
              </Typography>
            </Grid>
            <Grid item align="center" md={2.4}>
              <Typography>
                게시물
              </Typography>
              <Typography>
                4
              </Typography>
            </Grid>
            <Grid item align="center" md={2.4}>
              <Typography>
                팔로워
              </Typography>
              <Typography>
                16
              </Typography>
            </Grid>
            <Grid item align="center" md={2.4}>
              <Typography>
                팔로잉
              </Typography>
              <Typography>
                20
              </Typography>
            </Grid>
            <Grid item align="center" md={2.4}>
              <Grid>
                <Link to={'/message'} style={{textDecoration:'none'}}>
                  <Button
                    style={{
                      backgroundColor: "#009688"
                    }}
                    variant="contained"
                  >
                    메시지
                  </Button>
                </Link>
              </Grid>
              <Grid>
                <Button variant="contained">
                    팔로우
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab label="{닉네임}님이 올린 게시물" {...a11yProps(0)} />
                <Tab label="{닉네임}님이 좋아요한 캠핑장" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0} align="center">
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      U
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title="제목"
                  subheader="날짜?"
                />
                <CardMedia
                  component="img"
                  height="194"
                  image="https://images.unsplash.com/photo-1641157141085-8454fbc33f3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MzExNTc1NQ&ixlib=rb-1.2.1&q=80&w=1080"
                  alt="BoardImage"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    게시글 내용
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card> 
            </TabPanel>
            <TabPanel value={value} index={1} align="center">
              <Card
                // sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                sx={{ maxWidth: 345 }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    // pt: '56.25%',
                    pt: '0%',
                  }}
                  image="https://images.unsplash.com/photo-1641157141085-8454fbc33f3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MzExNTc1NQ&ixlib=rb-1.2.1&q=80&w=1080"
                  alt="CampingImage"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    $캠핑장 이름
                  </Typography>
                  {/* <Typography>
                    This is a media card. You can use this section to describe the
                    content.
                  </Typography> */}
                </CardContent>
                {/* 캠핑장 상세 정보 링크 걸기 */}
                <Link to={'/campingdetail'}>
                  <CardActions>
                    <Button size="small">상세정보</Button>
                  </CardActions>
                </Link>
              </Card>
            </TabPanel>
          </Box>
        </Container>
      </main>
    </ThemeProvider>

  );
}
