import React, { useState, useRef } from "react";
import { Form } from "react-bootstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";
import "react-day-picker/lib/style.css";

export const DatePicker = (props) => {
  const { setFieldValue, fieldName, initialDate, readOnly } = props;
  const [selectedDate, setSelectedDate] = useState(new Date(initialDate));
  const datePickerRef = useRef();

  const handleChange = (date) => {
    setSelectedDate(date);
    setFieldValue(fieldName, date, false);
  };

  return (
    <Form.Group className="position-relative">
      {readOnly && <div className="readonly-wrapper"></div>}
      <DayPickerInput
        inputProps={{ readOnly: readOnly, tabIndex: readOnly && -1 }}
        readOnly={true}
        format="LL"
        ref={datePickerRef}
        value={selectedDate}
        formatDate={formatDate}
        parseDate={parseDate}
        onDayChange={handleChange}
      />
    </Form.Group>
  );
};
