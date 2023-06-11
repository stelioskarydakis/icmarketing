import React from "react";
import { Field, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";

function Input(props) {
  const { label, name, ...rest } = props;
  const { t } = useTranslation();

  return (
    <div className="form-control">
      <label htmlFor={name}>{t(label)}</label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage component="div" name={name} />
    </div>
  );
}

export default Input;
