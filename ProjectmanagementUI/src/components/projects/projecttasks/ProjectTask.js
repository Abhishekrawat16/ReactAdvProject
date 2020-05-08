import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProjects } from "../../../action/ProjectActions";
import CreateProjectTaskButton from './CreateProjectTaskButton.js';
import TaskColoumn from './TaskColoumn';
import PendingTask from './PendingTasks';
import DoneTask from './DoneTasks';
class ProjectTask extends React.Component {
   
    render() {
        const { projects } = this.props.projects;
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
                            <TaskColoumn Status="TO DO" className="taskstatus todo"/>
                            <TaskColoumn Status="In Progress" className="taskstatus inprogress"/>
                            <TaskColoumn Status="Done" className="taskstatus done"/>
                            </div>
                            {/* {projects.map(project => (
                                <ProjectItem key={project.id} project={project} />
                            ))} */}


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ProjectTask.propTypes = {
    // projects: PropTypes.object.isRequired,
    // getProjects: PropTypes.func.isRequired
};
const mapStateToProps = state => (
    {
        projects: state.projects
    });


export default connect(mapStateToProps, { getProjects })(ProjectTask);
