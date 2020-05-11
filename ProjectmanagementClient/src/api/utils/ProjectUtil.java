package api.utils;

import api.model.ProjectModel;

public class ProjectUtil {

	
	public ProjectModel isValid(ProjectModel pm){
		ProjectModel pmErr=new ProjectModel();
		boolean isErr=false;
		if(pm.getProjectName()==null||pm.getProjectName()=="") {
			pmErr.setProjectName("Project name should not be empty");
			isErr=true;
		}
		if(pm.getProjectIdentifier()==null||pm.getProjectIdentifier()=="") {
			pmErr.setProjectIdentifier("Project Identifier should not be empty");
			isErr=true;
		}
		if(pm.getDescription()==null||pm.getDescription()=="") {
			pmErr.setDescription("Description should not be empty");
			isErr=true;
		}
		if(isErr==true) {
			return pmErr;
		}
		return null;
	}
}
