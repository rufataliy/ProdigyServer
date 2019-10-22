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
import { Popover } from "antd"
import moment from "moment"

const Schedule = () => {
    let modalConfig = {
        title: "Create new class",
        classType: "",
        level: "",
        origin: "",
        collectionName: "classes",
        formType: "newClass",
        docId: "",
        method: "add"
    };
    const { scheduleState, initialValuesGlobal, actions } = useContext(Context)
    useEffect(() => {
        const getEvents = async () => {
            const classes = await newClassForm.dbPath("classes", "get")();
            actions({
                type: "setScheduleState",
                payload: { ...scheduleState, events: classes }
            })
            console.log(classes);
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
        return (
            <ModalComp
                nonSubmit={closeModal}
                onSubmit={closeModal}
                title={modalConfig.title}
            >
                <FormikForm
                    formType={modalConfig.formType}
                    collectionName={modalConfig.collectionName}
                    docId={modalConfig.id}
                    method={modalConfig.method}
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
        console.log(info);

        const { title, publicId } = info.event._def
        const { start } = info.event
        const { classType, level, origin } = info.event._def.extendedProps
        console.log(start);

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
        modalConfig = {
            title: title,
            classType: classType,
            level: level,
            origin: origin,
            collectionName: "",
            formType: "newClass",
            docId: publicId,
            method: "update"
        }
        toggleModal()
    }
    const handleDateClick = (arg) => {
        actions({
            type: "setInitialValues",
            payload: {
                ...initialValuesGlobal, newClass: {
                    ...initialValuesGlobal.newClass,
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