import * as React from 'react';
import NavBar from '../components/common/NavBar'
import SelectVariantsBoard from '../components/board/SelectVariantsBoard';
import BoardTable from '../components/board/BoardTable';
import Button from '@mui/material/Button';
import { Container, CssBaseline, Grid, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { green, lightGreen, lime } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import StickyFooter from '../components/common/Footer';

function Community() {
  const primary = green[50];
  const second = lightGreen[50];
  const third = lime[50];

  return (
    <div>
      <NavBar />    
      <Grid container sx={{ height : '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} align="center">
          <Container sx={{mt : 10, mb : 2}}>
            <img src="img/camping.jpg" sx={{ mt: 20 }} alt="camping"/>
          </Container>
          <div>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Typography display="inline" component="h1" variant="h4" align="center" sx={{m: 2}}> 
                CAM:NABADA 커뮤니티
              </Typography>
              <Link to={'/create'} style={{ textDecoration: 'none' }}>
                <Button 
                  style={{
                    color: "white",
                    backgroundColor: "#43a047"
                  }}
                  type="submit"
                  sx={{
                    m: 1,
                    minWidth: 100,
                    height: "7ch",
                  }}
                  variant="contained"
                >
                  게시글 작성
                </Button>
              </Link>
            </Stack>
          </div>
          <Divider sx={{ borderBottomWidth: 2, my: 2 }} />
          <SelectVariantsBoard />
          <StickyFooter></StickyFooter>
        </Grid>
    </Grid>
    </div>
  )
}

export default Community;