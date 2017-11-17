package com.shahnawaz.Dao;
import java.sql.*;

import com.shahnawaz.Model.RegisterData;

public class LoginDao {
	
	Connection con = null;
	
	public LoginDao(){
		String url = "jdbc:sqlserver://localhost:1433;databaseName=AngularRest";
		String uname = "mdshahnawaza";
		String pass = "cybage123";
		try{
		Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
		con = DriverManager.getConnection(url,uname,pass);
		
		}
		catch(Exception e){
			System.out.println("SQL Exception "+e);
		}
		if (con != null) {
		    System.out.println("Connected");
		}
		else{
			System.out.println("Not Connected");
		}
	}
	
	public boolean authenticateUser(String username, String password){
		
		String sql = "select * from tblLoginData where USERNAME=? and PASSWORD=?";
		
		try{
		
		PreparedStatement st = con.prepareStatement(sql);
		st.setString(1,username);
		st.setString(2,password);
		ResultSet rs = st.executeQuery();
		if(rs.next()){
			return true;
		}
		}
		
		catch(Exception e){
			System.out.println("SQL Exception "+e);
		}
		
		return false;
	}

	public void registerUser(RegisterData registerObj) {
		
		String sql = "insert into tblLoginData values(?,?,?,?,?)";
		
		try{
			
			PreparedStatement st = con.prepareStatement(sql);
			st.setString(1,registerObj.getFirstname());
			st.setString(2,registerObj.getLastname());
			st.setString(3,registerObj.getUsername());
			st.setString(4,registerObj.getPassword());
			st.setString(5,registerObj.getEmail());
			
			st.executeQuery();
			
			}
			
			catch(Exception e){
				System.out.println("SQL Exception "+e);
			}
		
	}

}




