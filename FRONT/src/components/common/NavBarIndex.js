import * as React from 'react';
import { Box, Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Link, useParams } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import FeedIcon from '@mui/icons-material/Feed';
import LogoutIcon from '@mui/icons-material/Logout';
import FormControl from '@mui/material/FormControl';
import Logo from "../../img/logo.png";
import Login from "../../img/login.png";
import Logout from "../../img/logout.png";
import Message from "../../img/message.png";
import Community from "../../img/community.png";
import Profile from "../../img/profile.png";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Signup from "../../img/signup.png";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="">
        <Toolbar>
          {/* 로고 */}
          <Link to={'/'}>
            <Box
              component="img"
              sx={{ height: 30 }}
              alt="logo"
              src={Logo}      
            >
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to={'/signup'}>
              <Box
                component="img"
                sx={{ height: 25, m:1 }}
                alt="logo"
                src={Signup}      
              >
              </Box>
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to={'/login'}>
              <Box
                component="img"
                sx={{ height: 25, m:1 }}
                alt="logo"
                src={Login}      
              >
              </Box>
            </Link>
          </Box>                        
        </Toolbar>
      </AppBar>
    </Box>
  );
}