import * as React from 'react';
import NavBar from '../../components/common/NavBar'
import SelectVariantsCamping from '../../components/board/SelectVariantsCamping';
import Button from '@mui/material/Button';
import { Container, CssBaseline, Grid, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import Axios from "axios";
import { useParams } from 'react-router-dom';
import CampingImage from '../../components/camping/CampingImage';
import Card from '@mui/material/Card';
import StickyFooter from '../../components/common/Footer';
import Stack from '@mui/material/Stack';

function CampingCommunity() {

  const { campId } = useParams();
  const [basics, setBasics] = React.useState([]);

  const BASIC_GET_URL = `http://i6c109.p.ssafy.io:8000/camp/basic/one/${campId}`
  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers: {
      Authorization: accessToken,
    },
  };
  
  React.useEffect(() => {
    Axios.get(BASIC_GET_URL,HEADER)
      .then(res => setBasics(res.data))
  }, []);


  return (
    <div>
      <NavBar />    
      <Grid container sx={{ height : '100vh', mt: 10 }}>
        <CssBaseline />
        <Grid item xs={12} align="center">
          <Container 
            sx={{ py:0, mt: 2, mb: 2, display: 'flex', flexDirection: 'row'}}
            maxWidth="sm"
          >
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CampingImage basics={ basics }></CampingImage>
            </Card>
          </Container>
          <div>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Typography display="inline" component="h1" variant="h4" align="center" sx={{m: 2}}> 
                {basics.facltNm} 커뮤니티
              </Typography>
              <Link to={'/create'} style={{ textDecoration: 'none' }}>
                <Button 
                  style={{
                    color: "white",
                    backgroundColor: "#2e7d32"
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
          <SelectVariantsCamping />
        </Grid>
    </Grid>
    <StickyFooter/>
    </div>
  )
}

export default CampingCommunity;