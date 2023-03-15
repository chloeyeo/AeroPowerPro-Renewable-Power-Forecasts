import React from "react";

const DateInputs = ({
  dates,
  setDates,
  getHistoricSolarReq,
  setHistoricData,
  getHistoricWindSpeedsReq,
  center,
  setShowHistoric,
}) => (
  <div className="m-2">
    <div>Start Date</div>
    <input
      type="date"
      value={dates.startDate}
      onChange={(event) =>
        setDates({ ...dates, startDate: event.target.value })
      }
      min="2021-06-31"
      max="2023-06-31"
    ></input>
    <div>End Date</div>
    <input
      type="date"
      value={dates.endDate}
      onChange={(event) => setDates({ ...dates, endDate: event.target.value })}
      min="2021-06-31"
      max="2023-06-31"
    ></input>
    <div>
      <button
        className="mt-2"
        onClick={() => {
          getHistoricSolarReq(setHistoricData, dates, center);
          setShowHistoric(true);
        }}
      >
        Historic Solar Energy
      </button>
      <button
        className="mt-2"
        onClick={() => {
          getHistoricWindSpeedsReq(setHistoricData, dates, center);
          setShowHistoric(true);
        }}
      >
        Historic Wind Speeds
      </button>
    </div>
  </div>
);

export default DateInputs;
