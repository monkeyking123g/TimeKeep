import { Box, Typography, List } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import CustomDataGrid from "../../components/DataGrid";
import CircularIndeterminate from "../../components/Circular";
import { getUserMonth, deletMonth } from "../../api";
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import { convertHoursToHMS } from "../time/index"
import EventItem from "../../components/EventItem";
import useMediaQuery from "@mui/material/useMediaQuery";;

export interface RowsData {
  id: string,
  nam: number,
  month: string,
  hours: number | string,
  dateCreated: string,
  [key: string]: string | number;
}

const colums = [
  { field: "nam", headerName: "ID", flex: 0.5 },
  {
    field: "month",
    headerName: "Month",
    flex: 0.5,
    minWidth: 100,
  },
  {
    field: "hours",
    headerName: "Hours",
    type: "number",
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

const initialValue: RowsData[] = [
  {
    id: 'testId',
    nam: 1,
    month: 'genaio 2023',
    hours: 200,
    dateCreated: '12-05-2023',
  }
]

const Month = () => {
  const [rows, setRows] = useState<RowsData[]>(initialValue);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.user);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        const response = await getUserMonth(user._id);

        if (Array.isArray(response.data)) {
          const newData: RowsData[] = response.data.map((el: any, index: number) => {
            return {
              id: el._id,
              nam: index + 1, 
              month: el.month,
              hours: convertHoursToHMS(el.total),
              dateCreated: new Date(el.dateCreated).toISOString().slice(0, 10),
            };
          });
          setRows(newData);
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
  const handleSelectionChange = (selection: any) => {
    setSelectedRows(selection);
  };
  function removeObjectWithId(arr: any[], id: string) {
    const objWithIdIndex = arr.findIndex((obj: any) => obj.id === id);
    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }
    return arr;
  }
  const handlePurge = () => {
    const newRows = [...rows];
    selectedRows.forEach((i) => {
      deletMonth(i);
      removeObjectWithId(newRows, i);
    });
    setSelectedRows([]);
    return setRows(newRows);
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
        <Header title="All Month" />
        {loading ? <CircularIndeterminate /> : <Box display="flex" p="20px" />}
      </Box>
      
      <CustomDataGrid
        rows={rows}
        columns={colums}
        selectedRows={selectedRows}
        onSelectionChange={handleSelectionChange}
        onPurge={handlePurge}
      />
    </Box>
  </>
  );
};

export default Month;
