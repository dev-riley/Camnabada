import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Grid } from '@mui/material';
import Paging from '../common/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from "react-router-dom";

const theme = createTheme();

export default function BoardTable() {
  const [dataList, setDataList] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers: {
      Authorization: accessToken,
    },
  };
  const BOARD_GET_URL = 'http://i6c109.p.ssafy.io:8000/board';

  const getBoards = async () => {
    axios.get(BOARD_GET_URL,HEADER)
      .then((response) => {
        setDataList(response.data);
      }).catch((error) => {
        //에러처리
        alert("게시판이 비어있습니다");
      });
  };

  useEffect(() => {
    getBoards()
  }, [])

  return (
    <ThemeProvider theme={theme} >
      <Grid container sx={{ height : '100vh', m: 4}}>
        <CssBaseline />
        <TableContainer align="center">
          <Table sx={{ m : 2, width: 700 }} aria-label="simple table">
            <TableHead >
              <TableRow>
                {/* <TableCell>번호</TableCell> */}
                <TableCell align="center">말머리</TableCell>
                <TableCell align="center">제목</TableCell>
                <TableCell align="center">작성날짜</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList ? dataList.map((d) => (
                <TableRow
                  key={d.boardId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {/* <TableCell component="th" scope="row">
                    {d.boardId}
                  </TableCell> */}
                  <TableCell align="center">{d.tag}</TableCell>
                    <TableCell align="center">
                      <Link to={`/board/${d.boardId}`} style={{ textDecoration: 'none' }}>
                      {d.title}
                      </Link>
                    </TableCell>
                  {/* <TableCell align="center">{d.clientId}</TableCell> */}
                  <TableCell align="center">{d.date}</TableCell>
                </TableRow>
              )) : ''}
            </TableBody>
          </Table>
          <Paging />
        </TableContainer>
      </Grid>
    </ThemeProvider>
  )
}
