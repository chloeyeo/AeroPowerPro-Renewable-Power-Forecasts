import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

const InputField = ({ title, value, maxVal, minVal, updateFunc }) => {
  // using separate input for each input field
  // in order to avoid the map (DOM) refreshing
  // on every keyboard change.
  const [input, setInput] = useState(value);

  useEffect(() => {
    setInput(value);
    updateFunc(value);
  }, [value]);

  return (
    <>
      <div className="mt-2 mb-2">
        {title} (from {minVal}
        {maxVal !== 1000000 && ` to ${maxVal}`})
      </div>

      <Form.Control
        placeholder={title}
        aria-label={title}
        value={input}
        aria-describedby="basic-addon2"
        onChange={(event) => setInput(event.target.value)}
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
