import React from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import ModalComp from "./Modal"
import api from "../api/api.js"
import './style/main.scss'


class Schedule extends React.Component {
    constructor (props){
      super(props)
      this.calendarComponentRef = React.createRef();
      this.state = {
        modal:false,
        calendarWeekends: true,
        arg:"",
        calendarEvents: [
          // initial event data
          { title: "Event Now", start: new Date() },
          { title: "Another Class", start: new Date() },
          { title: "Intermediate", start: new Date() },
          { title: "Event Now", start: new Date(), level:"intermediate" }

        ]
      };

    }
    toggleModal = ()=>{
      this.setState({modal:!this.state.modal})
    }
    renderModal = ()=>{
      if(this.state.modal){
        return (
          <ModalComp 
          state={this.state.modal} 
          nonSubmit={this.cancel} 
          onSubmit={this.handleClick}
          />
        )
    }
  }
    handleClick=()=>{
      this.toggleModal()
      api.post("/events",{title:this.state.arg.date})
      console.log("modal Clicked ok schedule");
      
    }
    cancel = ()=>{
      this.toggleModal()
      console.log("cancel clicked Schedule");
      
    }
    handleDateClick=(arg)=>{
     console.log("clicked");
     
      // this.setState({calendarEvents:[...this.state.calendarEvents, {title:title,start: arg.date}]})
      this.setState({modal:!this.state.modal,arg})      
    }

    render() {
      let modal = this.renderModal()
      return (
        <div>
          <FullCalendar 
            dateClick = {this.handleDateClick}
            defaultView="listWeek" 
            plugins={[ dayGridPlugin, listPlugin, interactionPlugin,timeGridPlugin]}
            header={{
                    left: 'prev,next today',
                    center: 'Schedulee',
                    right: 'dayGridMonth,listWeek,timeGridWeek'
            }}
            events = {this.state.calendarEvents}
            ref = {this.calendarComponentRef}
           />

           {modal}
        </div>
      )
    }
  }

export default Schedule