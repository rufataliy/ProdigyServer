import React, { useState, useRef } from "react";
import TimeKeeper from "react-timekeeper";
import Icon from "../../views/_Icon.jsx";

export const TimePicker = (props) => {
  const {
    setFieldValue,
    fieldName,
    initialValue,
    readOnly,
    recurrField,
  } = props;
  const initialTime = new Date(initialValue);

  const defaultTime = {
    hour: initialTime.getHours(),
    minute: initialTime.getMinutes(),
  };

  const [time, setTime] = useState(defaultTime);
  const [visible, setVisible] = useState(false);

  const handleChange = ({ hour, minute }) => {
    setTime({ ...time, hour, minute });
  };
  const handleDoneClick = ({ hour, minute, formatted24 }) => {
    setTime({ ...time, hour, minute });
    initialTime.setHours(hour, minute);
    setFieldValue(fieldName, new Date(initialTime));
    setFieldValue(recurrField, formatted24);
    setVisible(!visible);
  };
  return (
    <div className="timePickerWrapper">
      {readOnly && <div className="readonly-wrapper"></div>}
      {visible && (
        <TimeKeeper
          hour24Mode
          closeOnMinuteSelect
          onChange={(newTime) => handleChange(newTime)}
          onDoneClick={(newTime) => handleDoneClick(newTime)}
          switchToMinuteOnHourSelect
          time={time}
        />
      )}
      <span
        className="timeDisplay align-items-center d-flex justify-content-between"
        onClick={() => setVisible(!visible)}
      >
        <span>{`${time.hour > 0 ? time.hour : "00"}:${
          time.minute > 0 ? time.minute : "00"
        }`}</span>{" "}
        <Icon className="far ml-2 fa-clock" />
      </span>
    </div>
  );
};
