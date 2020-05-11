package api.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.Context;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import api.model.ProjectModel;
import api.utils.ProjectUtil;

@Path("/project")
public class ProjectRestController extends Application  {

	File file =new File ("C:\\\\Projects\\Project.json");

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response creatProjects(ProjectModel pm) {
		ProjectUtil util = new ProjectUtil();
		ProjectModel pmErr = util.isValid(pm);
		if(pmErr!=null) {
			return Response
					.status(502)
					.entity(pmErr)
					.build();
		}
		if(pm.getId()!=0) {
			List<ProjectModel> pmList= new ArrayList<ProjectModel>();
			FileOutputStream fos;
			try {
				FileInputStream fis = new FileInputStream(file);
				ObjectInputStream ois = new ObjectInputStream(fis);
				pmList = (List<ProjectModel>) ois.readObject();
				ois.close();
				for(int i=0; i<pmList.size(); i++){
					if(pmList.get(i).getId()==pm.getId()) {
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
			catch (IOException | ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		else {
			Random random = new Random();
			int id = random.nextInt(900) + 100;
			pm.setId(id);
			List<ProjectModel> pmList= new ArrayList<ProjectModel>();
			FileOutputStream fos;
			try {
				if(file.exists() && file.length()>0) {
					FileInputStream fis = new FileInputStream(file);
					ObjectInputStream ois = new ObjectInputStream(fis);
					pmList = (List<ProjectModel>) ois.readObject();
					ois.close();
				}
				pmList.add(pm);
				fos = new FileOutputStream(file);
				ObjectOutputStream oos = new ObjectOutputStream(fos);
				oos.writeObject(pmList);
				oos.close();
			}catch (IOException | ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		return Response.status(200).build();
	}


	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProjects() {
		ProjectModel pm =new ProjectModel();
		List<ProjectModel> pmList= new ArrayList<ProjectModel>();
		try {
			if(file.exists()&&file.length()>0) {
				FileInputStream fis = new FileInputStream(file);
				ObjectInputStream ois = new ObjectInputStream(fis);
				pmList = (List<ProjectModel>) ois.readObject();
				ois.close();
			}
		}catch (IOException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		return Response
				.status(200)
				.entity(pmList)
				.build();
	}

	@GET
	@Path("/update/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProjects( @Context UriInfo uriInfo) {

		ProjectModel pm =new ProjectModel();
		List<ProjectModel> pmList= new ArrayList<ProjectModel>();
		FileOutputStream fos;
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
				.entity(pm)
				.build();
	}

	@DELETE
	@Path("/delete/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteProjects( @Context UriInfo uriInfo) {

		List<ProjectModel> pmList= new ArrayList<ProjectModel>();
		FileOutputStream fos;
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
						pmList.remove(i);
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
				.entity(id)
				.build();
	}
}
