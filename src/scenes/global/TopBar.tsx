import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box, 
  IconButton, 
  useTheme
} from '@mui/material';
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Logo from "../../components/svg/logo";
import { Search } from "@mui/icons-material";
import { grey } from '@mui/material/colors';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Topbar: React.FC<{ shadow?: boolean, colorMode: any }> = ({ shadow = false, colorMode }) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)"); 
  // const { toggleSidebar } = useProSidebar();

  const [seed, setSeed] = useState(1);
  const reset = () => {
    setSeed(Math.random());
  };

  let navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(false);
    navigate('/signin');
  };
  return (<>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle><Typography variant='h4'>Confirm Logout</Typography></DialogTitle>
        <DialogContent>
          <Typography variant='h5'>Are you sure you want to leave this page?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    <Box
      display={shadow ? "none" : "flex"}
      justifyContent="space-between"
      p={2}
      sx={{
        // backgroundColor: colors.primary[100],
      }}
      >
      <IconButton
        onClick={reset}
        sx={{ ":hover ": { backgroundColor: "transparent" } }}
      >

        <Logo key={seed} width="50px" height="25px" />
      </IconButton>
    
      <Box
        display={isNonMobile ? "flex" : "none"}
        borderRadius="4px"
        mr={"auto"}
        sx={{ border: `1px solid ${grey[800]}` }}
      >
        
        <InputBase
          sx={{ ml: 2, flex: 1,}}
          placeholder="search"
        ></InputBase>
      
        <IconButton
          type="button"
          sx={{
            p: 1,
            color: grey[500],
            backgroundColor: grey[800],
            borderRadius: "0",
          }}
        >  
        <Search />
        </IconButton>
      </Box>
      <Box>
        {theme.palette.mode} mode
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      
      <Box display="flex">
        <Button size='large' onClick={() => setOpen(true)}>Logout</Button>
      </Box>
    </Box>
    </>);
};

export default Topbar;
