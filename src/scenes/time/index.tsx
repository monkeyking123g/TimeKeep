import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import dayjs from "dayjs";
import CircularIndeterminate from "../../components/Circular";
import CustomDataGrid from "../../components/DataGrid";

import { motion } from "framer-motion";
import { getTimeUser, deletTime } from "../../api";

interface TimeData {
  _id: string;
  company: string;
  start: string;
  end: string;
  total: number;
  dateCreated: string;
}
const colums = [
  {
    field: "nam",
    headerName: "ID",
    flex: 0.4,
  },
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



const ListTime: React.FC = () => {
  const [rows, setRows] = useState<TimeData[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        const response = await getTimeUser();

        if (Array.isArray(response.data.data)) {
          let nam = 1;
          const newData: TimeData[] = response.data.data.map((el: any) => ({
            _id: el._id,
            company: el.company,
            start: el.start.slice(0, 5),
            end: el.end.slice(0, 5),
            total: el.total,
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
    return arr.filter((item) => item._id !== id);
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
  return (
    <Box
      m="20px"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box display="flex" justifyContent="space-between">
        <Header title="All Time" subtitle="List by Time Created" />
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
  );
};

export default ListTime;
