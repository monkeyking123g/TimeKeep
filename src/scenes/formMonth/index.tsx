import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { Formik } from "formik";

import dayjs from "dayjs";
import "dayjs/locale/it";

import Header from "../../components/Header";
import { tokens } from "../../theme";
import { reactLocalStorage } from "reactjs-localstorage";
import CustomizedSnackbars from "../../components/Alert";
import CircularIndeterminate from "../../components/Circular";
import { useStyledTextField } from "../../style";
import { motion } from "framer-motion";
import Textfiled from "../../components/FormsUI/Textfiled";
import { initialValues, userSchema } from "./formShema";
import UseButton from "../../components/ButtonUI/Button";
import DatePickerUse from "../../components/DatePickerUI";
import { postMonth } from "../../api";
import React from "react";

const FormMonth = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const [monthValue, setMonthValue] = useState(dayjs(new Date()));
  const [createValue, setCreateValue] = useState(dayjs(new Date()));
  const [userCredensial, setUserCredensial] = useState<any>(
    reactLocalStorage.getObject("user")
  );
  const [stateSuccessfully, setStateSuccessfully] = useState({
    state: false,
    title: "",
  });

  const CustomTextField = useStyledTextField({
    // color: colors.pink[500],
    // globalColor: colors.grey[800],
  });

  const handleFormSubmit = async (values: any, actions: any) => {
    setLoading(true);
    try {
      const newValuse = Object.assign(values, {
        owner: userCredensial.id,
      });
      const response = await postMonth(newValuse);

      if (response.status === 200) {
        setStateSuccessfully({
          state: true,
          title: "Successfully Created.",
        });
        actions.setSubmitting(false);
        actions.resetForm({
          values: {
            total: "",
            dateCreated: dayjs(new Date()).locale("it").format("YYYY-MM-DD"),
            month: "",
          },
        });
        setMonthValue(null);
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
  return (
    <Box
      m="20px"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <CustomizedSnackbars
        SnackbarOpen={stateSuccessfully}
        setSnackbarOpen={setStateSuccessfully}
        severity="success"
      />
      <Box display="flex" justifyContent="center" mb="15px">

        <Header
          title="Sum by Month"
          TitleColor={colors.pink[500]}
          subtitle="Created a New Sum by Month"
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
                sx={CustomTextField.root}
              >
               
                <Textfiled
                  type="number"
                  label="Total Time"
                  name="total"
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
                
                <DatePickerUse
                  name="month"
                  onChange={(newValue: any) => {
                    setMonthValue(dayjs(newValue));
                    setFieldValue("month", dayjs(newValue).format("MMMM YYYY"));
                  }}
                  value={monthValue}
                  openTo="year"
                  views={["year", "month"]}
                  label="Month"
                />

                
                <DatePickerUse
                  name="dateCreated"
                  label="Date Created"
                  onChange={(newValue: any) => {
                    setCreateValue(dayjs(newValue));
                    setFieldValue(
                      "dateCreate",
                      dayjs(newValue).format("YYYY-MM-DD")
                    );
                  }}
                  value={createValue}
                />
              </Box>
              <Box display="flex" justifyContent="center" mt="40px">
                <UseButton text={"Conferm"}></UseButton>
              </Box>
            </form>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default FormMonth;
