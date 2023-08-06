import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Box, Typography, TextField, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Axios from "axios";
import CustomizedSnackbars from "../../components/Alert";
import CircularIndeterminate from "../../components/Circular";
import UseButton from "../../components/ButtonUI/Button";
import { setUser } from "../../redux/userReducer"
import { setAccessToken } from "../../redux/tokenReducer"



interface SingInProps {
  handleSingUp: () => void;
}

enum ErrorMessage {
  PasswordOrEmail = "Email or Password Incorrect !",
  ServerNotResponding = 'Server not responding. Please check your internet connection.',
}

const ItemButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1)
}));

const SingIn: React.FC<SingInProps> = ({ handleSingUp }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const [stateError, setStateError] = useState<{ state: boolean; title: string }>({ state: false, title: "" });
  const navigate = useNavigate();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const sendData = {
      email,
      password 
    }
    try {
      const response = await Axios.post(`${process.env.REACT_APP_DOMAIN}/auth/login`,sendData );
      if(response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch(setAccessToken(response.data.access_token))
        dispatch(setUser(response.data.user))
      
        return navigate("/");
      } else {
        setStateError({
          state: true,
          title: ErrorMessage.PasswordOrEmail,
        });
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        setStateError({
          state: true,
          title: ErrorMessage.PasswordOrEmail,
        });
       
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      mt={1}
    >
      {loading ? <CircularIndeterminate /> : <Box display="flex" p="20px" />}
      <CustomizedSnackbars
        SnackbarOpen={stateError}
        setSnackbarOpen={setStateError}
        severity="error"
      />

      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        autoComplete="email"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
      />

      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <UseButton  text={"Sign In"}></UseButton>

      <ItemButton type="submit" onClick={() => handleSingUp()}>
            <Typography >
              Don't have an account? Sign Up
            </Typography>
      </ItemButton>
    </Box>
  );
};

export default SingIn;
