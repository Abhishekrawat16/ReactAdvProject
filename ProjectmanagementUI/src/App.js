import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from"./components/Dashboard";
import Header from"./components/layout/Header";
import Addproject from "./components/projects/Addproject";
import updateProject from "./components/projects/updateProject";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {BrowserRouter as Router,Route} from 'react-router-dom';
import{Provider} from 'react-redux';
import store from './store';
import ProjectTask from './components/projects/projecttasks/ProjectTask';
import AddProjectTask from './components/projects/projecttasks/AddProjectTask';


class App extends React.Component {
  render()
  {
  return (
    <Provider store={store}>
   <Router>
   <div className="App">
   <Header/>
    </div>
   <Route path ="/dashboard" component={Dashboard}/>
   <Route path ="/addproject" component={Addproject}/>
   <Route path ="/addprojecttask/:id" component={AddProjectTask}/>
   <Route path ="/updateproject/:id" component={updateProject}/>
   <Route path ="/projecttask/:id" component={ProjectTask}/>
  </Router>
  </Provider>
    );
}
}

export default App;

