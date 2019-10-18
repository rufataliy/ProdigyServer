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
    const { scheduleState, initialValuesGlobal, actions } = useContext(Context)
    useEffect(() => {
        (async () => {
            const events = await newClassForm.dbPath("classes", "get")();
            actions({
                type: "setScheduleState",
                payload: events
            })
        })()
    }
    )
    const calendarComponentRef = React.createRef();
    const toggleModal = () => {
        actions({
            type: "setState",
            payload: { ...scheduleState, modalVisibility: !scheduleState.modalVisibility }
        })
    }
    const renderModal = () => {
        if (scheduleState.modalVisibility) {
            return (
                <ModalComp //state={this.state.modal}
                    nonSubmit={cancel}
                    onSubmit={handleClick}
                    title="Create new class"
                >
                    <FormikForm
                        formType="newClass"
                        collectionName="classes"
                        method="add"
                    />
                </ModalComp>
            )
        }
    }
    const handleClick = () => {
        toggleModal()
    }
    const cancel = () => {
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
        actions({
            type: "setState",
            payload: {
                ...scheduleState, modalVisibility: !scheduleState.modalVisibility
            }
        })
    }
    return (
        <div >
            <FullCalendar dateClick={handleDateClick}
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
            {renderModal()}
        </div>
    )
}

export default Schedule