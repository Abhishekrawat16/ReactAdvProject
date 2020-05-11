import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProjectTask } from "../../../action/ProjectActions";

class ShowTasks extends React.Component {
    onDeleteClick = (id,seq) => {
        console.log("delete method called");
        this.props.deleteProjectTask(id,seq);
    }; 
render(){
    const task=this.props.task;
    return (
        <div className=" card bg-light mb-3 tasks">
            <div className={task.priority}> 
                <span >ID: TESTR-{task.projectSequence} -- Priority:{task.priority} </span><br />
            </div>
            <div className="card-body">
            <div className="summary">
                <span >{task.summary}</span><br />
            </div>
            <div className="inline">
                <Link to={`/addprojecttask/${task.id}/${task.projectSequence}`}>
                    <button className="view btn btn-lg btn-info">View/Update</button>
                </Link>
                
                    <button  onClick={this.onDeleteClick.bind(this, task.id,task.projectSequence)} className=" fa  deletetask btn btn-lg btn-info">Delete</button>
            </div>
            </div>
        </div>
    );
} 
    
}

export default connect(null, { deleteProjectTask })(ShowTasks);