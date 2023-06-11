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

  // Check if the user is logged in so we are in edit mode
  const currentUser = useSelector((state) => state.users.user);

  // Prefill the form with the user's data if we are in edit mode
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

  // Validation schema from Yup for all the fields
  // all fields are required
  // dateOfBirth must be at least 18 years ago
  // password must contain at least one uppercase letter, one lowercase letter, one number and one special character and be 8 characters long
  // confirmPassword must match password
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

  // Submit handler for the form
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      // Check if user is logged in so we dispatch the correct action
      if (currentUser) {
        await dispatch(editUser(values));
      } else {
        await dispatch(registerUser(values));
      }
      // we set the submitting to false so the form is not disabled anymore
      setSubmitting(false);

      // we check if the user is correctly registered or updated and if so we redirect him to the home page
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

          {/* user is not allowed to update email so we need to check if he is logged in */}
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

          {/* Use of the react-select-country-list package to get the list of countries */}
          <div className="pb-3">
            <label htmlFor="country" className="form-label">
              {t("register.country")}
            </label>
            <Field
              as="select"
              name="country"
              id="country"
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

          {/* Use of the react-phone-input-2 package to get the phone code with default to cy 357 */}
          <div className="pb-3">
            <label htmlFor="phoneNumber" className="form-label">
              {t("register.phoneNumber")}
            </label>
            <Field
              as={PhoneInput}
              country={"cy"}
              id="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={(value) => formik.setFieldValue("phoneNumber", value)}
            />
            <ErrorMessage name="phoneNumber">
              {(errorMessage) => (
                <div className="text-danger">{t(errorMessage)}</div>
              )}
            </ErrorMessage>
          </div>

          {/* Checkbox for the terms and conditions and link to terms page */}
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
