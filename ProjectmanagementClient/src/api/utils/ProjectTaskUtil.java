package api.utils;

import api.model.ProjectTaskModel;

public class ProjectTaskUtil {

	
	public ProjectTaskModel isValid(ProjectTaskModel pm){
		ProjectTaskModel ptmErr=new ProjectTaskModel();
		boolean isErr=false;
		if(pm.getSummary()==null||pm.getSummary()=="") {
			ptmErr.setSummary("Project Task Summary should not be empty");
			isErr=true;
		}
		if(pm.getAcceptanceCriteria()==null||pm.getAcceptanceCriteria()=="") {
			ptmErr.setAcceptanceCriteria("Acceptance Criteria should not be empty");
			isErr=true;
		}
		if(pm.getPriority()==null||pm.getPriority()=="") {
			ptmErr.setPriority("Priority must be selected");
			isErr=true;
		}
		
		if(isErr==true) {
			return ptmErr;
		}
		return null;
	}
}
