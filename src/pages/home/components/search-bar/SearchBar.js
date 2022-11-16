import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const SearchBar = ({ center, setCenter }) => {
  const [inputCoords, setInputCoords] = useState(center || "");
  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Longitude"
          aria-label="Longitude"
          aria-describedby="basic-addon2"
          value={inputCoords[0]}
          onChange={(event) =>
            setInputCoords([event.target.value, inputCoords[1]])
          }
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Latitude"
          aria-label="Latitude"
          aria-describedby="basic-addon2"
          value={inputCoords[1]}
          onChange={(event) =>
            setInputCoords([inputCoords[0], event.target.value])
          }
        />
      </InputGroup>
      <Button
        variant="outline-secondary"
        id="button-addon2"
        onClick={() =>
          setCenter([parseFloat(inputCoords[0]), parseFloat(inputCoords[1])])
        }
      >
        Search
      </Button>
    </>
  );
};

export default SearchBar;
