import React, { useState, useRef } from "react";
import TimeKeeper from "react-timekeeper";
import Icon from "../views/_Icon.jsx";

export const TimePicker = props => {
  const initialTime = new Date(props.initialTime);

  const defaultTime = {
    hour: initialTime.getHours(),
    minute: initialTime.getMinutes()
  };

  const [time, setTime] = useState(defaultTime);
  const [visible, setVisible] = useState(false);

  const handleChange = ({ hour, minute }) => {
    setTime({ ...time, hour, minute });
  };
  const handleDoneClick = ({ hour, minute, formatted24 }) => {
    setTime({ ...time, hour, minute });
    initialTime.setHours(hour, minute);
    props.pathValueToFormik(props.fieldName, new Date(initialTime));
    props.pathValueToFormik(props.recurrField, formatted24);
    setVisible(!visible);
  };
  return (
    <div className="timePickerWrapper">
      {visible && (
        <TimeKeeper
          hour24Mode
          closeOnMinuteSelect
          onChange={newTime => handleChange(newTime)}
          onDoneClick={newTime => handleDoneClick(newTime)}
          switchToMinuteOnHourSelect
          time={time}
        />
      )}
      <span className="timeDisplay" onClick={() => setVisible(!visible)}>
        {`${time.hour}:${time.minute}`} <Icon name="far ml-2 fa-clock" />
      </span>
    </div>
  );
};
