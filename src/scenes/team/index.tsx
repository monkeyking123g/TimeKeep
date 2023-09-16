import React  from "react";
import { Box, Typography, useTheme,  Card, CardContent, Avatar, Button, List, ListItem } from "@mui/material";
import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import Header from "../../components/Header";
import { useSelector } from 'react-redux';
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";
import { RootState } from "../../redux/store";
import makeStyles from '@mui/styles/makeStyles';
import { Theme, styled } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  typografi: {
    padding: '2px'
  },
}));
const CustomAvatar = styled(Avatar)(({ theme }) => ({
    width: '200px', 
    height: '200px',  
  [theme.breakpoints.down('md')]: {
    backgroundColor: 'red',
    width: '100px', 
    height: '100px',  
  },
}));

const Team = () => {
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.user);
  const pathImage = `${process.env.REACT_APP_DOMAIN}/images/${user.image_url}`;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const classes = useStyles();
  return (
  
    <Box
      m="20px"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}

      transition={{ duration: 0.3 }}
    >
      <Header title="Admin" />
      <Box
        m={isNonMobile ? "40px 0 0 0" : "0"}
        height="75vh"
      >
       <Card sx={{ minWidth: 275 }}>
        <CardContent >
          <Box justifyContent='space-around' alignItems='center' display='flex'>
            <Box justifyContent='center' alignItems='center' display='flex' flexDirection='column'>
              <CustomAvatar src={user.image_url ? pathImage : "https://source.unsplash.com/random"} />
              <Button
                  variant="contained"
                  color='secondary'
                  sx={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    '& .MuiSvgIcon-root': {
                      marginRight: '5px',
                    },
                  }}
                >
                  <AdminPanelSettingsOutlined />
                  <Typography>Admin</Typography>
              </Button>
            </Box>
            
          <Box>
          <Typography variant="h4" color="text.primary" className={classes.typografi}>
              User Information
            </Typography>

          <ul>
            <li>
              <Typography variant='body1' color="text.secondary" className={classes.typografi}>
                Email
              </Typography>
              <Typography variant="h6" color="text.secondary" className={classes.typografi}>
                {user.email}
              </Typography>
            </li>
            <li>
              <Typography variant='body1' color="text.secondary" className={classes.typografi}>
                Earning per Hour
              </Typography>
              <Typography variant="h6" color="text.secondary" className={classes.typografi}>
                ${user.earning_hour}
              </Typography>
            </li>
            <li>
              <Typography variant='body1' color="text.secondary" className={classes.typografi}>
                Password
              </Typography>
              <Typography variant="h6" color="text.secondary" className={classes.typografi}>
                {user.password ? user.password : "********"}
              </Typography>
            </li>
            <li>
              <Typography variant='body1' color="text.secondary" className={classes.typografi}>
                Created
              </Typography>
              <Typography variant="h6" color="text.secondary" className={classes.typografi}>
                {user.createdAt ? user.createdAt.slice(0, 10) : "N/A"}
              </Typography>
            </li>
          </ul>

          </Box>
            
          </Box>   
        </CardContent>
      </Card>
      </Box>
    </Box>
  );
};

export default Team;
