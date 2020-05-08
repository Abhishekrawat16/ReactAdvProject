import React from 'react';
import { Component } from "react";
import ShowTasks from './ShowTasks';

class PendingTask extends Component{
    render(){
        return(
            <div className=" inlineStatus">
               <div className="statusFont taskstatus inprogress"> In Progress</div>
               <ShowTasks/>
               <ShowTasks/>
            </div>
        )
    }
}
export default PendingTask;