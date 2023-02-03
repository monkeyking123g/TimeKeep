import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import dayjs from "dayjs";
import CircularIndeterminate from "../../components/Circular";
import CustomDataGrid from "../../components/DataGrid";

import { motion } from "framer-motion";
import { getTimeUser, deletTime } from "../../api";

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

const ListTime = () => {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        const newData = [];

        const response = await getTimeUser();

        if (Array.isArray(response.data.data)) {
          let nam = 1;
          response.data.data.forEach((el) => {
            const updateData = {
              id: el._id,
              nam: nam,
              company: el.company,
              start: el.start.slice(0, 5),
              end: el.end.slice(0, 5),
              total: el.total,
              dateCreated: dayjs(el.dateCreated).format("DD-MM-YYYY"),
            };
            newData.push(updateData);
            nam += 1;
          });
        }

        setRows(newData);
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
  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };
  function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }
    return arr;
  }
  const handlePurge = () => {
    const newRows = [...rows];
    selectedRows.forEach((i) => {
      deletTime(i);
      removeObjectWithId(newRows, i);
    });
    setSelectedRows([]);
    return setRows(newRows);
  };
  return (
    <Box
      m="20px"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      //exit={{ opacity: 0 }}
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
