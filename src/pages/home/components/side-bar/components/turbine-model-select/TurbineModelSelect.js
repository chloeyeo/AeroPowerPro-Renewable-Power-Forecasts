import React from "react";

const TurbineModelSelect = ({
  powerCurveData,
  setPowerCurveData,
  turbineModels,
}) => (
  <div className="p-2">
    <h5>Wind Turbine Model</h5>
    <select
      onChange={(event) =>
        setPowerCurveData({
          ...powerCurveData,
          turbineModel: event.target.value,
          tableData: turbineModels[event.target.value].power_curve,
        })
      }
      name="turbineModels"
      id="turbineModels"
    >
      <option value="" selected disabled hidden>
        {turbineModels &&
        Object.keys(turbineModels).length === 0 &&
        Object.getPrototypeOf(turbineModels) === Object.prototype
          ? "Turbines loading..."
          : "Choose here"}
      </option>
      {Object.keys(turbineModels).map((turbineModel) => (
        <option
          key={turbineModel}
          selected={turbineModel === powerCurveData.turbineModel}
          value={turbineModel}
        >
          {turbineModel}
        </option>
      ))}
    </select>
  </div>
);

export default TurbineModelSelect;
