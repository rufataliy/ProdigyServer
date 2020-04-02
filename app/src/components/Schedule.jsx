import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Context from "../store/context";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./style/main.scss";
import "./style/tooltip.scss";
import { StateHandler } from "./StateHandler.jsx";
import { FormikForm } from "./form.jsx";
import Tooltip from "./tooltip.jsx";
import { SCHEDULE } from "../store/useGlobalState";
import Modal from "./Modal.jsx";
import { newClass } from "../utils/defaultInitialValues";
import { createKlass, editKlass, getKlass } from "../utils/defaultAPIConfig";
import api from "../api/api.js";
const Schedule = props => {
  const { setAction } = props;
  const [fetching, setFetching] = useState(false);
  console.log("schedule rendered");

  const { scheduleState, tooltipState, compUpdate, actions } = useContext(
    Context
  );

  useEffect(() => {
    setFetching(true);
    api(getKlass).then(events => {
      events.map(event => {
        if (event.daysOfWeek && event.daysOfWeek.length == 0) {
          delete event.daysOfWeek;
          delete event.startTime;
          delete event.endTime;
        }
      });
      setAction({ payload: events, actionNames: [SCHEDULE] });
      setFetching(false);
    });
  }, [compUpdate]);
  const calendarComponentRef = React.createRef();

  const toggleTooltip = () => {
    actions({
      type: "setTooltipState",
      payload: { ...tooltipState, show: !tooltipState.show }
    });
  };
  const showTooltip = info => {
    const a = document.querySelector(".tooltip");
    const rect = info.el.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const { title, publicId } = info.event._def;
    const { start } = info.event;
    const { classType, level, origin } = info.event._def.extendedProps;
    a.innerHTML = `<div>
            <h3>${title}</h3>
            <p>${origin}</p>
            <p>${level}</p>
        </div>`;
    a.style.width = `${rect.width}` + `px`;
    a.style.display = "block";
    a.style.position = "absolute";
    a.style.top = `${rect.top + scrollTop - 70}px`;
    a.style.left = `${rect.left}px`;
  };
  const hideTooltip = info => {
    const a = document.querySelector(".tooltip");
    a.style.display = "none";
  };
  const handleEventClick = info => {
    const { _id } = info.event.extendedProps;
    scheduleState.events.forEach(event => {
      if (event._id == _id) {
        props.setAction({
          config: { ...editKlass, params: _id, title: event.title },
          payload: {
            ...event,
            daysOfWeek: event.daysOfWeek ? event.daysOfWeek : []
          },
          actionNames: ["setFormConfig", "setInitialState", "toggleModal"]
        });
      }
    });
  };
  const handleDateClick = arg => {
    props.setAction({
      config: createKlass,
      payload: { ...newClass, start: arg.date, end: arg.date },
      actionNames: ["setFormConfig", "setInitialState", "toggleModal"]
    });
  };

  return (
    <div className="calendarParent">
      <Modal>
        <FormikForm />
      </Modal>
      {!fetching ? (
        <FullCalendar
          contentHeight={600}
          height={600}
          eventMouseEnter={showTooltip}
          eventMouseLeave={hideTooltip}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          defaultView="dayGridMonth"
          plugins={[
            dayGridPlugin,
            listPlugin,
            interactionPlugin,
            timeGridPlugin
          ]}
          header={{
            left: "prev,next today",
            center: "Schedulee",
            right: "dayGridMonth,listWeek,timeGridWeek"
          }}
          events={scheduleState.events}
          eventRender={showTooltip}
          ref={calendarComponentRef}
        />
      ) : (
        <Spinner animation="border" variant="secondary" />
      )}
      <Tooltip>{tooltipState.show && showTooltip()}</Tooltip>
    </div>
  );
};

export default StateHandler(Schedule);
