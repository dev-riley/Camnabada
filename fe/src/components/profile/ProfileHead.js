import * as React from 'react';
import PropTypes from 'prop-types';
import IsFollow from "./IsFollow";
import ProfileUser from "./ProfileUser";
import { Container, CssBaseline, Typography, Grid, Stack, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: 'center',
  // color: theme.palette.text.secondary,
}));

export default function ProfileHead() {
  const [value, setValue] = React.useState(0);

  const [isfollowed, setIsfollowed] = React.useState('false');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              mb: 5
            }}
          >
            <Grid item align="center" md={2.4} sx={{ mr: 4 }}>
              <AccountCircleIcon  sx={{ fontSize: 150 }} />
            </Grid>
            <Grid item md={7.2}>
              {/* 닉네임 */}
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  싸피lee2022
                </Typography>
                <ProfileUser />
                {/* <Link to={'/message'} style={{textDecoration:'none'}}>
                  <Button
                    style={{
                      border: "1px black solid",
                      color: "black"
                    }}
                    variant="outlined"
                  >
                    메시지 보내기
                  </Button>
                </Link>                */}
                <IsFollow />
              </Stack>
              {/* 게시물, 팔로워, 팔로우 부분 */}
              <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1}>
                  <Typography sx={{ fontSize: 20 }}>
                    게시물
                  </Typography>
                  <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
                    4
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography sx={{ fontSize: 20 }}>
                    팔로워
                  </Typography>
                  <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
                    16
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography sx={{ fontSize: 20 }}>
                    팔로우
                  </Typography>
                  <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
                    20
                  </Typography>
                </Stack>
              </Stack>
              {/* 자기 소개 부분 */}
              <Stack>
                {/* 150자 예시 */}
                모든 게 마음먹기 달렸어
                어떤 게 행복한 삶인가요
                사는 게 힘이 들다 하지만
                쉽게만 살아가면 재미없어 bingo! (bingo!)
                거룩한 인생 고귀한 삶을 살며
                부끄럼 없는 투명한 마음으로
                이내 삶이 끝날 그 마지막 순간에
                나 웃어보리라 나 바라는 대로 (bingo!)
              </Stack>
            </Grid>
            {/* <Stack
              direction="column"
              spacing={2}
            >
              <Item>
                <Link to={'/create'} style={{textDecoration:'none'}}>
                  <Button
                    style={{
                      backgroundColor: "#009688"
                    }}
                    variant="contained"
                  >
                    게시글 작성
                  </Button>
                </Link>
              </Item>
              <Item>
                <Link to={'/profile/update'} style={{textDecoration:'none'}}>
                  <Button variant="contained">
                    프로필 편집
                  </Button>
                </Link>
              </Item>
            </Stack> */}
          </Grid>
          
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab label="올린 게시물" {...a11yProps(0)} />
                <Tab label="좋아요한 캠핑장" {...a11yProps(1)} />
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