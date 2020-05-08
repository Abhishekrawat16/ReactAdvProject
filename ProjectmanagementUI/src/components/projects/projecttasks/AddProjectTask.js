import React from 'react';
import { createProject } from "../../../action/ProjectActions";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class AddProjectTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // projectSequence: "",
      summary: "",
      acceptanceCriteria: "",
      status: "To Do",
      priority: "",
      dueDate: "",
      backlog: "",
      projectIdentifier: "",
      // created_At: "",
      // updated_At: ""
      // projectName: "",
      // projectIdentifier: " ",
      // description: " ",
      // start_date: " ",
      // end_date: " ",
      errors:{ }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }
  onSubmit(event) {
    event.preventDefault();
    const newProject = {
      summary: this.state.summary,
      // projectIdentifier: this.state.projectIdentifier,
      acceptanceCriteria: this.state.acceptanceCriteria,
      dueDate: this.state.dueDate,
      priority: this.state.priority,
      status:this.state.status
    };
    //console.log(newProject);
    //make a call for createProject(newProject,this.props.history)
    this.props.createProject(newProject, this.props.history);
  }
  onChange(event) {

    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    //const { errors } = this.state;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Project form</h5>
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
                    name="projectIdentifier"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange} />
                  <p>{this.state.errors.acceptanceCriteria}</p>
                </div>

                {/* <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Project Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange} />
                  <p>{this.state.errors.description}</p>
                </div> */}

                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange} />
                </div>
                {/* <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="end_date"
                    value={this.state.end_date}
                    onChange={this.onChange}
                  />
                </div> */}
                 <div className="form-group">
                   <select name="priority"  
                   className="form-control form-control-lg"
                   value={this.state.priority}
                   placeholder="Select Priority"
                    onChange={this.onChange}>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
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

export default connect(mapStateToProps, { createProject })(AddProjectTask);
