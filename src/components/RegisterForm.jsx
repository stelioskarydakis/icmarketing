import { useDispatch, useSelector } from "react-redux";
import { registerUser, editUser } from "../store/usersSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CountryList from "react-select-country-list";
import { useTranslation } from "react-i18next";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.users.user);

  const initialValues = {
    firstName: currentUser ? currentUser.firstName : "",
    lastName: currentUser ? currentUser.lastName : "",
    country: currentUser ? currentUser.country : "",
    dateOfBirth: currentUser ? currentUser.dateOfBirth : "",
    phoneNumber: currentUser ? currentUser.phoneNumber : "",
    acceptTerms: currentUser ? currentUser.acceptTerms : false,
    email: currentUser ? currentUser.email : "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    dateOfBirth: Yup.date()
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "Clients should be older than 18 years old"
      )
      .required("Required"),
    phoneNumber: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
      ),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    acceptTerms: Yup.boolean().oneOf(
      [true],
      "Must accept terms and conditions"
    ),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      if (currentUser) {
        await dispatch(editUser(values));
      } else {
        await dispatch(registerUser(values));
      }
      setSubmitting(false);
      navigate("/");
    } catch (error) {
      console.log("Operation failed:", error);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="input"
            type="text"
            label="register.firstName"
            name="firstName"
          />
          <FormikControl
            control="input"
            type="text"
            label="register.lastName"
            name="lastName"
          />
          {!currentUser && (
            <FormikControl
              control="input"
              type="email"
              label="register.email"
              name="email"
            />
          )}
          <FormikControl
            control="input"
            type="password"
            label="register.password"
            name="password"
          />
          <FormikControl
            control="input"
            type="password"
            label="register.confirmPassword"
            name="confirmPassword"
          />
          <FormikControl
            control="input"
            type="date"
            label="register.dob"
            name="dateOfBirth"
          />
          <div>
            <label htmlFor="country">{t("register.country")}</label>
            <Field
              as="select"
              name="country"
              component="select"
              options={CountryList().getData()}
            >
              <option value="">{t("register.selectCountry")}</option>
              {CountryList()
                .getData()
                .map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
            </Field>
            <ErrorMessage
              name="country"
              component="div"
              className="error-message"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">{t("register.phoneNumber")}</label>
            <Field
              as={PhoneInput}
              country={"us"}
              value={formik.values.phoneNumber}
              onChange={(value) => formik.setFieldValue("phoneNumber", value)}
            />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="error-message"
            />
          </div>
          <div>
            <Field
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              className="checkbox"
            />
            <label htmlFor="acceptTerms" className="checkbox-label">
              {t("register.acceptTerms")}
            </label>
            <ErrorMessage
              name="acceptTerms"
              component="div"
              className="error-message"
            />
          </div>
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {currentUser ? t("register.update") : t("register.register")}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
