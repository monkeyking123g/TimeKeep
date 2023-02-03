import { useState } from "react";
import { Dialog, useTheme, Typography } from "@mui/material";
import UseButton from "../ButtonUI/Button";
import { Formik } from "formik";
import * as yup from "yup";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Textfiled from "../FormsUI/Textfiled";
import { useStyledTextField } from "../../style";
import { tokens } from "../../theme";

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

const FormDialog = ({ clous, pull }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(true);
  const CustomTextField = useStyledTextField({
    color: colors.greenAccent[500],
    globalColor: colors.grey[800],
  });

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleFormSubmit = (value) => {
    pull(value);
  };

  return (
    <div>
      <Dialog open={open} onClose={clous}>
        <DialogTitle sx={{ backgroundColor: colors.secondary[500] }}>
          <Typography variant="h3">Created</Typography>
        </DialogTitle>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={userSchema}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} style={{ width: "600px" }}>
              <DialogContent
                sx={{
                  backgroundColor: colors.secondary[500],
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <DialogContentText
                  sx={{ backgroundColor: colors.secondary[500] }}
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
                  sx={CustomTextField.root}
                />
                <Textfiled
                  margin="dense"
                  label="From"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="startHour"
                  sx={CustomTextField.root}
                />
                <Textfiled
                  margin="dense"
                  label="At"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="endHour"
                  sx={CustomTextField.root}
                />
              </DialogContent>
              <DialogActions sx={{ backgroundColor: colors.secondary[500] }}>
                <UseButton
                  text={"Cancel"}
                  onClick={clous}
                  bgColor={"#cf6679"}
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
