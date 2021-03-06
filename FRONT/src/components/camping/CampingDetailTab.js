import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useParams } from 'react-router-dom';
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import axios from "axios";
import Axios from "axios";
import CampingImage from './CampingImage';
import Subs from './Subs';
import Info from './Info';
import Review from './Review';

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


export default function BasicTabs() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers: {
      Authorization: accessToken,
    },
  };

  // ????????? api ??????
  const { campId } = useParams();
  
  const [basics, setBasics] = React.useState([]);
  const [details, setDetails] = React.useState([]);

  const [reviews, setReviews] = React.useState([]);
  const [ like, setLike ] = React.useState(false);
  

  const BASIC_GET_URL = `http://i6c109.p.ssafy.io:8000/camp/basic/one/${campId}`
  const DETAIL_GET_URL = `http://i6c109.p.ssafy.io:8000/camp/detail/one/${campId}`

  const REVIEW_GET_CAMP_URL = `http://i6c109.p.ssafy.io:8000/board/camp/${campId}`
  
  // const CAMPING_LIKE_URL = `http://i6c109.p.ssafy.io:8092/camp/like/`
  const CAMPING_LIKE_URL = `http://i6c109.p.ssafy.io:8000/camp/like/`

  //???????????? ????????????
  const getCampingReview = async () => {
    axios.get(REVIEW_GET_CAMP_URL,HEADER)
      .then((response) => {
        // console.log(response.data);
        setReviews(response.data);
      }).catch((error) => {
        setReviews("????????? ???????????? ????????????");
      });
  };

  console.log('????????????', reviews)

  //?????? ????????????
  const getCamping = async () => {
    axios.get(BASIC_GET_URL,HEADER)
      .then((response) => {
          setBasics(response.data);
      }).catch((error) => {
          //????????????
          alert("????????? ????????? ???????????? ????????????.");
      });
  };
  

  //?????? ?????????
  const campingLike= (e, campId) =>{{
    // console.log(campId);
    const URL = CAMPING_LIKE_URL + campId;
    axios.post(URL, {}, HEADER)
      .then((response) => {
        console.log(response);
        console.log(response.status);
        if (response.status === 204) {
          axios.delete(URL, HEADER)
            .then((response) => {
              getCamping();
              setLike(false)
          }).catch((error) => {
            alert("???????????? ?????????????????????");
          });
        }
        else {//????????? ??????
          getCamping();
          setLike(true)
        }
      }).catch((error) => {
        alert("???????????? ?????????????????????");
      });
  };}
  
  React.useEffect(() => {
    getCampingReview();
    Axios.get(BASIC_GET_URL,HEADER)
      .then(res => setBasics(res.data))
  }, []);

  React.useEffect(() => {
    Axios.get(DETAIL_GET_URL,HEADER)
      .then(res => setDetails(res.data))   
  }, []);
 

  // ????????? ?????? api ??????
  function NaverMapAPI() {

    const navermaps = window.naver.maps;
    
    return (
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
        style={{
          width: '100%', // ??????????????? ?????? ??????
          height: '60vh' // ??????????????? ?????? ??????
        }}
        defaultCenter={{ lat: basics.mapY, lng: basics.mapX }} // ?????? ?????? ??????
        defaultZoom={14} // ?????? ?????? ?????? ??????
      >
         <Marker
          key={1}
          position={new navermaps.LatLng(basics.mapY, basics.mapX)}
          animation={2}
        />
      </NaverMap>
    );
  }

  // var sbrsCls = [];

  // const str = details.sbrsCl;
  // console.log(str)
  // const sbrsCls = str.split(",");

  // const [elec, setElec] = React.useState(false);

  // for (var i=0; i<sbrsCls.lenth; i++) {
  //   if (sbrsCls[i] === '??????') {
  //     setElec(true);
  //   }
  // }
  // console.log(elec);
  
 

  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py:0, mt: 12, mb: 8}} maxWidth="md">
          <Container 
            sx={{ py:0, mt: 2, mb: 2, display: 'flex', flexDirection: 'row'}}
            maxWidth="sm"
          >
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CampingImage basics={ basics }></CampingImage>
            </Card>
          </Container>
          <Container>
            <Typography
              sx={{
                fontWeight: 'bold',
                mb: 2,
              }}
              variant="h4"
              align="center"
            >
              {basics.facltNm}
            </Typography>
          </Container>
          {basics.lineIntro ? (
          <Container>
            <Typography
              sx={{
                mb: 2
              }}
              align="center"
            >
              {basics.lineIntro}
            </Typography>
          </Container>) : ''}
          <Stack direction="row" spacing={5} alignItems="center" justifyContent="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                style={{
                  border: "1px black solid",
                  color: "black"
                }}
                variant="outlined"
                onClick={(e)=>{campingLike(e, campId)}}
              >
                { like ? <ThumbUpIcon color='primary'/> : <ThumbUpOffAltIcon />}
                {/* <ThumbUpOffAltIcon /> */}
              </Button>
              <Typography
                sx={{
                  // pt: 5,
                }}
                component="h1"
                variant="h6"
                align="center"
              >
                {basics.likes}
              </Typography>
            </Stack>
            <Stack>
              <Link to={`/community/${campId}`} style={{textDecoration:'none'}}>
                <Button
                  style={{
                    border: "1px black solid",
                    color: "black"
                  }}
                  variant="outlined"
                >
                  ????????? ???????????? ??????
                </Button>
              </Link> 
            </Stack>
          </Stack> 

          <Subs sub={details.sbrsCl}></Subs>

          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab label="?????? ??????" {...a11yProps(0)} />
                {/* <Tab label="????????? ??????" {...a11yProps(1)} /> */}
                <Tab label="??????" {...a11yProps(1)} />
                <Tab label="??????" {...a11yProps(2)} /> 
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Info details={ details }></Info>
            </TabPanel>
            {/* <TabPanel value={value} index={1}>
              {details.intro}
            </TabPanel> */}
            <TabPanel value={value} index={1}>
              <Stack direction="row">
                <Typography sx={{ fontWeight: 'bold', width: '10ch', mb: 1 }}>
                  ??????
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  {basics.address}
                </Typography>
              </Stack>
              {/* ????????? ?????? ?????? */}
              <RenderAfterNavermapsLoaded
                ncpClientId={'v1qzk7bjak'} // ????????? ????????? ???????????? ???????????? Client ID
                error={<p>Maps Load Error</p>}
                loading={<p>Maps Loading...</p>}
              >
                <NaverMapAPI />
              </RenderAfterNavermapsLoaded>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Review details={ reviews }></Review>
            </TabPanel>
          </Box>

        </Container>
      </main>
    </ThemeProvider>

  );
}
