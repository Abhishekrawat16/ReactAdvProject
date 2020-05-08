import {GET_PROJECTS,GET_PROJECT,DELETE_PROJECT,GET_PROJECTTASKS} from'../action/types';
const initialState={
projects:[],
projectTasks:[],
project:{}
};
export default function(state=initialState,action)
{
    switch(action.type){
        case GET_PROJECTS:
        return{
            ...state,
            projects:action.payload
        };
        case GET_PROJECT:
        return{
            ...state,
            project:action.payload
        };
        case DELETE_PROJECT:
        return{
            ...state,
            projects:state.projects.filter(
            project=>project.id!=action.payload
            )
           
        };
        case GET_PROJECTTASKS:
        return{
            ...state,
            projectTasks:action.payload           
        };
        default:
        return state;
        }
}