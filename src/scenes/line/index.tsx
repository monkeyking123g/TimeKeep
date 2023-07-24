import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";

const Line = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box
      m="20px"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      sx={
        isNonMobile
          ? undefined
          : {
              overflowX: "auto",
              whiteSpace: "nowrap",
              overflowY: "hidden",
            }
      }
    >
      <Box display="flex" justifyContent="space-between"> 
        <Header title="Line Chart" subtitle="Simple Line Chart" />
      </Box>
      <Box
        height={isNonMobile ? "75vh" : "74vh"}
        width={isNonMobile ? "100%" : "1000px"}
      >
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
