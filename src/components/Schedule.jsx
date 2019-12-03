import React, { useContext, useEffect, createRef, useLayoutEffect } from "react"

import { newClassForm } from "./_newClassTmp.jsx"
import Context from "../store/context"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import ModalComp from "./Modal.jsx"
import './style/main.scss'
import "./style/tooltip.scss"
import { FormikForm } from "./form.jsx"
import moment from "moment"
import Tooltip from "./tooltip.jsx"
import { SCHEDULE, MODAL, INITIAL_VALUES, FORM_CONFIG } from "../store/useGlobalState"

const Schedule = () => {
    console.log("schedule rendered");
    const { modalState,
        scheduleState,
        initialValues,
        formConfig,
        tooltipState,
        actions } = useContext(Context)
    useEffect(() => {
        const getEvents = async () => {
            const props = {
                collectionName: "classes",
                method: "get"
            }
            const classes = await newClassForm.dbPath(props)();
            actions({
                type: SCHEDULE,
                payload: { ...scheduleState, events: classes }
            })
        }
        getEvents()
    }, [scheduleState.scheduleUpdate]
    )
    const calendarComponentRef = React.createRef();
    const toggleModal = () => {
        actions({
            type: MODAL,
            payload: { ...modalState, modalVisibility: !modalState.modalVisibility }
        })
    }
    const renderModal = () => {
        return (
            <ModalComp
                isVisible={modalState.modalVisibility}
                nonSubmit={toggleModal}
                onSubmit={toggleModal}
                title={formConfig.title}
            >
                <FormikForm
                    formType={formConfig.formType}
                    collectionName={formConfig.collectionName}
                    docId={formConfig.docId}
                    method={formConfig.method}
                    handleDelete={handleDelete}
                />
            </ModalComp>
        )
    }
    const handleDelete = () => {
        newClassForm.dbPath({ ...formConfig, method: "delete" })().then(() => {
            actions({
                type: SCHEDULE,
                payload: {
                    ...scheduleState,
                    scheduleUpdate: !scheduleState.scheduleUpdate
                }
            })
            toggleModal()
        })
    }
    const toggleTooltip = () => {
        actions({
            type: "setTooltipState",
            payload: { ...tooltipState, show: !tooltipState.show }
        })
    }
    const showTooltip = (info) => {
        const a = document.querySelector(".tooltip")
        const rect = info.el.getBoundingClientRect()
        console.log(rect);
        const scrollTop = window.scrollY
        const { title, publicId } = info.event._def
        const { start } = info.event
        const { classType, level, origin } = info.event._def.extendedProps
        a.innerHTML = `<div>
            <h3>${title}</h3>
            <p>${origin}</p>
            <p>${level}</p>
        </div>`
        a.style.width = `${rect.width}` + `px`
        a.style.display = "block"
        a.style.position = "absolute"
        a.style.top = `${rect.top + scrollTop - 70}px`
        a.style.left = `${rect.left}px`
    }
    const hideTooltip = (info) => {
        const a = document.querySelector(".tooltip")
        a.style.display = "none"
    }
    const handleEventClick = (info) => {
        console.log(info);
        const { title, publicId } = info.event._def
        const { start } = info.event
        const { classType, level, origin } = info.event._def.extendedProps
        scheduleState.events.forEach(event => {
            if (event.id == publicId) {
                actions({
                    type: INITIAL_VALUES,
                    payload: {
                        ...initialValues, newClass: {
                            ...event,
                            date: moment(event.date),
                            start: moment(event.start),
                            end: moment(event.end)
                        }
                    }
                })
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
            type: FORM_CONFIG,
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
            type: INITIAL_VALUES,
            payload: {
                ...initialValues, newClass: {
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

    // const showTooltip = (info) => {
    //     const { title, publicId } = info.event._def
    //     const { start } = info.event
    //     const { classType, level, origin } = info.event._def.extendedProps
    //     const tooltip = new Tooltip(info.el, {
    //         title: `<h1>${title}</h1>
    //             <h2>Class type: ${classType}</h2>
    //             <h2>Level: ${level}</h2>
    //             <h2>Origin: ${origin}</h2>`,
    //         placement: "top-end",
    //         container: "body",
    //         trigger: 'hover',
    //         html: true
    //     })
    // }
    return (
        <div className="calendarParent">
            <FullCalendar
                contentHeight={600}
                height={600}
                eventMouseEnter={showTooltip}
                eventMouseLeave={hideTooltip}
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
                //eventRender={showTooltip}
                ref={calendarComponentRef}
            />
            {modalState.modalVisibility && renderModal()}
            <Tooltip>
                {tooltipState.show && showTooltip()}
            </Tooltip>
        </div>
    )
}

export default Schedule