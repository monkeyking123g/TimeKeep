import { Box, useTheme, Button, Typography } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
import { useState, useEffect } from "react";
import Axios from "axios";
import Grid from "@mui/material/Grid";
import { tokens } from "../../theme";
import { useStyledTextField } from "../../style";
import { reactLocalStorage } from "reactjs-localstorage";
import CircularIndeterminate from "../../components/Circular";
import CustomizedSnackbars from "../../components/Alert";
import { config } from "../../components/myUseFuncrion";
import UseButton from "../../components/ButtonUI/Button";
import { initialValues, userSchema } from "./formShema";
import Textfiled from "../../components/FormsUI/Textfiled";

const SingUn = ({ handleSingIn, imageUser }) => {
  const [loading, setLoading] = useState(false);
  const [authenticated, isAuthenticated] = useState(false);
  const [stateError, setStateError] = useState({ state: false, title: "" });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const CustomTextField = useStyledTextField({
    color: colors.greenAccent[500],
    globalColor: colors.grey[800],
  });

  const handleFormSubmit = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", imageUser);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("earning_hour", values.earningHour);
    formData.append("image_url", "");

    try {
      console.log(formData);
      await Axios.post(
        `${process.env.REACT_APP_DOMAIN}/api/user`,
        formData,
        config
      );
      console.log(formData + "pass");
      const currentUserResponse = await Axios.get(
        `${process.env.REACT_APP_DOMAIN}/api/user`
      );
      console.log(currentUserResponse);

      const currentUser = currentUserResponse.data.data.find(
        (currUserResponse) =>
          currUserResponse.email === values.email &&
          currUserResponse.password === values.password
      );

      if (currentUser) {
        console.log("User faund !");
        reactLocalStorage.setObject("user", {
          id: currentUser._id,
          email: currentUser.email,
          password: currentUser.password,
          image: currentUser.image_url,
          ernin_hour: currentUser.earning_hour,
        });
        isAuthenticated(true);
      }
    } catch (error) {
      console.error("Error in Submit form. Message: ", error);

      if (error.response) {
        console.log(error.response.status);
        setStateError({
          state: true,
          title: "Server error sorry  !",
        });
      } else {
        console.log("Error", error.message);
        setStateError({
          state: true,
          title: "Server not response  !",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      console.log("User is authentificated");

      return navigate("/");
    }
  }, [authenticated]);

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={userSchema}
    >
      {({ handleSubmit }) => (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box mt={1} sx={CustomTextField.root}>
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
            <Textfiled margin="normal" label="Email Address" name="email" />
            <Textfiled
              margin="normal"
              name="password"
              label="Password"
              type="password"
              autoComplete="off"
            />
            <Textfiled
              margin="normal"
              name="passwordConfirmation"
              label="Password Confirmation"
              type="password"
              autoComplete="off"
            />
            <Textfiled
              margin="normal"
              type="number"
              label="Salary to Hourly"
              name="earningHour"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EuroOutlinedIcon sx={{ color: colors.greenAccent[600] }} />
                  </InputAdornment>
                ),
              }}
            />

            <UseButton text={"Sing Up"} bgColor={colors.greenAccent[500]} />
            <Grid container>
              <Grid item>
                <Button
                  type="submit"
                  onClick={() => handleSingIn()}
                  sx={{
                    ":hover": { backgroundColor: colors.greenAccent[800] },
                  }}
                >
                  <Typography color={colors.primary[700]}>Sing In</Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default SingUn;
