import React from 'react';
import { Component } from "react";
import ShowTasks from './ShowTasks';
import PropTypes from 'prop-types';

class TaskColoumn extends Component {
    render() {
        const  Tasks  = this.props.tasks;
        const Status  = this.props.Status;
        return (
            <div className="inlineStatus ">
                <div className={this.props.className}>{Status}</div>
                
                {Tasks.map(task => (
                    <ShowTasks key={task.projectSequence} task={task} />
                ))}

            </div>
        );
    }
}

TaskColoumn.propTypes = {
    Tasks: PropTypes.object.isRequired,
    Status : PropTypes.object.isRequired
  };
export default TaskColoumn;