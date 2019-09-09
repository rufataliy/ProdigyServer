import React from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import ModalComp from "./Modal"
import api from "../api/api.js"
import {firebaseClient, db} from "../firebase/firebase"
import {auth0Client} from "../auth0/auth0"
import './style/main.scss'

class Schedule extends React.Component {

    
    calendarComponentRef = React.createRef();

    state = {
              modal:false,
              calendarWeekends: true,
              arg:"",
              events:null
    };
  
    componentDidMount(){
      // (async () => {
      //   api.get("/events").then((response)=>{
      //     console.log(response.data);
      //       return response.data
      //   }).then((events)=>{
      //     this.setState({events})
      //   })
      // })()
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
      auth0Client.handleCallback()

      this.toggleModal() 
      db.doc("cities/test").set({test:"test2"})
      console.log(firebaseClient.getCurrentUser());
      console.log(auth0Client.getProfile());
      
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
            defaultView="dayGridMonth" 
            plugins={[ dayGridPlugin, listPlugin, interactionPlugin,timeGridPlugin]}
            header={{
                    left: 'prev,next today',
                    center: 'Schedulee',
                    right: 'dayGridMonth,listWeek,timeGridWeek'
            }}
            events = {this.state.events}
            ref = {this.calendarComponentRef}
           />

           {modal}
        </div>
      )
    }
  }

export default Schedule