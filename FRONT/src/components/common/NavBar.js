import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Axios from "axios";
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
import Paper from '@mui/material/Paper';


export default function PrimarySearchAppBar() {
  const [keyword, setKeyword] = React.useState('');
  // const keyword = '';
  
  const accessToken = localStorage.getItem("accessToken");
  const HEADER = {
    headers: {
      'Authorization': accessToken
    }
  }
  const [ nick, setUserNick ] = useState('');

  React.useEffect(() => {
    Axios.get(`http://i6c109.p.ssafy.io:8000/user/nickname`, HEADER)
      .then(res => {
        setUserNick(res.data);
      })
  }, []);

  console.log(nick);

  const getKeyword = (e) => {
    setKeyword(e.target.value);
  };

  function searchButton(e) {
    e.preventDefault();
    if (keyword === '') {
      alert('검색어를 입력하세요!');
    } else {
      window.location.href = `/searchall/${keyword}`;
    }
    setKeyword('');
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={3} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // 로그아웃
  const onLogout = () => {
    localStorage.removeItem("accessToken")
    window.location.href = '/'
  }

  // const { nick } = useParams();  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="">
        <Toolbar>
          {/* 로고 */}
          <Link to={'/main'}>
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
            {/* 검색창 */}
            {/* <FormControl variant="filled" sx={{ my: 1, minWidth: 300 }}>
              <Search>
                <StyledInputBase
                  value={keyword}
                  placeholder="검색어를 입력하세요."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </FormControl> */}
            {/* <TextField sx={{ height: '3ch'}} id="filled-basic" label="검색어를 입력하세요." variant="filled" /> */}
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="유저를 입력하세요."
                onChange={getKeyword}
              />
              <IconButton 
                type="submit" 
                sx={{ p: '10px' }} 
                aria-label="search"
                onClick={searchButton}
              >
                <SearchIcon />
              </IconButton>
            </Paper>            
            <Link to={'/community'}>
              <Box
                component="img"
                sx={{ height: 25, m:1 }}
                alt="logo"
                src={Community}      
              >
              </Box>
              {/* <IconButton size="large" aria-label="go to community" color="primary">
                <FeedIcon />
              </IconButton> */}
            </Link>
            <Link to={'/message'}>
              <Box
                component="img"
                sx={{ height: 25, m:1 }}
                alt="logo"
                src={Message}      
              >
              </Box>
              {/* <IconButton size="large" aria-label="show 4 new mails" color="primary">
                <MailIcon />
              </IconButton> */}
            </Link>
            <Link to={`/profile/${nick}`}>
              <Box
                component="img"
                sx={{ height: 25, m:1 }}
                alt="logo"
                src={Profile}      
              >
              </Box>
              {/* <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                color="primary"
              >
                <AccountCircle />
              </IconButton> */}
            </Link>
            <Box
              component="img"
              sx={{ height: 25, m:1 }}
              alt="logo"
              src={Logout}     
              onClick={onLogout} 
            >
            </Box>
            {/* <IconButton
              size="large"
              edge="end"
              aria-label="logout"
              color="error"
            >
              <LogoutIcon />
            </IconButton> */}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}