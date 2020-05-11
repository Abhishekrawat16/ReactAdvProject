import axios from 'axios';
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT,GET_PROJECTTASKS,GET_PROJECTTASK,DELETE_PROJECTTASK} from './types';

export const createProject = (project, history) => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8080/ProjectmanagementClient/api/project", project);
        history.push("/dashboard");
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const createProjectTask = (projectTask, history) => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8080/ProjectmanagementClient/api/projecttask", projectTask);
        history.push("/projecttask/" + projectTask.id);
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const getProjects = () => async dispatch => {
    const res = await axios.get("http://localhost:8080/ProjectmanagementClient/api/project/all");
    dispatch({
        type: GET_PROJECTS,
        payload: res.data
    });
};

export const getProjectTasks = (id) => async dispatch => {
    const res = await axios.get(`http://localhost:8080/ProjectmanagementClient/api/projecttask/all/${id}`);
    dispatch({
        type: GET_PROJECTTASKS,
        payload: res.data
    });
};

export const getProject = (id) => async dispatch => {
    const res = await axios.get(`http://localhost:8080/ProjectmanagementClient/api/project/update/${id}`);
    dispatch({
        type: GET_PROJECT,
        payload: res.data
    });
};

export const getProjectTask = (id, seq) => async dispatch => {
    const res = await axios.get(`http://localhost:8080/ProjectmanagementClient/api/projecttask/update/${id}/${seq}`);
    dispatch({
        type: GET_PROJECTTASK,
        payload: res.data
    });
};

export const deleteProject = id => async dispatch => {
    await axios.delete(`http://localhost:8080/ProjectmanagementClient/api/project/delete/${id}`);
    dispatch({
        type: DELETE_PROJECT,
        payload: id
    });
};

export const deleteProjectTask = (id, seq) => async dispatch => {
    await axios.delete(`http://localhost:8080/ProjectmanagementClient/api/projecttask/delete/${id}/${seq}`);
    dispatch({
        type: DELETE_PROJECTTASK,
        payload: seq
    });
};



