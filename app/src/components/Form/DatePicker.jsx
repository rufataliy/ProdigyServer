import React, { useState, useRef } from "react";
import { Form } from "react-bootstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import { formatDate, parseDate } from "react-day-picker/moment";

export const DatePicker = (props) => {
  const { setFieldValue, fieldName, initialDate } = props;
  const [selectedDate, setSelectedDate] = useState(new Date(initialDate));
  const datePickerRef = useRef();

  const handleChange = (date) => {
    setSelectedDate(date);
    setFieldValue(fieldName, date, false);
  };

  return (
    <Form.Group>
      <DayPickerInput
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
