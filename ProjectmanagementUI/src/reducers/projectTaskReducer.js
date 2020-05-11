import {GET_PROJECTTASKS,GET_PROJECTTASK, DELETE_PROJECTTASK} from'../action/types';
const initialState={
projectTasks:[],
projectTask:{}
};
export default function(state=initialState,action)
{
    switch(action.type){
        case GET_PROJECTTASKS:
        return{
            ...state,
            projectTasks:action.payload           
        };
        case GET_PROJECTTASK:
        return{
            ...state,
            projectTask:action.payload           
        };
        case DELETE_PROJECTTASK:
        return{
            ...state,
            projectTasks:state.projectTasks.filter(
            projectTask=>projectTask.projectSequence!=action.payload
            )
           
        };
        default:
        return state;
        }
}