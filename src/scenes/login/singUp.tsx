
import React, { useState } from 'react';
import { Box, styled, Typography, Button, Grid, InputAdornment } from '@mui/material';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import CircularIndeterminate from '../../components/Circular';
import CustomizedSnackbars from '../../components/Alert';
import { config } from '../../components/myUseFuncrion';
import UseButton from '../../components/ButtonUI/Button';
import { initialValues, userSchema } from './formShema';
import Textfiled from '../../components/FormsUI/Textfiled';

interface SingUnProps {
  handleSingIn: () => void;
  imageUser: File | null;
}

interface Values {
  email: string; 
  password: number; 
  earningHour: number; 
}
enum ErrorMessage {
  UploadFailed = 'Upload failed. Please try again later.',
  ServerError = 'Server error. Please try again later.',
  ServerNotResponding = 'Server not responding. Please check your internet connection.',
}

const ItemButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1)
}));
const SingUn: React.FC<SingUnProps> = ({ handleSingIn, imageUser }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [stateError, setStateError] = useState<{ state: boolean; title: string }>({ state: false, title: "" });

  const navigate = useNavigate();

  const handleFormSubmit = async (values: Values | any) : Promise<void> => {
    setLoading(true);
    let image_url: string;

    if(imageUser) {
      try {
        const formData = new FormData();
        formData.append('image', imageUser);
        console.log(imageUser)
        const response = await Axios.post( `${process.env.REACT_APP_DOMAIN}/uploads`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        image_url = response.data.resizeFileName
      } catch (error) {

        setStateError({
          state: true,
          title: ErrorMessage.UploadFailed,
        });

      }
    }
    const sendData = {
        email: values.email,
        password: values.password,
        image_url,
        earning_hour: values.earningHour
    } 
    try {
    
      const response = await Axios.post(
        `${process.env.REACT_APP_DOMAIN}/user`,
        sendData,
        config
      );

      if (response.data && response.status === 201) {
        localStorage.setItem('user', JSON.stringify(response.data));
        return navigate("/");
          
      }
    } catch (error) {

      if (error.response) {
        setStateError({
          state: true,
          title: ErrorMessage.ServerError,
        });
      } else {
        setStateError({
          state: true,
          title: ErrorMessage.ServerNotResponding,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={userSchema}
    >
      {({ handleSubmit }) => (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box mt={1}>
            <CustomizedSnackbars
              SnackbarOpen={stateError}
              setSnackbarOpen={setStateError}
              severity="error"
            />
            {loading ? (
              <CircularIndeterminate />
            ) : (
              <Box display="flex" p="20px" />
            )}
            <Textfiled color="secondary" margin="normal" label="Email Address" name="email" />
            <Textfiled
              color="secondary"
              margin="normal"
              name="password"
              label="Password"
              type="password"
              autoComplete="off"
            />
            <Textfiled
              color="secondary"
              margin="normal"
              name="passwordConfirmation"
              label="Password Confirmation"
              type="password"
              autoComplete="off"
            />
            <Textfiled
              color="secondary"
              margin="normal"
              type="number"
              label="Salary to Hourly"
              name="earningHour"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EuroOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />

            <UseButton color="secondary" text={"Sing Up"}  />
            <Grid container>
              <Grid item>
                <ItemButton
                  color="secondary"
                  type="submit"
                  onClick={() => handleSingIn()}
                >
                  <Typography>Sing In</Typography>
                </ItemButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default SingUn;
