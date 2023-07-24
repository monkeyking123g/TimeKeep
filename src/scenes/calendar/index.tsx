import '../../fullcalendar-vars.css';
import '@fullcalendar/core/locales/it';
import React, { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import CircularIndeterminate from "../../components/Circular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FormDialog from "../../components/DialogUI";
import useMediaQuery from "@mui/material/useMediaQuery";
import dayjs from "dayjs";
import moment from "moment";
import Axios from "axios";
import { getTimeUser, postTimes } from "../../api";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useStyleFullcalendar } from "../../style";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { reactLocalStorage } from "reactjs-localstorage";
import { motion } from "framer-motion";
// @ts-ignore
import { CalendarApi } from "fullcalendar";

interface TimeData {
  _id: string;
  company: string;
  startHour: string;
  endHour: string;
  dateCreated: string;
}

interface CalendarProps {
 
}

const Calendar: React.FC<CalendarProps>  = () => {
  const [hours, setHours] = useState();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [time, setTime] = useState<TimeData>();
  const [dataAweit, setDataAweit] = useState(false);
  const [open, setOpen] = useState(false);
  const [calendarApiGlobal, setCalendarApiGlobal] = useState<any>();
  const [data, setData] = useState([]);
  const userCredensial: any = reactLocalStorage.getObject("user");
  const [loading, setLoading] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const styleCallendar = useStyleFullcalendar({
    // grey: colors.grey[800],
    // green: colors.greenAccent[500],
    // primary: colors.primary[500],
    // textColor: colors.textColor[100],
  });

  /***************  useEffect ****************/ 
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await getTimeUser();

        if (Array.isArray(response.data.data) && response.data.data.length > 0) {
          const newData = response.data.data.map((element: any) => {
            return {
              id: element._id,
              title: `${element.start.slice(0, 5)} - ${element.end.slice(0, 5)}`,
              date: dayjs(element.dateCreated).format("YYYY-MM-DD"),
              display: "list-item",
            };
          });
          setHours(newData);
          setData(response.data.data);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
        } else {
          console.log("Error", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const dataReset = async () => {
    try {
      const response = await getTimeUser();
      setData(response.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
      } else {
        console.log("Error", error.message);
      }
    }
  };
  const handleClosePopwindow = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (dataAweit) {
      const postNewTime = async () => {
        try {
          const calendar = calendarApiGlobal.view.calendar as CalendarApi;

          calendar.unselect();
          calendar.addEvent({
            id: `${time.endHour}-${time.startHour}`,
            title: `${time.startHour} - ${time.endHour}`,
            date: calendarApiGlobal.dateStr,
            display: "list-item",
          });

          setDataAweit(false);
          handleClosePopwindow();

          const start = moment(`2022-01-01 ${time.startHour}`);
          const end = moment(`2022-01-01 ${time.endHour}`);

          // Calculate the duration
          const duration = moment.duration(end.diff(start));
          const durationInHours = duration.asHours();

          const values: any = {
            company: time.company,
            startHour: time.startHour,
            endHour: time.endHour,
          };

          await postTimes(values);

          dataReset();
        } catch (error) {
          if (error.response) {
            console.log(error.response.status);
          } else {
            console.log("Error", error.message);
          }
        }
      };

      postNewTime();
    }
  }, [dataAweit, time, calendarApiGlobal, setDataAweit, handleClosePopwindow, dataReset]);

  //////////////// Function /////////////////////

  const handleOpen = () => {
    setOpen(true);
  };
  

  const pull_data = (data: any) => {
    setTime(data);
    setDataAweit(true);
  };
  const handleDateClick = (selected: any) => {
    handleOpen();
    setCalendarApiGlobal(selected);
  };
  
  const handleEventClick = (selected: any) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      Axios.delete(
        `${process.env.REACT_APP_DOMAIN}/api/user/${selected.event.id}/time`
      );
      setData(data.filter((a) => a._id !== selected.event.id));
      selected.event.remove();
    }
  };
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <Box
      m={isNonMobile ? "20px" : "15px"}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {open ? (
        <FormDialog clous={handleClosePopwindow} pull={pull_data} />
      ) : null}
      <Box display="flex" justifyContent="space-between">
        <Header
          title="Calendar"
          // TitleColor={colors.pink[500]}
          subtitle="Full Calendar Interactive Page"
        />
       
        {loading ? <CircularIndeterminate /> : <Box display="flex" p="20px" />}
      </Box>
 
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          // backgroundColor={colors.secondary[500]}
          p="15px"
          borderRadius="4px"
          display={isNonMobile ? undefined : "none"}
        >
         
          <Typography variant="h5">Last Events</Typography>
          {loading ? (
           
            <CircularIndeterminate />
          ) : (
           
            <List
              component={motion.ul}
              className="container"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {data.slice(Math.max(data.length - 8, 0)).map((event) => ( 
                <ListItem
                  component={motion.li}
                  className="item-li"
                  variants={item}
                  key={event._id}
                  sx={{
                    backgroundColor: colors.primary[500],
                    color: "#000",
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                 
                  <ListItemText
                    secondary={
                     
                      <Typography
                        component={"span"}
                        sx={{ cursor: "pointer", fontSize: "15px" }}
                      >
                        {"Total : " + event.total + " hour."}
                       
                        <br />
                       
                        <Typography
                          component={"span"}
                          sx={{ cursor: "pointer", fontSize: "15px" }}
                        >
                          {"Date : " +
                            formatDate(event.dateCreated, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                        </Typography>
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        {/* CALENDAR */}
       
        <Box
          flex={isNonMobile ? "1 1 100%" : undefined}
          width={isNonMobile ? undefined : "600px"}
          sx={
            isNonMobile
              ? undefined
              : {
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                }
          }
        >
          <Box
            // flex="1 1 100%"
            ml="15px"
            width={isNonMobile ? "none" : "600px"}
            sx={styleCallendar.root}
          >          
            <FullCalendar
              height="75vh"
              contentHeight="1000px"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: isNonMobile ? "prev,next today" : "prev,next",
                center: isNonMobile ? "title" : null,
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView={"dayGridMonth"}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
              locale="it"
              events={hours}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
