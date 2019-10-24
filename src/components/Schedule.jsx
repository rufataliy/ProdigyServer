import React, { useContext, useEffect } from "react"
import { newClassForm } from "./_newClassTmp.jsx"
import Context from "../store/context"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import ModalComp from "./Modal.jsx"
import './style/main.scss'
import { FormikForm } from "./form.jsx"
import moment from "moment"

const Schedule = () => {
    const { scheduleState,
        initialValuesGlobal,
        formConfig,
        actions } = useContext(Context)
    useEffect(() => {
        const getEvents = async () => {
            const props = {
                collectionName: "classes",
                method: "get"
            }
            const classes = await newClassForm.dbPath(props)();
            actions({
                type: "setScheduleState",
                payload: { ...scheduleState, events: classes }
            })
        }
        getEvents()
    }, []
    )
    const calendarComponentRef = React.createRef();
    const toggleModal = () => {
        actions({
            type: "setScheduleState",
            payload: { ...scheduleState, modalVisibility: !scheduleState.modalVisibility }
        })
    }
    const renderModal = () => {
        console.log(formConfig)
        return (
            <ModalComp
                nonSubmit={closeModal}
                onSubmit={closeModal}
                title={formConfig.title}
            >
                <FormikForm
                    formType={formConfig.formType}
                    collectionName={formConfig.collectionName}
                    docId={formConfig.docId}
                    method={formConfig.method}
                />
            </ModalComp>
        )
    }
    const handleEventHover = () => {
        console.log("event hovered");
    }
    const closeModal = () => {
        toggleModal()
    }

    const handleEventClick = (info) => {
        const { title, publicId } = info.event._def
        const { start } = info.event
        const { classType, level, origin } = info.event._def.extendedProps
        actions({
            type: "setInitialValues",
            payload: {
                ...initialValuesGlobal, newClass: {
                    ...initialValuesGlobal.newClass,
                    title: title,
                    classType: classType,
                    level: level,
                    origin: origin,
                    date: moment(start)
                }
            }
        })
        actions({
            type: "setFormConfig",
            payload: {
                ...formConfig,
                title: `Update ${title}`,
                collectionName: "classes",
                formType: "newClass",
                docId: publicId,
                method: "update"
            }
        })
        toggleModal()
    }
    const handleDateClick = (arg) => {
        actions({
            type: "setFormConfig",
            payload: {
                ...formConfig,
                title: `Create new class`,
                collectionName: "classes",
                formType: "newClass",
                docId: "",
                method: "add"
            }
        })
        actions({
            type: "setInitialValues",
            payload: {
                ...initialValuesGlobal, newClass: {
                    title: "",
                    time: {},
                    level: "",
                    origin: "",
                    classType: "Not Selected",
                    date: moment(arg.dateStr)
                }
            }
        })
        toggleModal()
    }
    return (
        <div >
            <FullCalendar
                eventMouseEnter={handleEventHover}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
                defaultView="dayGridMonth"
                plugins={
                    [
                        dayGridPlugin,
                        listPlugin,
                        interactionPlugin,
                        timeGridPlugin
                    ]
                }
                header={
                    {
                        left: 'prev,next today',
                        center: 'Schedulee',
                        right: 'dayGridMonth,listWeek,timeGridWeek'
                    }
                }
                events={scheduleState.events}
                ref={calendarComponentRef}
            />
            {scheduleState.modalVisibility && renderModal()}
        </div>
    )
}

export default Schedule