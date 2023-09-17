import * as yup from "yup";
import React, { useState } from "react";
import { Dialog, useTheme } from "@mui/material";
import UseButton from "../ButtonUI/Button";
import { Formik } from "formik";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";


import Textfiled from "../FormsUI/Textfiled";

const initialValues = {
  startHour: "",
  endHour: "",
  company: "",
};
const userSchema = yup.object().shape({
  startHour: yup.string().required(),
  endHour: yup.string().required(),
  company: yup.string().required(),
});

const FormDialog = ({
  clous,
  pull
}: any) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleFormSubmit = (value: any) => {
    pull(value);
  };

  return (   
    <div>
      
      <Dialog open={open} onClose={clous}>        
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={userSchema}
        >
          {({ handleSubmit }) => (            
            <form onSubmit={handleSubmit} style={{ width: "600px" }}> 
              <DialogContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >                
                <DialogContentText
                >
                  A New Time of Day.
                </DialogContentText>               
                <Textfiled
                  margin="dense"
                  label="Company"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="company"
                />
                
                <Textfiled
                  margin="dense"
                  label="From"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="startHour"
                />
                
                <Textfiled
                  margin="dense"
                  label="At"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="endHour"
                />
              </DialogContent>            
              <DialogActions 
              >               
                <UseButton
                  text={"Cancel"}
                  onClick={clous}
                />               
                <UseButton text={"Conferm"} />
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default FormDialog;
