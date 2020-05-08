import React from 'react';
import { Link } from 'react-router-dom';

const ShowTasks = () => {
    return (
        <div className=" card bg-light mb-3 tasks">
            <div className="high"> 
                <span >ID: TESTR-{} -- Priority:{} </span><br />
            </div>
            <div className="card-body">
            <div className="summary">
                <span >Task Summary</span><br />
            </div>
            <div className="inline">
                <Link to={`/projecttask/`}>
                    <button className="view btn btn-lg btn-info">View/Update</button>
                </Link>
                <Link to={`/projecttask/`}>
                    <button className="deletetask btn btn-lg btn-info">Delete</button>
                </Link>
            </div>
            </div>
        </div>
    );
}
export default ShowTasks;