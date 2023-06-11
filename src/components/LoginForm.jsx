import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginUserFailure } from "../store/usersSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import { useTranslation } from "react-i18next";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const error = useSelector((state) => state.users.error);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("errorText.invalidEmail"))
      .required(t("errorText.required")),
    password: Yup.string().required(t("errorText.required")),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(loginUser(values));
      setSubmitting(false);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        navigate("/");
      }
    } catch (error) {
      console.log("Login failed:", error);
      setSubmitting(false);
      if (error.response && error.response.status === 401) {
        dispatch(loginUserFailure("Invalid credentials"));
      } else {
        dispatch(loginUserFailure("User not found"));
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="input"
              type="email"
              label="register.email"
              name="email"
            />
            <FormikControl
              control="input"
              type="password"
              label="register.password"
              name="password"
              error={formik.errors.password || formik.errors.login}
            />
            {error && error === "Invalid credentials" && (
              <div className="text-danger">{t("login.invalidCredentials")}</div>
            )}
            {error && error === "User not found" && (
              <div className="text-danger">{t("login.noUserFound")}</div>
            )}
            <button
              type="submit"
              className="btn btn-primary mt-3"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {t("register.submit")}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
