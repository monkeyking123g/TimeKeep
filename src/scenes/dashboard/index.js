import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import CircularIndeterminate from "../../components/Circular";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
// Icons
import { PointOfSale } from "@mui/icons-material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AccessTimeFilledOutlinedIcon from "@mui/icons-material/AccessTimeFilledOutlined";
import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
//Chart
import LineChart from "../../components/LineChart";
import StateBox from "../../components/StateBox";
import ProgressCircle from "../../components/ProgressCircle";
import { reactLocalStorage } from "reactjs-localstorage";

// DB connetct
import dayjs from "dayjs";
import "dayjs/locale/it";
import { loadData } from "../../api";

// my functions
import {
  percentage,
  precisionRound,
  totalHours,
} from "../../components/myUseFuncrion";

import AnimatedNumber from "animated-number-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false);

  const userCredensial = reactLocalStorage.getObject("user");

  const [rows, setRows] = useState([]);
  const [totalMonth, setTotalMonth] = useState(0);
  const [totalYear, setTotalYear] = useState(0);

  const totalMonthHours = totalHours().month;
  const totalYearHours = totalHours().year;

  useEffect(() => {
    setLoading(true);
    const setData = async () => {
      try {
        const response = await loadData();
        //console.log(response.rows);
        setRows(response.rows);
        setTotalMonth(response.calcolateTotalMonth);
        setTotalYear(response.calcolatetotalYear);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    setData();
  }, []);

  //  Calcolate data from Dashboard
  const percentMonth = precisionRound(
    percentage(totalMonth, totalMonthHours),
    1
  );
  const percentYear = precisionRound(percentage(totalYear, totalYearHours), 1);
  const erninHourTotal = precisionRound(
    totalMonth * userCredensial.ernin_hour,
    2
  );
  const erninHourYear = precisionRound(
    totalYear * userCredensial.ernin_hour,
    2
  );
  const percentErnMonth = precisionRound(
    percentage(erninHourTotal, totalMonthHours * userCredensial.ernin_hour),
    1
  );
  const percentErnYear = precisionRound(
    percentage(erninHourYear, totalYearHours * userCredensial.ernin_hour),
    1
  );
  const formatValue = (erninHourYear) => erninHourYear.toFixed(2);
  let i = 0;
  return (
    <Box
      m="20px"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcom to your dashboard." />
        {loading ? <CircularIndeterminate /> : <Box display="flex" p="20px" />}
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="15px"
      >
        {/* {Row 1} */}
        <Box
          gridColumn={isNonMobile ? "span 3" : "span 12"}
          backgroundColor={colors.secondary[500]}
          borderRadius="4px"
          border="1px solid #292929"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StateBox
            title={totalMonth}
            subtitle="Sum by Month"
            process={totalMonth}
            increase={`+${percentMonth}%`}
            icon={
              <AccessTimeOutlinedIcon
                sx={{ color: colors.greenAccent[500], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn={isNonMobile ? "span 3" : "span 12"}
          backgroundColor={colors.secondary[500]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="4px"
          border="1px solid #292929"
        >
          <StateBox
            title={`${erninHourTotal} $`}
            subtitle="Earning this Month"
            process={percentErnMonth}
            increase={`+${percentErnMonth}%`}
            icon={
              <PointOfSale
                sx={{ color: colors.greenAccent[500], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn={isNonMobile ? "span 3" : "span 12"}
          backgroundColor={colors.secondary[500]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="4px"
          border="1px solid #292929"
        >
          <StateBox
            title={totalYear}
            subtitle="Sum by Year"
            process={percentYear}
            increase={`+${percentYear}%`}
            icon={
              <AccessTimeFilledOutlinedIcon
                sx={{ color: colors.greenAccent[500], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn={isNonMobile ? "span 3" : "span 12"}
          backgroundColor={colors.secondary[500]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="4px"
          border="1px solid #292929"
        >
          <StateBox
            title={userCredensial.ernin_hour}
            subtitle="Salary to Hourly"
            process={50}
            increase="+50%"
            icon={
              <EuroOutlinedIcon
                sx={{ color: colors.greenAccent[500], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn={isNonMobile ? "span 8" : "span 12"}
          gridRow="span 2"
          p="30px"
          borderRadius="4px"
        >
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
              progressColor={colors.greenAccent[500]}
              progress={percentErnYear}
              colorBg={colors.primary[100]}
            />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
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
        </Box>

        {/* TRANSCTION */}
        <Box
          gridColumn={isNonMobile ? "span 4" : "span 12"}
          gridRow="span 2"
          overflow="auto"
          borderRadius="4px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="end"
            borderBottom={`2px solid ${colors.grey[800]}`}
            color={colors.textColor[200]}
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
              borderBottom={`2px solid ${colors.grey[800]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.grey[600]}
                  variant="h5"
                  fontWeight={600}
                >
                  {++i}
                </Typography>
                <Typography color={colors.textColor[100]}>
                  {dayjs(trasaction.dateCreated)
                    .locale("it")
                    .format("DD-MM-YYYY")}
                </Typography>
              </Box>
              <Box color={colors.pink[500]} fontSize="16px">
                {`${trasaction.start.slice(0, 5)} - ${trasaction.end.slice(
                  0,
                  5
                )}`}
              </Box>
              <Box
                p="5px 10px"
                borderRadius="4px"
                fontSize="16px"
                color={colors.greenAccent[500]}
                width="70px"
              >
                {trasaction.total.toFixed(1)}
                {" h."}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
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
            color={colors.greenAccent[500]}
          >
            Months sum of the year.
          </Typography>
        </Box>
      </Box>
      <Box
        height="250px"
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
    </Box>
  );
};

export default Dashboard;
