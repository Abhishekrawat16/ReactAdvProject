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
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import api.model.ProjectModel;
import api.model.ProjectTaskModel;
import api.utils.ProjectTaskUtil;
import api.utils.ProjectUtil;

@Path("/projecttask")
public class ProjectTaskRestController {

	File file =new File ("C:\\\\Projects\\Project.json");
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response creatProjectTasks(ProjectTaskModel ptm) {

		if(ptm.getStatus()==null ||ptm.getStatus()=="") {
		 ptm.setStatus("todo");
		}
		
		ProjectTaskUtil util = new ProjectTaskUtil();
		ProjectTaskModel ptmErr = util.isValid(ptm);
		if(ptmErr!=null) {
			return Response
					.status(502)
					.entity(ptmErr)
					.build();
		}
		List<ProjectModel> pmList= new ArrayList<ProjectModel>();
		List<ProjectTaskModel> ptmList= new ArrayList<ProjectTaskModel>();
		ProjectModel pm= new ProjectModel();
		FileOutputStream fos;
		try {
			if(file.exists()&&file.length()>0) {
				FileInputStream fis = new FileInputStream(file);
				ObjectInputStream ois = new ObjectInputStream(fis);
				pmList = (List<ProjectModel>) ois.readObject();
				ois.close();
				Date date= new Date();
				for(int i=0; i<pmList.size(); i++){
					if(pmList.get(i).getId()==ptm.getId()) {
						pm=pmList.get(i);
						ptmList=pm.getPtmList();
						if(ptm.getProjectSequence()!=0) {
							for(int j=0; j<ptmList.size(); j++){
								if(ptmList.get(j).getProjectSequence()==ptm.getProjectSequence()) {
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
							ptm.setUpdated_At(date);
							ptmList.add(ptm);
						}
						pm.setPtmList(ptmList);
						pmList.remove(i);
						pmList.add(i, pm);
						fos = new FileOutputStream(file);
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

	@GET
	@Path("/all/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProjectTasks(@Context UriInfo uriInfo) {
		ProjectModel pm =new ProjectModel();
		List<ProjectModel> pmList= new ArrayList<ProjectModel>();
		List<ProjectTaskModel> ptmList = new  ArrayList<ProjectTaskModel>();
		MultivaluedMap<String, String> queryParams = uriInfo.getPathParameters(); 
		int id = Integer.parseInt(queryParams.getFirst("id"));
		try {
			if(file.exists()&&file.length()>0) {
				FileInputStream fis = new FileInputStream(file);
				ObjectInputStream ois = new ObjectInputStream(fis);
				pmList = (List<ProjectModel>) ois.readObject();
				ois.close();
				for(int i=0; i<pmList.size(); i++){
					if(pmList.get(i).getId()==id) {
						pm=pmList.get(i);
						ptmList=pm.getPtmList();
						break;
					}
				}
			}
		}catch (IOException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		return Response
				.status(200)
				.entity(ptmList)
				.build();
	}
	
	
	@GET
	@Path("/update/{id}/{seq}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProjectsTask( @Context UriInfo uriInfo) {
		ProjectModel pm =new ProjectModel();
		List<ProjectModel> pmList= new ArrayList<ProjectModel>();
		ProjectTaskModel ptm= new ProjectTaskModel();
		List<ProjectTaskModel> ptmList = new  ArrayList<ProjectTaskModel>();
		FileOutputStream fos;
		MultivaluedMap<String, String> queryParams = uriInfo.getPathParameters(); 
		int id = Integer.parseInt(queryParams.getFirst("id"));
		int seq = Integer.parseInt(queryParams.getFirst("seq"));
		try {
			if(file.exists()&&file.length()>0) {
				FileInputStream fis = new FileInputStream(file);
				ObjectInputStream ois = new ObjectInputStream(fis);
				pmList = (List<ProjectModel>) ois.readObject();
				ois.close();
				for(int i=0; i<pmList.size(); i++){
					if(pmList.get(i).getId()==id) {
						pm=pmList.get(i);
						ptmList=pm.getPtmList();	
							for(int j=0; j<ptmList.size(); j++){
								if(ptmList.get(j).getProjectSequence()==seq) {
									ptm=ptmList.get(j);
									break;
								}
							}
						
						break;
					}
				}
			}
		}
		catch (IOException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		return Response
				.status(200)
				.entity(ptm)
				.build();
	}

	@DELETE
	@Path("/delete/{id}/{seq}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteProjects( @Context UriInfo uriInfo) {
		ProjectModel pm =new ProjectModel();
		List<ProjectModel> pmList= new ArrayList<ProjectModel>();
		ProjectTaskModel ptm= new ProjectTaskModel();
		List<ProjectTaskModel> ptmList = new  ArrayList<ProjectTaskModel>();
		FileOutputStream fos;
		MultivaluedMap<String, String> queryParams = uriInfo.getPathParameters(); 
		int id = Integer.parseInt(queryParams.getFirst("id"));
		int seq = Integer.parseInt(queryParams.getFirst("seq"));
		try {
			if(file.exists()&&file.length()>0) {
				FileInputStream fis = new FileInputStream(file);
				ObjectInputStream ois = new ObjectInputStream(fis);
				pmList = (List<ProjectModel>) ois.readObject();
				ois.close();
				for(int i=0; i<pmList.size(); i++){
					if(pmList.get(i).getId()==id) {
						pm=pmList.get(i);
						ptmList=pm.getPtmList();	
							for(int j=0; j<ptmList.size(); j++){
								if(ptmList.get(j).getProjectSequence()==seq) {
									ptmList.remove(j);
									break;
								}
							}
						fos = new FileOutputStream(file);
						ObjectOutputStream oos = new ObjectOutputStream(fos);
						oos.writeObject(pmList);
						oos.close();
						break;
					}
				}
			}
		}
		catch (IOException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		return Response
				.status(200)
				.entity(seq)
				.build();
	}
}
