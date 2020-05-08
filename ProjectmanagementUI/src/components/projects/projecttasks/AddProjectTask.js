import React from 'react';
import { createProjectTask } from "../../../action/ProjectActions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
class AddProjectTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:Number,
      // projectSequence: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: "",
      dueDate: "",
      backlog: "",
      projectIdentifier: "",
      // created_At: "",
      // updated_At: ""
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
        const { id }=this.props.match.params;
        this.setState({id});
    }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const newProjectTask = {
      id: this.state.id,
      summary: this.state.summary,
      // projectIdentifier: this.state.projectIdentifier,
      acceptanceCriteria: this.state.acceptanceCriteria,
      dueDate: this.state.dueDate,
      priority:parseInt(this.state.priority),
      status: this.state.status
    };
    //console.log(newProject);
    //make a call for createProject(newProject,this.props.history)
    this.props.createProjectTask(newProjectTask, this.props.history);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    //const { errors } = this.state;
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
                  <p>{this.state.errors.summary}</p>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange} />
                  <p>{this.state.errors.acceptanceCriteria}</p>
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
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                  </select>
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

// Addproject.propTypes = {
//   createProject: PropTypes.func.isRequired,
//   errors: PropTypes.object.isRequired
// };
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createProjectTask })(AddProjectTask);
