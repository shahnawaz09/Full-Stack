package com.shahnawaz.RestApi;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.shahnawaz.Dao.LoginDao;
import com.shahnawaz.Model.JWTToken;
import com.shahnawaz.Model.LoginData;
import com.shahnawaz.Model.RegisterData;

@Path("api/Timesheet")
public class LoginService {
	JWTToken jwt = new JWTToken("shfwhfjhk9698");
	LoginDao _loginDao = new LoginDao();
	
	@POST
	@Path("Authenticate")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String authenticateUser(LoginData loginObj){
		
		if(_loginDao.authenticateUser(loginObj.getUsername(), loginObj.getPassword())){
			String response="{\"token\":\"shfwhfjhk9698\"}";
			return response;
		}
	
		return "false";
	}
	
	@POST
	@Path("Register")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response registerUser(RegisterData registerObj){
		
		_loginDao.registerUser(registerObj);
		
		return Response.status(Status.CREATED).build();
	}
}
