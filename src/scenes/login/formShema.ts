import * as yup from "yup";

export interface UserValues {
  email: string;
  password: string;
  passwordConfirmation: string;
  earningHour: string;
}

export const initialValues: UserValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
  earningHour: "",
};

export const userSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("No password provided.")
    .min(4, "Password is too short - should be 4 chars minimum."),

  passwordConfirmation: yup
    .string()
    .required("No password provided.")
    .min(4, "Password is too short - should be 4 chars minimum.")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  earningHour: yup.number().required("required"),
});
