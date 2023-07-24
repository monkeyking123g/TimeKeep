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
import { tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Logo from "../../components/svg/logo";
import { Search } from "@mui/icons-material";

const Topbar: React.FC<{ shadow?: boolean }> = ({ shadow = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
        // sx={{ border: `1px solid ${colors.grey[800]}` }}
      >
        
        <InputBase
          // sx={{ ml: 2, flex: 1, color: colors.textColor[100] }}
          placeholder="search"
        ></InputBase>
      
        <IconButton
          type="button"
          // sx={{
          //   p: 1,
          //   color: colors.primary[700],
          //   backgroundColor: colors.secondary[500],
          //   borderRadius: "0",
          // }}
        >  
        <Search />
        </IconButton>
      </Box>
      <Box display="flex">
        <Button size='large' onClick={() => setOpen(true)}>Logout</Button>
      </Box>
    </Box>
    </>);
};

export default Topbar;
