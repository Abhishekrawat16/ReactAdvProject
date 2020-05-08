import React from 'react';
import ProjectItem from './projects/ProjectItem.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProjects } from "../action/ProjectActions";
import Createprojectbutton from './projects/Createprojectbutton.js';
class Dashboard extends React.Component {
    componentDidMount() {
        this.props.getProjects();
    }
    render() {
        const { projects } = this.props.projects;
        return (
            <div className="projects">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Projects</h1>
                            <br />
                            <Createprojectbutton />
                            <br />
                            <hr />
                            {projects.map(project => (
                                <ProjectItem key={project.id} project={project} />
                            ))}


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Dashboard.propTypes = {
    projects: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired
};
const mapStateToProps = state => (
    {
        projects: state.projects
        // projects:[{id:1,
        //     projectIdentifier:"projectIdentifier",
        //     projectName:"projectName",
        //     description:"desc"
        // }]
    });


export default connect(mapStateToProps, { getProjects })(Dashboard);
