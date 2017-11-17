package com.shahnawaz.Authentication;

import java.io.IOException;
import java.util.List;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.Provider;

import com.shahnawaz.Secure.Secure;

@Secure
@Provider
public class AuthenticationFilter implements ContainerRequestFilter {

	private static final String AUTHORIZATION_HEADER_KEY = "Authorization";
	private static final String AUTHORIZATION_HEADER_PREFIX = "Bearer ";
	
	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {
		
	List<String> authHeader = requestContext.getHeaders().get(AUTHORIZATION_HEADER_KEY);
	
	if(authHeader != null && authHeader.size() > 0){
		
		String authToken = authHeader.get(0);
		
		authToken = authToken.replaceFirst(AUTHORIZATION_HEADER_PREFIX,"");
		
		if(("shfwhfjhk9698").equals(authToken)){
			
			return;
		}
		
	}
	
		Response unauthorizedStatus = Response.status(Status.UNAUTHORIZED).build();
		
		requestContext.abortWith(unauthorizedStatus);
	
	
	}
	

}
