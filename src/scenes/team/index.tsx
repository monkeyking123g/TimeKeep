import React  from "react";
import { Box, Typography, useTheme,  Card, CardContent, Avatar, Button } from "@mui/material";
import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import Header from "../../components/Header";
import { useSelector } from 'react-redux';
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";
import { RootState } from "../../redux/store"

const Team = () => {
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.user);
  const pathImage = `${process.env.REACT_APP_DOMAIN}/images/${user.image_url}`;
  const isNonMobile = useMediaQuery("(min-width:600px)");

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
       <Card>
        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar src={user.image_url ? pathImage : "https://source.unsplash.com/random"} sx={{ width: 100, height: 100 }} />
          <Typography gutterBottom variant="h5" component="div" style={{ marginTop: '10px' }}>
            {user.email ? user.email: "random@gmail.com"}
          </Typography>
          <Typography variant='body1' color="text.secondary">
            Earning per Hour
          </Typography>
          <Typography variant="h6" color="text.secondary">
            $<span style={{}}>{user.earning_hour}</span> 
          </Typography>
          <Typography variant='body1' color="text.secondary">
            Password
          </Typography>
          <Typography variant="h6" color="text.secondary">
           {user.password ? user.password : "1111"}
          </Typography>
          <Typography variant='body1' color="text.secondary">
            Created
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {user.createdAt ? user.createdAt : "12-05-2023"}
          </Typography>
          <Button
            variant="contained"
            color='secondary'
            sx={{
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
        </CardContent>
      </Card>
      </Box>
    </Box>
  );
};

export default Team;
