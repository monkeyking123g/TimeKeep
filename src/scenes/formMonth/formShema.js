import * as yup from "yup";
import dayjs from "dayjs";

export const initialValues = {
  total: "",
  dateCreated: dayjs(new Date()).locale("it").format("YYYY-MM-DD"),
  month: dayjs(new Date()).locale("it").format("MMMM YYYY"),
};

export const userSchema = yup.object().shape({
  total: yup.number().required("required"),
  dateCreated: yup.date().required("required"),
  month: yup.date().required("required"),
});
