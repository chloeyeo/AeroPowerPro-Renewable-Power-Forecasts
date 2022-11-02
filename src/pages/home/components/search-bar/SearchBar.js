import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const SearchBar = () => (
  <>
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Location"
        aria-label="Location"
        aria-describedby="basic-addon2"
      />
      <Button variant="outline-secondary" id="button-addon2">
        Search
      </Button>
    </InputGroup>
  </>
);

export default SearchBar;
