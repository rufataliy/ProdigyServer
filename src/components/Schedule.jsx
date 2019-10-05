import React, { useContext, useState } from "react"
import Context from "../store/context"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import ModalComp from "./Modal.jsx"
import { db } from "../firebase/firebase"
import './style/main.scss'
import { FormikForm } from "./form.jsx"

const Schedule = () => {
    const { state, actions } = useContext(Context)
    const calendarComponentRef = React.createRef();

    // state = {
    //     modal: false,
    //     calendarWeekends: true,
    //     arg: "",
    //     events: null
    // };

    const toggleModal = () => {
        // this.setState({ modal: !this.state.modal })
        actions({
            type: "setState",
            payload: { ...state, modalVisibility: !state.modalVisibility }
        })

    }
    const renderModal = () => {
        if (state.modalVisibility) {
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
        //db.collection("classes/class").set({ name: "test class", level: "advanced" });
        // console.log(firebaseClient.getCurrentUser());
        // console.log(auth0Client.getIdToken());
    }
    const cancel = () => {
        toggleModal()
    }
    const handleDateClick = (arg) => {
        console.log(arg);
        actions({
            type: "setState",
            payload: {
                ...state, calendarArgs: arg,
                modalVisibility: !state.modalVisibility
            }
        })
        console.log(state);

        // this.setState({calendarEvents:[...this.state.calendarEvents, {title:title,start: arg.date}]})
        //this.setState({ modal: !this.state.modal, arg })
    }

    let modal = renderModal()
    return (
        <div >
            <FullCalendar dateClick={handleDateClick}
                defaultView="dayGridMonth"
                plugins={
                    [dayGridPlugin,
                        listPlugin,
                        interactionPlugin,
                        timeGridPlugin]
                }
                header={
                    {
                        left: 'prev,next today',
                        center: 'Schedulee',
                        right: 'dayGridMonth,listWeek,timeGridWeek'
                    }
                }
                events={null}
                ref={calendarComponentRef}
            />
            {modal}
        </div>
    )
}

export default Schedule