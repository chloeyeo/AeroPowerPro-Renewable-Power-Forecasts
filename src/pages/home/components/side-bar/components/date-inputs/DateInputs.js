import React from "react";

const DateInputs = ({ dates, setDates, onClick }) => (
  <>
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
      <button onClick={onClick}>Submit</button>
    </div>
  </>
);

export default DateInputs;
