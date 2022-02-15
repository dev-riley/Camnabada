import * as React from 'react';
import { Container, CssBaseline, Typography, Grid, TextField, Stack, Box, Skeleton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Axios from "axios";
import CampingImage from '../camping/CampingImage';

const cards = [1,2,3];
const theme = createTheme();

export default function Album() {
  const [loading, setLoading] = React.useState(true);
  const [basics, setBasics] = React.useState([]);

  const CAMP_GET_URL = 'http://i6c109.p.ssafy.io:8092/camp/basic/list';

  React.useEffect(() => {
    Axios.get(CAMP_GET_URL)
      .then(res => {
        setBasics(res.data);
        setLoading(false);
      })
  }, []);

  const topCamps = [];

  // 전체 캠핑장 좋아요 순 정렬
  // componentWillMount() {
    
  // }
  
  for (var i=0; i<basics.length; i++) {
    basics.sort(function(a,b) {
      return b.likes - a.likes;
    })
  }

  // 상위 3개만 뽑아오기
  for (var i=0; i<3; i++) {
    topCamps.push(basics[i])
  }
  
  console.log(topCamps)
  
  return (
    <ThemeProvider theme={theme}>    
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            mt: 5,
            mb: 2,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              sx={{
                fontWeight: 'bold',
              }}
              variant="h4"
              align="left"
              color="text.primary"
              gutterBottom
            >
              현재 인기 캠핑장
            </Typography>
          </Container>
        </Box>
        { loading ? (
          <Container sx={{ py: 0 }} maxWidth="lg">
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    align="center"
                  >
                    <Skeleton variant="rectangular" width="100%" height={240}></Skeleton>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Skeleton></Skeleton>
                    </CardContent>  
                    <CardActions >
                      <Skeleton></Skeleton>
                    </CardActions>      
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
          ) : (
          <Container sx={{ py: 0 }} maxWidth="lg">
            <Grid container spacing={4}>
              {topCamps.map((item) => (
                <Grid item key={item.campId} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    align="center"
                  >
                    <CampingImage basics={ item }></CampingImage>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.facltNm}
                      </Typography>
                    </CardContent>
                    <Link to={'/campingdetail'} >
                      <CardActions >
                        <Button size="small" >상세정보</Button>
                      </CardActions>
                    </Link>
                  </Card>
                </Grid>
                ))}
              </Grid>
            </Container>
          )      
        }
      </main>
    </ThemeProvider>
  );
}