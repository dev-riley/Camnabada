import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Paging from '../common/Pagination';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const theme = createTheme();

export default function SearchCommunityAlbum() {
  const [pageNum, setPageNum] = React.useState(1);
  const [numPerPage, setNumPerPage] = React.useState(8);
  let totalListCount = cards.length;
  let offset = (pageNum - 1) * numPerPage;
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
              '@@@' 검색 결과
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 0 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.slice(offset, offset+numPerPage).map((card) => (
              <Grid item key={card} xs={12} sm={6} md={3}>
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
              </Grid>
            ))}
          </Grid>
        </Container>
        
        <Paging pageNum={pageNum} setPageNum={setPageNum} numPerPage={numPerPage} totalListCount={totalListCount}></Paging>
      </main>
    </ThemeProvider>
  );
}