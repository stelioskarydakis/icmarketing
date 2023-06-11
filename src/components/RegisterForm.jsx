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
import { Link } from "react-router-dom";

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
    firstName: Yup.string().required(t("errorText.required")),
    lastName: Yup.string().required(t("errorText.required")),
    country: Yup.string().required(t("errorText.required")),
    dateOfBirth: Yup.date()
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        t("errorText.age")
      )
      .required(t("errorText.required")),
    phoneNumber: Yup.string().required(t("errorText.required")),
    email: Yup.string()
      .email(t("errorText.invalidEmail"))
      .required(t("errorText.required")),
    password: Yup.string()
      .required(t("errorText.required"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        t("errorText.password")
      ),
    confirmPassword: Yup.string()
      .required(t("errorText.required"))
      .oneOf([Yup.ref("password")], t("errorText.passwordsMatch")),
    acceptTerms: Yup.boolean().oneOf([true], t("errorText.acceptTermsText")),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      if (currentUser) {
        await dispatch(editUser(values));
      } else {
        await dispatch(registerUser(values));
      }
      setSubmitting(false);
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        navigate("/");
      }
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
          <div className="pb-3">
            <label htmlFor="country" className="form-label">
              {t("register.country")}
            </label>
            <Field
              as="select"
              name="country"
              component="select"
              className="form-select"
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
            <ErrorMessage name="country">
              {(errorMessage) => (
                <div className="text-danger">{t(errorMessage)}</div>
              )}
            </ErrorMessage>
          </div>
          <div className="pb-3">
            <label htmlFor="phoneNumber" className="form-label">
              {t("register.phoneNumber")}
            </label>
            <Field
              as={PhoneInput}
              country={"cy"}
              value={formik.values.phoneNumber}
              onChange={(value) => formik.setFieldValue("phoneNumber", value)}
            />
            <ErrorMessage name="phoneNumber">
              {(errorMessage) => (
                <div className="text-danger">{t(errorMessage)}</div>
              )}
            </ErrorMessage>
          </div>
          <div className="pb-3">
            <Field
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              className="checkbox form-check-input"
            />
            <label htmlFor="acceptTerms" className="checkbox-label px-2">
              <Link
                to="/terms"
                className="link-dark"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("register.acceptTerms")}
              </Link>
            </label>
            <ErrorMessage name="acceptTerms">
              {(errorMessage) => (
                <div className="text-danger">{t(errorMessage)}</div>
              )}
            </ErrorMessage>
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3"
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
