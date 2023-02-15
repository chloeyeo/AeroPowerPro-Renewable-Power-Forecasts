import React from "react";
import Form from "react-bootstrap/Form";

const PowerCurveTable = ({ powerCurveData, setPowerCurveData }) => (
  <div className="p-2 table-wrapper">
    <table className="p-3">
      <thead>
        <tr>
          <td>Wind Speed (m/s)</td>
          <td>Power (kW)</td>
        </tr>
      </thead>
      <tbody>
        {powerCurveData.tableData.map((row, index) => (
          <tr key={index}>
            <td>
              <Form.Control
                aria-label={`row${index}_speed`}
                style={{ maxWidth: "90px" }}
                value={row[0]}
                onChange={(event) => {
                  let newTableData = powerCurveData.tableData.slice();
                  newTableData[index] = [event.target.value, row[1]];
                  return setPowerCurveData({
                    ...powerCurveData,
                    tableData: newTableData,
                  });
                }}
              />
            </td>
            <td>
              <Form.Control
                aria-label={`row${index}_power`}
                style={{ maxWidth: "60px" }}
                value={row[1]}
                onChange={(event) => {
                  let newTableData = powerCurveData.tableData.slice();
                  newTableData[index] = [row[0], event.target.value];
                  return setPowerCurveData({
                    ...powerCurveData,
                    tableData: newTableData,
                  });
                }}
              />
            </td>
            <td>
              <button
                style={{ border: "none" }}
                onClick={() => {
                  let newTableData = powerCurveData.tableData.slice();
                  newTableData.splice(index, 1);
                  return setPowerCurveData({
                    ...powerCurveData,
                    tableData: newTableData,
                  });
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tr>
        <button
          style={{ border: "none" }}
          onClick={() =>
            setPowerCurveData({
              ...powerCurveData,
              tableData: [...powerCurveData.tableData, ["0", "0"]],
            })
          }
        >
          Add Row
        </button>
      </tr>
    </table>
  </div>
);

export default PowerCurveTable;
