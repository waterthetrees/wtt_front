import { useAuth0 } from '@auth0/auth0-react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { useQuery } from 'react-query';
import { getData } from '../../api/queries';
import './UserProfile.scss';

const AdoptedTreeHistoryAccordion = ({ history }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Adopted History</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tree ID</TableCell>
                <TableCell align="right">Common</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((row) => (
                <TableRow key={`idAdopted-${row.idTree}`}>
                  <TableCell component="th" scope="row">
                    {row.idTree}
                  </TableCell>
                  <TableCell align="right">
                    {row.common}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  )
}
const LikedTreeHistoryAccordion = ({ history }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Liked History</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tree ID</TableCell>
                <TableCell align="right">Common</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((row) => (
                <TableRow key={`idLiked-${row.idTree}`}>
                  <TableCell component="th" scope="row">
                    {row.idTree}
                  </TableCell>
                  <TableCell align="right">
                    {row.common}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  )
}
const PlantedTreeHistoryAccordion = ({ history }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Planted History</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tree ID</TableCell>
                <TableCell align="right">Common</TableCell>
                <TableCell align="right">Scientific</TableCell>
                <TableCell align="right">Genus</TableCell>
                <TableCell align="right">Date Planted</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((row) => (
                <TableRow key={`idPlanted-${row.idTree}`}>
                  <TableCell component="th" scope="row">
                    {row.idTree}
                  </TableCell>
                  <TableCell align="right">
                    {row.common}
                  </TableCell>
                  <TableCell align="right">
                    {row.scientific}
                  </TableCell>
                  <TableCell align="right">
                    {row.genus}
                  </TableCell>
                  <TableCell align="right">
                    {row.datePlanted}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  )
}

function UserProfile({}) {
  const StyledAvatar = styled(Avatar)({
    height: '6em',
    width: '6em'
  })
  const { user } = useAuth0();
  const email = user?.email;

  const userAdoptedTrees = useQuery(
    ['usertreehistory', { request: 'adopted', email }],
    getData,
    { enabled: !!email }
  );

  const userAdoptedTreesHistory = userAdoptedTrees?.data;

  const userLikedTrees = useQuery(
    ['usertreehistory', { request: 'liked', email }],
    getData,
    { enabled: !!email }
  );

  const userLikedTreesHistory = userLikedTrees?.data;

  const userPlantedTrees = useQuery(
    ['usertreehistory', { request: 'planted', email }],
    getData,
    { enabled: !!email }
  );

  const userPlantedTreesHistory = userPlantedTrees?.data;

  const UserProfile = {
    UserEmail: user?.email,
    UserImageURL: user?.picture,
    UserName: user?.name,
    UserNickname: user?.nickname,
    treeListAdopted: userAdoptedTreesHistory ? Object.keys(userAdoptedTreesHistory).map((index) => userAdoptedTreesHistory[index]) : [],
    treeListLiked: userLikedTreesHistory ? Object.keys(userLikedTreesHistory).map((index) => userLikedTreesHistory[index]) : [],
    treeListPlanted: userPlantedTreesHistory ? Object.keys(userPlantedTreesHistory).map((index) => userPlantedTreesHistory[index]) : [],
  };

  const UserLocation = { UserCity: 'Alameda', UserState: 'CA', UserZip: 94501 };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <StyledAvatar alt="Avatar" src={UserProfile.UserImageURL} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {UserProfile.UserName}
          </Typography>
          <Typography variant="body1">
            {UserProfile.UserNickname}
          </Typography>
          <Typography variant="body1">
            {UserProfile.UserEmail}
          </Typography>
          <Typography variant="body1">
            {UserLocation.UserCity}, {UserLocation.UserState} {UserLocation.UserZip}
          </Typography>
          <Typography variant="body1">
            Adopted: {UserProfile.treeListAdopted.length} Liked: {UserProfile.treeListLiked.length} Planted: {UserProfile.treeListPlanted.length}
          </Typography>
        </Grid>
      </Grid>
      <AdoptedTreeHistoryAccordion history={UserProfile.treeListAdopted} />
      <LikedTreeHistoryAccordion history={UserProfile.treeListLiked} />
      <PlantedTreeHistoryAccordion history={UserProfile.treeListPlanted} />
    </Box>
  );
}

export default UserProfile;
