import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import Header from "../../components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { useStyleDataGrid } from "../../style";
import { useSelector } from 'react-redux';
import useMediaQuery from "@mui/material/useMediaQuery";
import Axios from "axios";
import { motion } from "framer-motion";

const Team = () => {
  const theme = useTheme();
  const [imageStatus, setImageStatus] = useState(false);
  const user = useSelector((state: any) => state.user);
  const pathImage = `${process.env.REACT_APP_DOMAIN}/images/${user.image_url}`;
  const isNonMobile = useMediaQuery("(min-width:600px)");


  const CheckImage = async (path: any) => {
    try {
      const respose = await Axios.get(path);
      if (respose.status === 200) {
        setImageStatus(true);
      } else {
        setImageStatus(false);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  useEffect(() => {
    CheckImage(pathImage);
  }, []);

  const rows = [
    {
      id: 1,
      image: user.image_url,
      email: user.email,
      earning_hour: user.ernin_hour,
      access: "admin",
    },
  ];

  const colums: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      flex: 0.5,
      minWidth: 100,
      renderCell: () => {
        return (
          <Box
            width="60%"
            p="5px"
            display="flex"
            justifyContent="start"
            borderRadius="4px"
          >
            <img
              alt="profile-user"
              width="50px"
              height="50px"
              src={
                imageStatus
                  ? pathImage
                  : "https://www.3dproduction.it/public/no_attore.jpg?nocache="
              }
              style={{
                cursor: "pointer",
                borderRadius: "50%",
                boxShadow: "rgba(0, 0, 0, 1) 0px 2px 12px 0px",
                objectFit: "cover",
              }}
            />
          </Box>
        );
      },
    },

    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
      minWidth: 100,
      cellClassName: "name-column--cell",
    },
    {
      flex: 0.5,
      field: "earning_hour",
      headerName: "Earning hour",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 100,
    },
    {
      field: "access",
      headerAlign: "center",
      headerName: "Acces Level",
      flex: 0.5,
      minWidth: 150,
      renderCell: ({
        row: { access }
      }: any) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            bgcolor={theme.palette.secondary.main}
            borderRadius="4px"
          >
            <AdminPanelSettingsOutlined  /> 
             <Typography  sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
  
    <Box
      m="20px"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}

      transition={{ duration: 0.3 }}
    >
      <Header title="Admin" subtitle="Menaging the Admin. " />
      <Box
        m={isNonMobile ? "40px 0 0 0" : "0"}
        height="75vh"
      >
        <DataGrid
          disableColumnSelector
          rows={rows}
          columns={colums}
        />
      </Box>
    </Box>
  );
};

export default Team;
