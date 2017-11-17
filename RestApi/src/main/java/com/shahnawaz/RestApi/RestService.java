package com.shahnawaz.RestApi;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.shahnawaz.Dao.EmployeeDataDao;
import com.shahnawaz.Model.EmployeesData;
import com.shahnawaz.Secure.Secure;

/**
 * Root resource (exposed at "api/Timesheet" path)
 */

@Secure
@Path("api/Timesheet")
public class RestService {	
	
	EmployeeDataDao empDao = new EmployeeDataDao();
	
	@GET
	@Path("GetEmployeesDetail")
	@Produces(MediaType.APPLICATION_JSON)
	public List<EmployeesData> getEmployeesDetail(){	
		
		return empDao.getEmployeesDetail();
	}
	
	@POST
	@Path("SaveEmployeesDetail")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createEmployeesDetail(EmployeesData empData){
		
		empDao.createEmployeesDetail(empData);
		
		return Response.status(Status.CREATED).build();
		
	} 
	
	@PUT
	@Path("UpdateEmployee/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateEmployeesDetail(@PathParam("id") int Id,EmployeesData empData){
		
		empDao.updateEmployeesDetail(Id, empData);
		return Response.status(200).build();
	}
	
	
	@DELETE
	@Path("DeleteEmployee/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteEmployeeData(@PathParam("id") int Id){
		
		empDao.deleteEmployeeData(Id);
		return Response.status(200).build();
	}
	

}
