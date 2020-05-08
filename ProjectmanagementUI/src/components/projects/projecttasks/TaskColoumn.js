import React from 'react';
import { Component } from "react";
import ShowTasks from './ShowTasks';
import { getProjectTasks } from "../../../action/ProjectActions";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TaskColoumn extends Component{


 componentDidMount() {
        this.props.getProjectTasks();
    }

    render(){
        return(
            <div className="inlineStatus ">
              <div className={this.props.className}>{this.props.Status}</div>
                <ShowTasks/>
            </div>
        )
    }
}

TaskColoumn.propTypes = {
    projectTasks: PropTypes.object.isRequired,
    getProjectTasks: PropTypes.func.isRequired
};

const mapStateToProps = state => (
    {
        projectTasks: state.projectTasks
    });
export default connect(mapStateToProps, { getProjectTasks })(TaskColoumn);