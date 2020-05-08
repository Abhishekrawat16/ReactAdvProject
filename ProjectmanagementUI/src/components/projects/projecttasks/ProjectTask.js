import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProjects } from "../../../action/ProjectActions";
import CreateProjectTaskButton from './CreateProjectTaskButton.js';
class ProjectTask extends React.Component {
    // componentDidMount() {
    //     this.props.getProjects();
    // }
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
