import React, { useState, useRef } from "react";
import { CFormGroup } from "@coreui/react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { parseDate } from "react-day-picker/moment";
import "react-day-picker/lib/style.css";
import Icon from "../../views/_Icon.jsx";

export const DatePicker = (props) => {
  const { setFieldValue, fieldName, initialDate, readOnly } = props;
  const [selectedDate, setSelectedDate] = useState(new Date(initialDate));
  const datePickerRef = useRef();

  const handleChange = (date) => {
    setSelectedDate(date);
    setFieldValue(fieldName, date, false);
  };

  return (
    <CFormGroup className="position-relative date-picker-wrapper">
      {readOnly && <div className="readonly-wrapper"></div>}
      <DayPickerInput
        inputProps={{ readOnly: readOnly, tabIndex: readOnly ? -1 : 0 }}
        readOnly={true}
        format="LL"
        ref={datePickerRef}
        value={selectedDate}
        parseDate={parseDate}
        onDayChange={handleChange}
      />
      <Icon className="far fa-calendar-alt position-absolute" />
    </CFormGroup>
  );
};
