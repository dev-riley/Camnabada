import React, { useEffect, useState } from "react";
import {
  Container,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  Stack,
  Box,
  Skeleton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Axios from "axios";
import CampingImage from "../camping/CampingImage";

const cards = [1, 2, 3];
const theme = createTheme();

export default function Album() {
  const [loading, setLoading] = React.useState(true);
  const [basics, setBasics] = React.useState([]);
  const [visible, setVisible] = useState(false);

  const CAMP_GET_URL = "http://i6c109.p.ssafy.io:8000/camp/basic/list";
  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers: {
      Authorization: accessToken,
    },
  };
  React.useEffect(() => {
    Axios.get(CAMP_GET_URL, HEADER).then((res) => {
      setBasics(res.data);
      setLoading(false);
    });
  }, []);

  const topCamps = [];

  // 전체 캠핑장 좋아요 순 정렬

  for (var i = 0; i < basics.length; i++) {
    basics.sort(function (a, b) {
      return b.likes - a.likes;
    });
  }

  // 상위 3개만 뽑아오기
  for (var i = 0; i < 6; i++) {
    topCamps.push(basics[i]);
  }

  console.log(topCamps);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            mt: 5,
            mb: 2,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              sx={{
                fontWeight: "bold",
              }}
              variant="h4"
              align="left"
              color="text.primary"
              gutterBottom
            >
              현재 인기 캠핑장{" "}
              <Button
                style={{
                  border: "1px black solid",
                  color: "black",
                }}
                variant="outlined"
                onClick={() => {
                  setVisible(!visible);
                }}
              >
                {visible ? "접기" : "더보기"}
              </Button>
            </Typography>
          </Container>
        </Box>
        {loading ? (
          <Container sx={{ py: 0 }} maxWidth="lg">
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    align="center"
                  >
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={250}
                    ></Skeleton>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Skeleton></Skeleton>
                    </CardContent>
                    <CardActions>
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
              {topCamps.map(
                (item, idx) =>
                  (visible ? idx < 6 : idx < 3) && (
                    <Grid item key={item.campId} xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                        align="center"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/camping/${item.campId}`;
                        }}
                      >
                        <Grid sx={{ height: "250px" }}>
                          <CampingImage basics={item}></CampingImage>
                        </Grid>
                        <CardContent sx={{ flexGrow: 1, mt: 1 }}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.facltNm}
                          </Typography>
                        </CardContent>
                        {/* <Link to={'/campingdetail'} >
                      <CardActions >
                        <Button size="small" >상세정보</Button>
                      </CardActions>
                    </Link> */}
                      </Card>
                    </Grid>
                  )
              )}
            </Grid>
          </Container>
        )}
      </main>
    </ThemeProvider>
  );
}
