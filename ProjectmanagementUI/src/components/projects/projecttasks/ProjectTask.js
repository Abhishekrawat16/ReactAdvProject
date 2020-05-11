import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProjectTasks } from "../../../action/ProjectActions";
import CreateProjectTaskButton from './CreateProjectTaskButton.js';
import TaskColoumn from './TaskColoumn';

class ProjectTask extends React.Component {
    componentDidMount() {
        const { id }=this.props.match.params;
        this.props.getProjectTasks(id);
    }

    render() {
        const { projectTasks } = this.props.projectTasks;
        const todoTask=projectTasks.filter(task =>(
            task.status=="todo"

        ));
        const inprogressTask=projectTasks.filter(task =>(
            task.status=="inprogress"
        ));
        const doneTask=projectTasks.filter(task =>(
            task.status=="done"
        ));
        const { id }=this.props.match.params;
        return (
            <div className="projects">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <br />
                            <CreateProjectTaskButton id={id}/>
                            <br />
                            <hr />
                            <div>
                                
                            <TaskColoumn Status="TO DO" className="taskstatus todo" tasks={todoTask}/>
                            <TaskColoumn Status="In Progress" className="taskstatus inprogress" tasks={inprogressTask}/>
                            <TaskColoumn Status="Done" className="taskstatus done" tasks={doneTask}/>
                            </div>
                            


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ProjectTask.propTypes = {
    projectTasks: PropTypes.object.isRequired,
    getProjectTasks: PropTypes.func.isRequired
};
const mapStateToProps = state => (
    {
        projectTasks: state.projectTasks
    });

export default connect(mapStateToProps, { getProjectTasks })(ProjectTask);
