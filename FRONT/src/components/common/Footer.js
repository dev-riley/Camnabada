import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Logo from "../../img/logo.png";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="http://i6c109.p.ssafy.io/">
        SSAFY 하얀코드백구
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        // position: 'absolute',
        flexDirection: 'column',
        minHeight: '1vh',
        width: '100%',
        position: 'absolute',
        marginTop: 40
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
        textAlign="center"
      >
        <Container maxWidth="xl">
          <Box
            component="img"
            sx={{ height: 25, m:1 }}
            alt="logo"
            src={Logo}      
          >
          </Box>
          <Typography variant="body1">
            문의 010-8373-0693
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}