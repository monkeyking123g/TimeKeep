import "dayjs/locale/it";
import React from "react";
import { Box, Typography, useTheme, Paper } from "@mui/material";
import { useSelector } from 'react-redux';
import Header from "../../components/Header";
import CircularIndeterminate from "../../components/Circular";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PointOfSale } from "@mui/icons-material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AccessTimeFilledOutlinedIcon from "@mui/icons-material/AccessTimeFilledOutlined";
import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
import LineChart from "../../components/LineChart";
import StateBox from "../../components/StateBox";
import ProgressCircle from "../../components/ProgressCircle";
import Grid from '@mui/system/Unstable_Grid';
import dayjs from "dayjs";
import { loadData } from "../../api";

import {
  percentage,
  precisionRound,
  totalHours,
} from "../../components/myUseFuncrion";

// @ts-ignore
import AnimatedNumber from "animated-number-react";
import { motion } from "framer-motion";
import styled from '@mui/system/styled';

const Item = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems : "center",
  justifyContent : "center",
  height: '150px',
}));

const Dashboard = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.user);
  const [rows, setRows] = useState([]);
  const [totalMonth, setTotalMonth] = useState(0);
  const [totalYear, setTotalYear] = useState(0);
  const totalMonthHours = totalHours().month;
  const totalYearHours = totalHours().year;

  useEffect(() => {
    setLoading(true);
    const setData = async () => {
      try {
        const response = await loadData(user._id);
        setRows(response.rows);
        setTotalMonth(response.calculateTotalMonth);
        setTotalYear(response.calculateTotalYear);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    setData();
  }, []);

  const percentMonth = precisionRound(
    percentage(totalMonth, totalMonthHours),
    1
  );
  const percentYear = precisionRound(percentage(totalYear, totalYearHours), 1);
  const erninHourTotal = precisionRound(
    totalMonth * user.ernin_hour,
    2
  );
  const erninHourYear = precisionRound(
    totalYear * user.ernin_hour,
    2
  );
  const percentErnMonth = precisionRound(
    percentage(erninHourTotal, totalMonthHours * user.ernin_hour),
    1
  );
  const percentErnYear = precisionRound(
    percentage(erninHourYear, totalYearHours * user.ernin_hour),
    1
  );
  const formatValue = (erninHourYear: any) => erninHourYear.toFixed(2);
  let i = 0;
  return (
    <Box
      m="20px"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >

      <Box display="flex" justifyContent="space-between" alignItems="center">
  
        <Header title="DASHBOARD" subtitle="Welcom to your dashboard." />
  
      {loading ? <CircularIndeterminate /> : <Box display="flex" p="20px" />}
      </Box>

      <Grid container spacing={2} >
      <Grid xs={12} sm={6} md={3} lg={3}>
          <Item elevation={6} >
              <StateBox
                title={totalMonth}
                subtitle="Sum by Month"
                process={totalMonth}
                increase={`+${percentMonth}%`}
                icon={
                  <AccessTimeOutlinedIcon  color="secondary"
                  sx={{ fontSize: "26px" }}
                  />
                }
              />
          </Item>
      </Grid>
        <Grid xs={12} sm={6} md={3} lg={3}>
          <Item elevation={6} >
            <StateBox
                title={`${erninHourTotal} $`}
                subtitle="Earning this Month"
                process={percentErnMonth || 0}
                increase={`+${percentErnMonth}%`}
                icon={
            
                  <PointOfSale 
                    sx={{ color: theme.palette.secondary.main, fontSize: "26px" }}
                  />
                }
              />
          </Item>
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3}>
          <Item elevation={6} >
            <StateBox
              title={totalYear}
              subtitle="Sum by Year"
              process={percentYear || 0}
              increase={`+${percentYear}%`}
              icon={
                <AccessTimeFilledOutlinedIcon sx={{ color: theme.palette.secondary.main,  fontSize: "26px" }} />
              }
            />
          </Item>
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3}>
          <Item elevation={6} >
            <StateBox
              title={user.ernin_hour}
              subtitle="Salary to Hourly"
              process={50}
              increase="+50%"
              icon={
                <EuroOutlinedIcon 
                  sx={{ color: theme.palette.secondary.main, fontSize: "26px" }}
                />
              }
            />
          </Item>
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6}>
          <Paper elevation={6} >
            <Typography variant="h5" fontWeight={600} color={"#808080"}>
              Campingn
            </Typography>
      
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
        
              <ProgressCircle
                size="125"
                progressColor={theme.palette.secondary.main}
                progress={percentErnYear}
                // colorBg={colors.primary[100]}
              />
        
              <Typography
                variant="h5"
                color="success"
                sx={{
                  mt: "15px",
                }}
              >
                $&nbsp;
          
                <AnimatedNumber value={erninHourYear} formatValue={formatValue} />
                &nbsp;Revenue gerated this year.
              </Typography>
        
              <Typography color={"#808080"}>
                Inclides extra misc expenditures and cost
              </Typography>
            </Box>
        </Paper >

        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6}>
        <Paper elevation={6} >
    
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="end"
            // borderBottom={`2px solid ${colors.grey[800]}`}
            // color={colors.textColor[200]}
            p="15px"
          >
      
            <Typography color={"#808080"} variant="h5" fontWeight={600}>
              Last sum by day created
            </Typography>
          </Box>
          {rows.slice(Math.max(rows.length - 8, 0)).map((trasaction) => (
      
            <Box
              key={`${trasaction._id}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              // borderBottom={`2px solid ${colors.grey[800]}`}
              p="15px"
            >
        
              <Box>
          
                <Typography
                  // color={colors.grey[600]}
                  variant="h5"
                  fontWeight={600}
                >
                  {++i}
                </Typography>
          
                <Typography 
                // color={colors.textColor[100]}
                >
                  {dayjs(trasaction.dateCreated)
                    .locale("it")
                    .format("DD-MM-YYYY")}
                </Typography>
              </Box>
        
              <Box 
              color="primary" 
              fontSize="16px">
                {`${trasaction.start.slice(0, 5)} - ${trasaction.end.slice(
                  0,
                  5
                )}`}
              </Box>
        
              <Box
                p="5px 10px"
                borderRadius="4px"
                fontSize="16px"
                color="success"
                width="70px"
              >
                {trasaction.total.toFixed(1)}
                {" h."}
              </Box>
            </Box>
          ))}
        </Paper>
     
        </Grid>
        <Grid xs={12}>
              <Box
              mt={isNonMobile ? "0px" : "25px"}
              p="0 30px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
        
              <Box>
          
                <Typography variant="h5" fontWeight="600" color={"#808080"}>
                  Revenue Generated
                </Typography>
          
                <Typography
                  variant="h3"
                  fontWeight="500"
                  color="success"
                >
                  Months sum of the year.
                </Typography>
              </Box>
            </Box>
          <Box
            // height="250px"
            // width="100%"
            sx={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              overflowY: "hidden",
            }}
          >
          <Box height="250px" width={isNonMobile ? null : "1000px"} m="0 0 0 0">
          
                <LineChart isDashboard={true} />
              </Box>
            </Box> 
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
