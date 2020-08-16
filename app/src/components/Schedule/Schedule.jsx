import React, { useContext, useEffect, useState } from "react";
import Context from "../../store/context";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "../style/main.scss";
import "../style/tooltip.scss";
import { SCHEDULE } from "../../store/useGlobalState";
import { getKlass } from "../../utils/defaultAPIConfig";
import api from "../../api/api.js";
import Loading from "../../views/_Loading.jsx";
import _ from "lodash";
import { useDelete, useCreate, useEdit } from "../../customHooks/";
import { useRouteMatch } from "react-router-dom";

const Schedule = () => {
	const [remove] = useDelete("klasses");
	const [create] = useCreate("klasses");
	const [edit] = useEdit("klasses");
	const [fetching, setFetching] = useState(false);
	const { scheduleState, actions, compUpdate } = useContext(Context);
	const { url } = useRouteMatch();

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
				actions({
					type: SCHEDULE,
					payload: { ...scheduleState, events },
				});
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
		const event = _.cloneDeep(selectedEvent);
		edit({
			...event,
			daysOfWeek: event.daysOfWeek ? event.daysOfWeek : [],
		});
	};
	const handleDateClick = (arg) => {
		create({ extraValues: { start: arg.date, end: arg.date } });
	};

	return (
		<>
			<h3 className="text-primary">Schedule</h3>
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
						// eventRender={showTooltip}
						ref={calendarComponentRef}
					/>
				) : (
					<Loading />
				)}
			</div>
		</>
	);
};

export default Schedule;
