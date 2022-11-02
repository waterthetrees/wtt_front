import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  Toolbar,
  AppBar,
  IconButton,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import HeaderLogo from '@/assets/images/logos/header-logo.svg';

import MapIcon from '@mui/icons-material/Map';
import MenuIcon from '@mui/icons-material/Menu';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';

const Header = (props) => {
  const { isAuthenticated, logout } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();

  const handleClick = () => {
    if (isAuthenticated) {
      // Only logging out to the root seems to be allowed, so if the user is on a subpage like
      // /contact, they'll be sent back to /.
      logout({ returnTo: location.origin });
    } else {
      loginToCurrentPage();
    }
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let navItems = [
    {
      text: 'Map',
      icon: <MapIcon />,
      path: '/map',
    },
    { text: 'About', icon: <InfoOutlinedIcon />, path: '/about' },
    { text: 'Contact', icon: <MailOutlinedIcon />, path: '/contact' },
    { text: 'Data', icon: <AssessmentIcon />, path: '/data' },
  ];

  const StyledListItemIcon = styled(ListItemIcon)({
    justifyContent: 'center',
    '.MuiSvgIcon-root': {
      color: '#323232',
      width: '24px',
      height: '24px',
    },
  });

  const StyledListItemText = styled(ListItemText)({
    '.MuiTypography-root': {
      fontFamily: 'Montserrat',
      fontSize: '14px',
      fontWeight: 400,
      color: '#323232',
    },
  });

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Box
        sx={{
          my: 1,
          px: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link to="/">
          <Box
            component="img"
            src={HeaderLogo}
            alt="WTT logo"
            sx={{ height: 35 }}
          />
        </Link>
        <CloseIcon fontSize="large" />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => {
          const { text, icon, path } = item;
          return (
            <ListItem
              key={text}
              disablePadding
              component={Link}
              to={path}
              sx={{
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
            >
              <ListItemButton sx={{ justifyContent: 'center', my: '4px' }}>
                <StyledListItemIcon>{icon}</StyledListItemIcon>
                <StyledListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
        <Divider sx={{ my: '4px', mx: '16px' }} />
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleClick()}>
            <StyledListItemIcon>
              <LoginIcon />
            </StyledListItemIcon>
            <StyledListItemText
              primary={isAuthenticated ? 'Log Out' : 'Log In'}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
      <AppBar component="nav" sx={{ backgroundColor: '#fff' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link to="/">
            <Box
              component="img"
              src={HeaderLogo}
              alt="WTT logo"
              sx={{ height: 30 }}
            />
          </Link>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon fontSize="large" sx={{ color: '#323232' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          anchor="top"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
