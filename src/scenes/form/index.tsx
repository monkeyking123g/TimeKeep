import React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import { Formik } from "formik";
import Header from "../../components/Header";
import CircularIndeterminate from "../../components/Circular";
import dayjs from "dayjs";
import "dayjs/locale/it";
import moment from "moment";
import UseButton from "../../components/ButtonUI/Button";
import { postTimes } from "../../api";
import CustomizedSnackbars from "../../components/Alert";
import { precisionRound } from "../../components/myUseFuncrion";
import { motion } from "framer-motion";
import Textfiled from "../../components/FormsUI/Textfiled";
import DatePickerUse from "../../components/DatePickerUI";
import { initialValues, userSchema } from "./formShema";
import { useSelector } from 'react-redux';

enum MessageType {
  Success = "Successfully Created.",
  ErrorNetwork = "A network error occurred. Please check your connection and try again.",
  ServerError = "Sorry, there's an issue on our server. Please try again later.",
  InvalidInput = "Oops! The data you entered is invalid. Please check and try again.",
}

const Form = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.user);
  const [status, setStatus] = useState({
    state: false,
    title: "",
  });

  const [value, setValue] = useState(dayjs(new Date()).format("YYYY-MM-DD"));

  const handleFormSubmit = async (values: any, actions: any) => {
    setLoading(true);
    try {
      const start = moment(`2022-01-01 ${values.start}`);
      const end = moment(`2022-01-01 ${values.end}`);
      // Calculate the duration
      const duration = moment.duration(end.diff(start));
      const hours = duration.asHours();

      const newValuse = Object.assign(values, {
        total: precisionRound(hours, 2),
        owner: user._id,
      });
      const response = await postTimes(newValuse);

      if (response.status === 201) {
        setStatus({ state: true, title: MessageType.Success });
        actions.setSubmitting(false);
        actions.resetForm({
          values: {
            company: "",
            start: "",
            end: "",
            dateCreated: dayjs(new Date()).locale("it").format("YYYY-MM-DD"),
          },
        });
      }
    } catch (error) {
      if (error.response) {
        setStatus({ state: true, title: MessageType.InvalidInput });
      } else {
        setStatus({ state: true, title: MessageType.ServerError });
      }
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
     
      <CustomizedSnackbars
        SnackbarOpen={status}
        setSnackbarOpen={setStatus}
        severity="success"
      />
     
      <Box display="flex" justifyContent="center" mb="20px">
       
        <Header
          title="Sum by Day "
          subtitle="Created a New Time by Day"
        />
        {loading ? <CircularIndeterminate /> : <Box display="flex" p="20px" />}
      </Box>

     
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({ handleSubmit, setFieldValue }) => (
         
          <Box
            width="100%"
            height="75vh"
            display="flex"
            justifyContent="center"
          >
           
            <form
              onSubmit={handleSubmit}
              style={{ marginTop: "30px", width: "700px" }}
            >
             
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              >
               
                <Textfiled
                  type="text"
                  label="Comapny Name"
                  name="company"
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
               
                <DatePickerUse
                  name={"dateCreated"}
                  label="Date Created"
                  onChange={(newValue: any) => {
                    setValue(dayjs(newValue).format("YYYY-MM-DD"));
                    setFieldValue(
                      "dateCreated",
                      dayjs(newValue).format("YYYY-MM-DD")
                    );
                  }}
                  value={value}
                />
               
                <Textfiled
                  type="time"
                  label="From"
                  name="start"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
               
                <Textfiled
                  type="time"
                  label="At"
                  name="end"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
              </Box>
             
              <Box display="flex" justifyContent="space-batwin" mt="40px">
               
                <UseButton text={"Conferm"} />
              </Box>
            </form>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
