import React from "react";
import Button from "react-bootstrap/Button";
import { InputField } from "./components";

const InputsAndSubmit = ({ inputFieldProps, onSubmit }) => (
  <div className="p-2">
    {inputFieldProps.map((props) => (
      <InputField {...props} />
    ))}

    <Button
      variant="outline-secondary"
      className="button-addon2 mt-2"
      onClick={onSubmit}
    >
      Submit
    </Button>
  </div>
);

export default InputsAndSubmit;
