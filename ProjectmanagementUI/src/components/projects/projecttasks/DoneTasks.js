import React from 'react';
import { Component } from "react";

class DoneTask extends Component{
    render(){
        return(
            <div className=" inlineStatus">
               <div className="taskstatus done">  Done</div>
            </div>
        )
    }
}
export default DoneTask;