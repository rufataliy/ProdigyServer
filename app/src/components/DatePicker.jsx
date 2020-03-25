import React, { useState, useRef } from "react";
import moment from "moment";
import Helmet from "react-helmet";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import { formatDate, parseDate } from "react-day-picker/moment";

export const DatePicker = props => {
  const initialState = { from: new Date(props.start), to: new Date(props.end) };
  const [state, setState] = useState(initialState);
  const { from, to } = state;
  const toPicker = useRef();
  const showFromMonth = () => {
    const { from, to } = state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), "months") < 2) {
      toPicker.current.getDayPicker().showMonth(from);
    }
  };

  const handleFromChange = from => {
    // Change the from date and focus the "to" input field
    setState({ ...state, from });
    props.pathValueToFormik("start", state.from, false);
  };

  const handleToChange = to => {
    setState({ ...state, to });
    showFromMonth();
    props.pathValueToFormik("end", state.to, false);
  };

  const modifiers = { start: from, end: to };

  return (
    <div className="InputFromTo">
      <DayPickerInput
        value={from}
        placeholder="From"
        format="LL"
        formatDate={formatDate}
        parseDate={parseDate}
        dayPickerProps={{
          selectedDays: [from, { from, to }],
          disabledDays: { after: to },
          toMonth: to,
          modifiers,
          numberOfMonths: 1,
          onDayClick: () => {
            return toPicker.current.input.focus();
          }
        }}
        onDayChange={handleFromChange}
      />
      <span className="InputFromTo-to">
        <DayPickerInput
          ref={el => (toPicker.current = el)}
          value={to}
          placeholder="To"
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { before: from },
            modifiers,
            month: from,
            fromMonth: from,
            numberOfMonths: 1
          }}
          onDayChange={handleToChange}
        />
      </span>
      <Helmet>
        <style>{`
  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 550px;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: -198px;
  }
`}</style>
      </Helmet>
    </div>
  );
};
