import React from'react';
import {createProject} from"../../action/ProjectActions";
import{connect} from'react-redux';
import PropTypes from 'prop-types';
class Addproject extends React.Component
{ 
    constructor(props)
    {
    super(props);
    this.state={
        projectName: "",
        projectIdentifier: "",
        description: "",
        start_date: "",
        end_date: "",
        errors:{ }
       };
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
    this.setState({ errors: nextProps.errors });
    }
  }
   onSubmit(event)
    {
      event.preventDefault();
      const newProject={
        projectName:this.state.projectName,
        projectIdentifier:this.state.projectIdentifier,
        description:this.state.description,
        start_date:this.state.start_date,
        end_date:this.state.end_date,
         };
     //console.log(newProject);
     //make a call for createProject(newProject,this.props.history)
     this.props.createProject(newProject,this.props.history);
    }
    onChange(event)
    {
        
        this.setState({[event.target.name]:event.target.value});
    }

  render(){
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
                  placeholder="Project Name"
                    name="projectName"
                    value={this.state.projectName}
                    onChange={this.onChange} />
                  <p className="error">{this.state.errors.projectName}</p>
                  </div>
                <div className="form-group">
                  <input
                    type="text"
                     className="form-control form-control-lg"
                     placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={this.state.projectIdentifier}
                    onChange={this.onChange}/>
                    <p className="error">{this.state.errors.projectIdentifier}</p>
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Project Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}/>
                    <p className="error">{this.state.errors.description}</p>
                  </div>
                
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="start_date"
                    value={this.state.start_date}
                    onChange={this.onChange}/>
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="end_date"
                    value={this.state.end_date}
                    onChange={this.onChange}
                  />
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
  }}

Addproject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createProject }) (Addproject);
