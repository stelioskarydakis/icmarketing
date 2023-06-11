import React from "react";
import { Field, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";

function Input(props) {
  const { label, name, ...rest } = props;
  const { t } = useTranslation();

  return (
    <div className="pb-3">
      <label htmlFor={name} className="form-label">
        {t(label)}
      </label>
      <Field id={name} name={name} {...rest} className="form-control" />
      <ErrorMessage name={name}>
        {(errorMessage) => <div className="text-danger">{t(errorMessage)}</div>}
      </ErrorMessage>
    </div>
  );
}

export default Input;
