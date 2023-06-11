import React from "react";
import { ErrorMessage, Field } from "formik";
import CountryList from "react-select-country-list";

const CountrySelect = ({ name }) => {
  return (
    <div>
      <label htmlFor={name}>Country</label>
      <Field
        as="select"
        name={name}
        component="select"
        options={CountryList().getData()}
      >
        <option value="">Select Country</option>
        {CountryList()
          .getData()
          .map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
      </Field>
      <ErrorMessage name={name} component="div" />
    </div>
  );
};

export default CountrySelect;
