import { useDispatch } from "react-redux";
import { loginUser } from "../store/usersSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import { useTranslation } from "react-i18next";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(loginUser(values));
      setSubmitting(false);
      navigate("/");
    } catch (error) {
      console.log("Login failed:", error);
      setSubmitting(false);
      if (error.message === "Request failed with status code 400") {
        formik.setErrors({ login: "User not found. Please register." });
      } else {
        formik.setErrors({ login: "Login failed. Please try again." });
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
            {formik.errors.login && (
              <div className="error">{formik.errors.login}</div>
            )}

            <button
              type="submit"
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
