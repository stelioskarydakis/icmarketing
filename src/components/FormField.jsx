import React from "react";
import { ErrorMessage, Field } from "formik";

const FormField = ({ label, name, type }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field type={type} name={name} />
      <ErrorMessage name={name} component="div" />
    </div>
  );
};

export default FormField;
