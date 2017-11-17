package com.shahnawaz.Dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.shahnawaz.Model.EmployeesData;



public class EmployeeDataDao {
	
Connection con = null;
	
	public EmployeeDataDao(){
		
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
	
	
	public List<EmployeesData> getEmployeesDetail(){
		
		List<EmployeesData> employeesData = new ArrayList<>();
		String sql = "select * from tblEmployeesData";
		
		try{
			
			Statement st = con.createStatement();
			ResultSet rs =  st.executeQuery(sql);
			
			while(rs.next()){
				
				EmployeesData empData = new EmployeesData();  
				empData.setId(rs.getInt(1));
				empData.setName(rs.getString(2));
				empData.setRewardPoints(rs.getInt(3));
				empData.setActualWorkHour(rs.getDouble(4));
				empData.setTotalWorkHour(rs.getDouble(5));
				
				employeesData.add(empData);
			}
		}
		catch(Exception e){
			System.out.println("SQL Exception "+e);
		}
		
		return employeesData;
	}


	public void createEmployeesDetail(EmployeesData empData) {
		
		String sql = "insert into tblEmployeesData values(?,?,?,?,?)";
		
		try{
		
		PreparedStatement st = con.prepareStatement(sql);
		st.setInt(1, empData.getId());
		st.setString(2, empData.getName());
		st.setInt(3, empData.getRewardPoints());
		st.setDouble(4, empData.getActualWorkHour());
		st.setDouble(5, empData.getTotalWorkHour());
		st.executeUpdate();
		}
		catch(Exception e){
			System.out.println("SQL Exception "+e);
		}
		
	}
	
	public void updateEmployeesDetail(int id, EmployeesData empData) {
		String sql = "update tblEmployeesData set NAME=?,REWARD_POINTS=?,ACTUAL_WORK_HOUR=?,TOTAL_WORK_HOUR=? where id=?";
		
		try{
			PreparedStatement st = con.prepareStatement(sql);
			
			st.setString(1, empData.getName());
			st.setInt(2, empData.getRewardPoints());
			st.setDouble(3, empData.getActualWorkHour());
			st.setDouble(4, empData.getTotalWorkHour());
			st.setInt(5, id);
			st.executeUpdate();
		}
		catch(Exception e){
			System.out.println("SQL Exception "+e);
		}
	}


	public void deleteEmployeeData(int id) {
		String sql = "delete from tblEmployeesData where id=?";
		
		try{
			PreparedStatement st = con.prepareStatement(sql);
			st.setInt(1,id);
			st.executeUpdate();
		}
		catch(Exception e){
			System.out.println("SQL Exception "+e);
		}
	}


}
