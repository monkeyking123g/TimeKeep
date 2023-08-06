import React, { useState } from "react";
import SingIn from "./singIn";
import SingUn from './singUp';
import CssBaseline from "@mui/material/CssBaseline";
import Logo from "../../components/svg/logo";
import Paper from "@mui/material/Paper";
import { Box,  IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const SignInSide: React.FC = () => {

  const [clickSingUp, setClickSingUp] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [fileChange, setFileChange] = useState<string | any >();

  const handleSubmit = () => {
    setClickSingUp(!clickSingUp);
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // image from user
    const { files } = e.target;
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    setSelectedFile(file);

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setFileChange(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
      <Grid container component="main" sx={{ height: "100vh", width: "100vw" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {clickSingUp ? (
              <IconButton>
                <img
                  src={
                    fileChange ||
                    "https://www.3dproduction.it/public/no_attore.jpg?nocache="
                  }
                  className="image-singUp"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadImage}
                  hidden
                />
              </IconButton>
            ) : (
              <IconButton>
                <Logo width="100px" height="100px" />
              </IconButton>
            )}
            <Typography component="h1" variant="h5">
              {clickSingUp ? "Upload Foto" : "Sing In"}
            </Typography>
            {clickSingUp ? (
              <SingUn handleSingIn={handleSubmit} imageUser={selectedFile} />
            ) : (
              <SingIn handleSingUp={handleSubmit} />
            )}
          </Box>
        </Grid>
      </Grid>
  );
};
export default SignInSide;
