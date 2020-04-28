import React, { useContext, useEffect, useState } from "react";
import Context from "../store/context";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./style/main.scss";
import "./style/tooltip.scss";
import { StateHandler } from "./StateHandler.jsx";
import { SCHEDULE } from "../store/useGlobalState";
import { newClass } from "../utils/defaultInitialValues";
import { createKlass, editKlass, getKlass } from "../utils/defaultAPIConfig";
import api from "../api/api.js";
import Loading from "../views/_Loading.jsx";
const Schedule = ({ setAction }) => {
  const [fetching, setFetching] = useState(false);
  console.log("schedule rendered");
  const { scheduleState, compUpdate } = useContext(Context);

  useEffect(() => {
    setFetching(true);
    api(getKlass)
      .then((events) => {
        events.map((event) => {
          if (event.daysOfWeek && event.daysOfWeek.length == 0) {
            delete event.daysOfWeek;
            delete event.startTime;
            delete event.endTime;
          }
        });
        setAction({ payload: events, actionNames: [SCHEDULE] });
        setFetching(false);
      })
      .catch((err) => {
        console.log(err);
        setFetching(false);
      });
  }, [compUpdate]);
  const calendarComponentRef = React.createRef();

  const handleEventClick = (info) => {
    const { _id } = info.event.extendedProps;
    const selectedEvent = scheduleState.events.find(
      (event) => event._id === _id
    );
    setAction({
      config: { ...editKlass, params: _id, title: event.title },
      payload: {
        ...selectedEvent,
        daysOfWeek: event.daysOfWeek ? event.daysOfWeek : [],
      },
      actionNames: ["setFormConfig", "setInitialState", "toggleModal"],
    });
  };
  const handleDateClick = (arg) => {
    setAction({
      config: createKlass,
      payload: { ...newClass, start: arg.date, end: arg.date },
      actionNames: ["setFormConfig", "setInitialState", "toggleModal"],
    });
  };

  return (
    <div className="calendarParent">
      <h3 className="text-primary">Schedule</h3>
      {!fetching ? (
        <FullCalendar
          aspectRatio={2.5}
          // eventMouseEnter={showTooltip}
          // eventMouseLeave={hideTooltip}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          defaultView="dayGridMonth"
          fixedWeekCount={false}
          plugins={[
            dayGridPlugin,
            listPlugin,
            interactionPlugin,
            timeGridPlugin,
          ]}
          header={{
            left: "prev,next today",
            center: "Schedulee",
            right: "dayGridMonth,listWeek,timeGridWeek",
          }}
          events={scheduleState.events}
          // eventRender={showTooltip}
          ref={calendarComponentRef}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default StateHandler(Schedule);
