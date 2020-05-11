import React from 'react';
import { createProjectTask } from "../../../action/ProjectActions";
import { getProjectTask } from "../../../action/ProjectActions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
class AddProjectTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Number,
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: "",
      dueDate: "",
      backlog: "",
      projectIdentifier: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { seq } = this.props.match.params;
    const { id } = this.props.match.params;
    if (seq != "new") {
      this.props.getProjectTask(id, seq);
    }
    else {
      this.setState({ id });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.id==0) {
      this.setState({ errors: nextProps.errors });
    }
    else {
      const {
        id,
        summary,
        acceptanceCriteria,
        projectSequence,
        status,
        priority,
        dueDate,
        backlog,
        created_At,
        updated_At
      } = nextProps.projectTask;
      this.setState({
        id,
        summary,
        acceptanceCriteria,
        projectSequence,
        status,
        priority,
        dueDate,
        backlog,
        created_At,
        updated_At
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const newProjectTask = {
      id: this.state.id,
      summary: this.state.summary,
      projectSequence: this.state.projectSequence,
      acceptanceCriteria: this.state.acceptanceCriteria,
      dueDate: this.state.dueDate,
      priority: this.state.priority,
      status: this.state.status,
      created_At: this.state.created_At,
      updated_At: this.state.updated_At
    };
   
    this.props.createProjectTask(newProjectTask, this.props.history);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="project">
        <div className="container">
          <Link to={`/projecttask/${this.state.id}`} className="btn btn-lg">
            Back to Project Board
          </Link>
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Add/Update Project Task</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="text"
                    className="form-control form-control-lg"
                    placeholder="Project Task Summary"
                    name="summary"
                    value={this.state.summary}
                    onChange={this.onChange} />
                  <p className="error">{this.state.errors.summary}</p>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange} />
                  <p className="error">{this.state.errors.acceptanceCriteria}</p>
                </div>

                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange} />
                </div>

                <div className="form-group">
                  <select name="priority"
                    className="form-control form-control-lg"
                    value={this.state.priority}
                    placeholder="Select Priority"
                    onChange={this.onChange}>
                    <option value="" disabled hidden>Select Priority</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                  <p className="error">{this.state.errors.priority}</p>
                </div>

                <div className="form-group">
                  <select name="status"
                    className="form-control form-control-lg"
                    value={this.state.status}
                    onChange={this.onChange}>
                    <option value="" disabled hidden>Select Status</option>
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  createProjectTask: PropTypes.func.isRequired,
  projectTask: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    projectTask: state.projectTasks.projectTask,
    errors: state.errors
  }
};

export default connect(mapStateToProps, { createProjectTask, getProjectTask })(AddProjectTask);
