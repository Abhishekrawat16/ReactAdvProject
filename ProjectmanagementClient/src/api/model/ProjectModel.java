package api.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import com.fasterxml.jackson.annotation.JsonFormat;
import api.model.ProjectTaskModel;

@XmlRootElement
public class ProjectModel implements Serializable {

	private int id;
	private String projectIdentifier;
	private String projectName;
	private String description;
	private int taskSequence;
	private List<ProjectTaskModel> ptmList=new ArrayList<ProjectTaskModel>();
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date start_date;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date end_date;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getStart_date() {
		return start_date;
	}
	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}
	public Date getEnd_date() {
		return end_date;
	}
	public void setEnd_date(Date end_date) {
		this.end_date = end_date;
	}
	public String getProjectIdentifier() {
		return projectIdentifier;
	}
	public void setProjectIdentifier(String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getTaskSequence() {
		return taskSequence;
	}
	public void setTaskSequence(int taskSequence) {
		this.taskSequence = taskSequence;
	}
	public List<ProjectTaskModel> getPtmList() {
		return ptmList;
	}
	public void setPtmList(List<ProjectTaskModel> ptmList) {
		this.ptmList = ptmList;
	}
	
}
