import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { styled } from '@mui/material/styles';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import './Sidebar.scss';

import {
  Drawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useMediaQuery,
  Grid,
  Typography,
  Box,
  Divider,
  SvgIcon,
  Button,
} from '@mui/material';

import MapIcon from '@mui/icons-material/Map';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LoginIcon from '@mui/icons-material/Login';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import wttLogo from '@/assets/images/addtree/treefattrunk.png';
import { TreeIcon } from './TreeIcon';
import LogoutIcon from '@mui/icons-material/Logout';
// import PlantIcon from '@/assets/images/Plant.svg';

export default function Sidebar() {
  const { isAuthenticated, logout } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const { user = {} } = useAuth0();
  const { nickname, email, picture } = user;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    if (isAuthenticated) {
      logout({ returnTo: location.origin });
    } else {
      loginToCurrentPage();
    }
  };

  //if screen width > 1000px, default sidebar to open
  const isLarge = useMediaQuery('(min-width:1000px)');

  React.useEffect(() => {
    setOpen(isLarge);
  }, [isLarge]);

  let sidebarSections = [
    {
      title: 'Navigation',
      items: [
        {
          text: 'Map',
          icon: <MapIcon />,
          path: '/map',
        },
        { text: 'About', icon: <InfoOutlinedIcon />, path: '/about' },
        { text: 'Contact', icon: <MailOutlinedIcon />, path: '/contact' },
        { text: 'Data', icon: <AssessmentIcon />, path: '/data' },
      ],
    },
    {
      title: 'Personal',
      items: [
        {
          text: 'My Trees',
          icon: (
            <SvgIcon color="inherit">
              <TreeIcon />
            </SvgIcon>
          ),
          path: '/userprofile',
        },
        {
          text: 'Activity',
          icon: <NotificationsNoneIcon />,
          path: '/userprofile',
        },
      ],
    },
    // {
    //   title: 'Input',
    //   items: [
    //     {
    //       text: 'Plant',
    //       icon: (
    //         <img
    //           src={PlantIcon}
    //           alt="plant icon"
    //           style={{ width: '24px', height: '24px' }}
    //         />
    //       ),
    //       path: '/',
    //     },
    //   ],
    // },
  ];

  // Remove 'Personal' section from sidebar if no logged in user is present
  if (!Object.keys(user).length) {
    sidebarSections = sidebarSections.filter(
      (item) => item.title === 'Navigation' || item.title === 'Input',
    );
  }

  const drawerOpen = '248px';
  const drawerClosed = '80px';

  const StyledDrawer = styled(Drawer)({
    width: open ? drawerOpen : drawerClosed,
    '.MuiDrawer-paper': {
      width: open ? drawerOpen : drawerClosed,
      justifyContent: 'flex-end',
    },
  });

  const StyledOuterGrid = styled(Grid)({
    height: '100vh',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  });

  const SiteLogo = styled('img')({
    marginRight: open ? '8px' : '0px',
    width: '35px',
    height: '35px',
  });

  const SiteTitle = styled(Typography)({
    fontFamily: `'wtt-thin', Arial, sans-serif, "PT Sans"`,
    color: 'black',
    whiteSpace: 'nowrap',
    letterSpacing: '-3px',
    fontSize: '1rem',
    wordSpacing: '0.6rem',
  });

  const StyledToggleGrid = styled(Grid)({
    display: open ? 'inline' : 'none',
  });

  const StyledTitleGrid = styled(Grid)({
    maxWidth: open ? drawerOpen : drawerClosed,
    padding: open ? '24px 24px' : '24px 16px',
    alignItems: 'center',
    justifyContent: 'center',
  });

  const StyledSectionTitle = styled(Typography)({
    fontFamily: 'Montserrat',
    padding: open ? '0px 24px' : '0px 0px',
  });

  const StyledListItem = styled(ListItem)({
    padding: open ? '4px 24px' : '4px 16px',
    '&:hover': {
      textDecoration: 'none',
    },
  });

  const StyledListItemButton = styled(ListItemButton)({
    justifyContent: 'center',
    maxWidth: open ? '200px' : '48px',
    '&:hover': {
      '.MuiTypography-root': {
        fontWeight: 500,
        color: '#3FAB45',
      },
      '.MuiListItemIcon-root': {
        '.MuiSvgIcon-root': {
          color: '#3FAB45',
        },
      },
    },
  });

  const StyledListItemIcon = styled(ListItemIcon)({
    justifyContent: open ? 'start' : 'center',
    minWidth: 'auto',
    marginRight: open ? '16px' : '0px',
    '.MuiSvgIcon-root': {
      color: '#323232',
      width: '24px',
      height: '24px',
    },
  });

  const StyledListItemText = styled(ListItemText)({
    display: open ? 'inline' : 'none',
    '.MuiTypography-root': {
      fontFamily: 'Montserrat',
      fontSize: '14px',
      fontWeight: 400,
      color: '#323232',
    },
  });

  const StyledDivider = styled(Divider)({
    borderTop: '0.5px solid #323232',
    margin: open ? '16px 24px' : '16px 16px',
  });

  const StyledAvatar = styled(Box)({
    width: '3rem',
    height: '3rem',
    borderRadius: '5px',
  });

  const StyledBottomButton = styled(Button)({
    height: '32px',
    fontFamily: 'Montserrat',
    color: '#323232',
    fontSize: '12px',
    textTransform: 'none',
    border: '1px solid #3FAB45',
    borderRadius: '8px',
  });

  return (
    <StyledDrawer
      variant="permanent"
      sx={{ display: { xs: 'none', sm: 'flex' } }}
    >
      <StyledOuterGrid container direction="column">
        <Grid item>
          <StyledTitleGrid container>
            <Grid item>
              <SiteLogo src={wttLogo} alt="WTT logo" />
            </Grid>
            <StyledToggleGrid item>
              <SiteTitle className="title__font">WATER THE TREES</SiteTitle>
            </StyledToggleGrid>
          </StyledTitleGrid>

          <List disablePadding>
            {sidebarSections.map((list) => {
              const { title, items } = list;

              return (
                <Box key={title}>
                  <StyledSectionTitle align={open ? 'left' : 'center'}>
                    {title}
                  </StyledSectionTitle>

                  {items.map((item) => {
                    const { text, icon, path } = item;

                    return (
                      <StyledListItem key={text} component={Link} to={path}>
                        <StyledListItemButton disableGutters>
                          <StyledListItemIcon>{icon}</StyledListItemIcon>
                          <StyledListItemText primary={text} />
                        </StyledListItemButton>
                      </StyledListItem>
                    );
                  })}
                  <StyledDivider />
                </Box>
              );
            })}
          </List>
        </Grid>
        <Grid item>
          <StyledDivider />
          <List disablePadding sx={{ paddingBottom: '16px' }}>
            {Object.keys(user).length ? (
              <StyledListItem>
                <StyledListItemButton
                  component={Link}
                  to="/userprofile"
                  disableGutters
                  sx={{ py: 0 }}
                >
                  <StyledListItemIcon>
                    {' '}
                    <StyledAvatar
                      component="img"
                      src={picture}
                      alt="User avatar"
                    />
                  </StyledListItemIcon>
                  <StyledListItemText>
                    <div>{nickname}</div>
                    <div>{email}</div>
                  </StyledListItemText>
                </StyledListItemButton>
              </StyledListItem>
            ) : null}
            <StyledListItem>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <StyledBottomButton
                    variant="outlined"
                    onClick={() => handleClick()}
                  >
                    {Object.keys(user).length ? (
                      <>
                        {open ? (
                          <>
                            <LogoutIcon /> Logout
                          </>
                        ) : (
                          <LogoutIcon />
                        )}
                      </>
                    ) : (
                      <>
                        {open ? (
                          <>
                            <LoginIcon /> Login
                          </>
                        ) : (
                          <LoginIcon />
                        )}
                      </>
                    )}
                  </StyledBottomButton>
                </Grid>
                <Grid item>
                  <StyledBottomButton
                    variant="outlined"
                    onClick={() => setOpen(!open)}
                    sx={{ width: open ? '84px' : '10px' }}
                  >
                    {open ? (
                      <>
                        Collapse <ArrowBackIosNewIcon />
                      </>
                    ) : (
                      <ArrowForwardIosIcon />
                    )}
                  </StyledBottomButton>
                </Grid>
              </Grid>
            </StyledListItem>
          </List>
        </Grid>
      </StyledOuterGrid>
    </StyledDrawer>
  );
}
