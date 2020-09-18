import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { getKlass } from "../../utils/defaultAPIConfig";
import api from "../../api/api.js";
import Loading from "../../views/_Loading.jsx";
import deepClone from "lodash/cloneDeep";
import { useCreate, useEdit } from "../../customHooks/";
import { useRouteMatch } from "react-router-dom";
import {
  useScheduleState,
  useUpdateComponent,
} from "../../store/useGlobalState";

const Schedule = () => {
  const [create] = useCreate("klasses");
  const [edit] = useEdit("klasses");
  const [fetching, setFetching] = useState(false);
  const { url } = useRouteMatch();
  const [compUpdate] = useUpdateComponent();
  const [scheduleState, setScheduleState] = useScheduleState();

  useEffect(() => {
    setFetching(true);
    api({ ...getKlass, endpoint: url })
      .then((events) => {
        events.map((event) => {
          if (event.daysOfWeek && event.daysOfWeek.length == 0) {
            delete event.daysOfWeek;
            delete event.startTime;
            delete event.endTime;
          }
        });
        setScheduleState({ scheduleState, events });
        setFetching(false);
      })
      .catch((err) => {
        setFetching(false);
      });
  }, [compUpdate]);

  const calendarComponentRef = React.createRef();

  const handleEventClick = (info) => {
    const { _id } = info.event.extendedProps;
    const selectedEvent = scheduleState.events.find(
      (event) => event._id === _id
    );
    const event = deepClone(selectedEvent);
    edit({
      ...event,
      daysOfWeek: event.daysOfWeek ? event.daysOfWeek : [],
    });
  };
  const handleDateClick = (arg) => {
    create({ extraValues: { start: arg.date, end: arg.date } });
  };

  return (
    <div className="calendarParent">
      {!fetching ? (
        <FullCalendar
          height={600}
          contentHeight={"auto"}
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
          ref={calendarComponentRef}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Schedule;
