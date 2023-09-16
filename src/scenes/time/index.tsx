import { Box, Typography, List,  useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import dayjs from "dayjs";
import CircularIndeterminate from "../../components/Circular";
import CustomDataGrid from "../../components/DataGrid";
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { getUserTime, deletTime } from "../../api";
import useMediaQuery from "@mui/material/useMediaQuery";
import EventItem from "../../components/EventItem";

export interface TimeData {
  id: string;
  company: string;
  start: string;
  end: string;
  total: string;
  dateCreated: string;
  [key: string]: string;
}
const colums = [
  {
    field: "company",
    headerName: "Company",
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: "start",
    headerName: "From",
    type: "string",
    headerAlign: "left",
    align: "left",
    cellClassName: "name-column--cell",
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: "end",
    headerName: "At",
    type: "string",
    headerAlign: "left",
    align: "left",
    cellClassName: "name-column--cell",
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: "total",
    headerName: "Total",
    type: "string",
    headerAlign: "left",
    align: "left",
    cellClassName: "name-column--cell",
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: "dateCreated",
    headerName: "Date Created",
    type: "date",
    flex: 0.5,
    minWidth: 100,
  },
];

export function convertHoursToHMS(hours: number): string {
  const totalSeconds = Math.round(hours * 3600); 
  const hoursResult = Math.floor(totalSeconds / 3600); 
  const minutesResult = Math.floor((totalSeconds % 3600) / 60); 
  const secondsResult = totalSeconds % 60; 

  const hoursStr = hoursResult > 0 ? `${hoursResult}h` : '';
  const minutesStr = minutesResult > 0 ? `${minutesResult}m` : '';
  const secondsStr = secondsResult > 0 ? `${secondsResult}s` : '';

  return `${hoursStr} ${minutesStr} ${secondsStr}`.trim();
}
const initialValue: TimeData[] = [
  {
    id: 'testId',
    company: 'google',
    start: '08:00',
    end: '12:00',
    total: "4",
    dateCreated: '12-05-2023'
  }
]

const ListTime: React.FC = () => {
  const [rows, setRows] = useState<TimeData[]>(initialValue);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.user);
  const [error, setError] = useState<string | null>(null);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        const response = await getUserTime(user._id);
        
        if (Array.isArray(response.data)) {
          const newData: TimeData[] = response.data.map((el: any) => ({
            id: el._id,
            company: el.company,
            start: el.start.slice(0, 5),
            end: el.end.slice(0, 5),
            total: convertHoursToHMS(el.total),
            dateCreated: dayjs(el.dateCreated).format("DD-MM-YYYY"),
          }));
          setRows(newData);
        }
      } catch (error) {

        setError("Error loading data. Please try again later.");
        
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSelectionChange = (selection: string[]) => {
    setSelectedRows(selection);
  };

  const removeObjectWithId = (arr: TimeData[], id: string) => {
    return arr.filter((item) => item.id !== id);
  };

  const handlePurge = async () => {
    try {
      setLoading(true);
      for (const id of selectedRows) {
        await deletTime(id);
        setRows((prevRows) => removeObjectWithId(prevRows, id));
      }
      setSelectedRows([]);
    } catch (error) {
      setError("Error deleting data. Please try again later.");
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };
  return (<>
  
    <Box
      flex="1 1 20%"
      p="15px"
      borderRadius="4px"
      display={isNonMobile && "none"}
      
    >
    
      <Typography variant="h5">All Time</Typography>
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <List>
          {rows.map((event) => (
            <EventItem event={event} key={event.id} />
          ))}
        </List>
      )}
    </Box>
  
    <Box
      display={!isNonMobile && "none"}
      m="20px"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box display="flex" justifyContent="space-between">
        <Header title="All Time" />
        {loading ? <CircularIndeterminate /> : <Box display="flex" p="20px" />}
      </Box>

      <CustomDataGrid
        rows={rows}
        columns={colums}
        onSelectionChange={handleSelectionChange}
        onPurge={handlePurge}
        selectedRows={selectedRows}
      />
    </Box>
    </>);
};

export default ListTime;
