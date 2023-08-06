import * as yup from "yup";
import dayjs from "dayjs";

export const initialValues = {
  company: "",
  start: "",
  end: "",
  dateCreated: dayjs(new Date()).locale("it").format("YYYY-MM-DD"),
};
export const userSchema = yup.object().shape({
  company: yup.string(),
  start: yup.string(),
  end: yup
    .string()
    .test("is-greater", "end time should be greater", function (value) {
      const { start } = this.parent;
      const valueDay = dayjs(value, "HH:mm");
      const startDay = dayjs(start, "HH:mm");
      return valueDay.isAfter(startDay);
    }),
  dateCreated: yup.date(),
});
