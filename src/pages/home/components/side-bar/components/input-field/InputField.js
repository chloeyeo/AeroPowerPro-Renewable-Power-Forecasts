import React from "react";
import Form from "react-bootstrap/Form";

const InputField = ({ title, defaultValue, maxVal, minVal, updateFunc }) => {
  return (
    <>
      <div className="mt-2 mb-2">
        {title} (from {minVal}
        {maxVal !== 1000000 && ` to ${maxVal}`})
      </div>

      <Form.Control
        placeholder={title}
        aria-label={title}
        aria-describedby="basic-addon2"
        defaultValue={defaultValue}
        onKeyDown={(event) => event.key === "Enter" && event.target.blur()}
        onBlur={(event) =>
          parseFloat(event.target.value) >= minVal &&
          parseFloat(event.target.value) <= maxVal
            ? updateFunc(event.target.value)
            : (event.target.value = "")
        }
      />
    </>
  );
};

InputField.defaultProps = {
  maxVal: 1000000,
};

export default InputField;
