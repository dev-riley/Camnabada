import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useParams } from 'react-router-dom';
import Axios from "axios";


const theme = createTheme();

export default function SearchAll() {
  // /user/search/{word}
  const { keyword } = useParams();

  // daye, 하눅, nana
  const [userList, setUserList] = React.useState([]);

  const KEYWORD_GET_URL = `http://i6c109.p.ssafy.io:8050/user/search/${keyword}`

  React.useEffect(() => {
    Axios.get(KEYWORD_GET_URL)
      .then(res => setUserList(res.data))
  }, []);


  return (
    <ThemeProvider theme={theme}>    
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 10,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              sx={{
                pt: 5,
              }}
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              '{keyword}' 검색 결과
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 0 }} maxWidth="lg">
          <Grid container alignItems="center" >
            <Grid>
              <Typography variant="h4">
                사용자
              </Typography>
            </Grid>
            <Link to={'/search/user'} style={{textDecoration:'none'}}>
              <Grid>
                <Typography variant="h6">
                  더보기
                </Typography>
              </Grid>
            </Link>
          </Grid>
          <Grid container spacing={4} sx={{mb: 8, mt: 1}}>
            {userList.map((user) => (
              <Grid item key={user} xs={12} sm={6} md={3}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  align="center"
                  onClick = {(e) => {
                    e.preventDefault();
                    window.location.href = `/profile/${user.nickname}`;
                  }}
                >
                  <CardMedia
                    // component="img"
                    sx={{
                      // 16:9
                      // pt: '56.25%',
                      // pt: '0%',
                    }}
                    // image="https://images.unsplash.com/photo-1641157141085-8454fbc33f3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MzExNTc1NQ&ixlib=rb-1.2.1&q=80&w=1080"
                    // alt="CampingImage"
                  >
                    <AccountCircleIcon sx={{ fontSize: 120 }} />
                  </CardMedia>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {user.nickname}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}