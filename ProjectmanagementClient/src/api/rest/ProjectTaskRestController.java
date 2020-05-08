package api.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import api.model.ProjectModel;
import api.model.ProjectTaskModel;

@Path("/projecttask")
public class ProjectTaskRestController {

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response creatProjects(ProjectTaskModel ptm) {

		List<ProjectModel> pmList= new ArrayList<ProjectModel>();
		List<ProjectTaskModel> ptmList= new ArrayList<ProjectTaskModel>();
		ProjectModel pm= new ProjectModel();
		FileOutputStream fos;
		try {
			File file =new File ("C:\\\\Projects\\Project.json");
			if(file.exists()&&file.length()>0) {
				FileInputStream fis = new FileInputStream("C:\\\\Projects\\Project.json");
				ObjectInputStream ois;
				ois = new ObjectInputStream(fis);
				pmList = (List<ProjectModel>) ois.readObject();
				ois.close();
				Date date= new Date();
				for(int i=0; i<pmList.size(); i++){
					if(pmList.get(i).getId()==ptm.getId()) {
						pm=pmList.get(i);
						ptmList=pm.getPtmList();
						if(ptm.getProjectSequence()!=0) {
							for(int j=0; j<pmList.size(); j++){
								if(ptmList.get(i).getProjectSequence()==ptm.getProjectSequence()) {
									ptm.setUpdated_At(date);
									ptmList.remove(j);
									ptmList.add(j,ptm);
									break;
								}
							}
						}
						else {
							int nxtSeqn=pm.getTaskSequence()+1;
							pm.setTaskSequence(nxtSeqn);
							ptm.setProjectSequence(nxtSeqn);
							ptm.setCreated_At(date);
							ptmList.add(ptm);
						}
						pm.setPtmList(ptmList);
						pmList.remove(i);
						pmList.add(i, pm);
						fos = new FileOutputStream("C:\\\\Projects\\Project.json");
						ObjectOutputStream oos = new ObjectOutputStream(fos);
						oos.writeObject(pmList);
						oos.close();
						break;
					}
				}			
			}
		} catch (IOException | ClassNotFoundException e) {
			e.printStackTrace();
			return Response.status(500).entity("Error While Creating Project").build();
		}
		return Response.status(200).build();
	}

}
