package com.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.util.JdbcTemplete;
import com.util.ResultSetHandler;

public class UserDAO {
	
	private JdbcTemplete jdbcTemplete = null;
	public UserDAO(){
		jdbcTemplete = new JdbcTemplete();
	}
	
	public void insertUser(String username,String password,String depart,String phone,int power) throws SQLException{
		String sql = "insert into users(Username,Password,Depart,Phone,Power) values(?,?,?,?,?)";
		jdbcTemplete.update(sql,username,password,depart,phone,power);
	}
	
	public void insertLoginRecord(String username,String date) throws SQLException{
		String sql = "insert into loginrecord(Username,Logindate) values(?,?)";
		jdbcTemplete.update(sql,username,date);
	}
	
	public boolean validate(String username,String password) throws SQLException{
		String sql = "select Password,Depart,Power from users where Username=? and Password=?";
		return (boolean) jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				if(rs.next()){
					return true;
				}else{
					return false;
				}
				
			}
		}, username,password);
		 
	}
	
	public int adminvalidate(String username,String password) throws SQLException{
		String sql = "select Password,Depart,Power from users where Username=? and Password=? and Power=1";
		return (int) jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				if(rs.next()){
					return 1;
				}else{
					return 0;
				}
				
			}
		}, username,password);
		 
	}
	
	
	public Map<String,String> getAccount(final String username) throws SQLException{
		String sql = "select Password,Depart,Phone,Power from users where Username=?";
		return (Map<String,String>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				Map<String,String> u = null;
				while(rs.next()){
					u = new HashMap<String, String>();
					u.put("username", username);
					u.put("password", rs.getString(1));
					u.put("depart", rs.getString(2));
					u.put("phone", rs.getString(3));
				}
				return u;
			}
		}, username);
	}
	
	public void updateBypassword(String username,String password) throws SQLException{
		String sql = "update users set Password=? where Username=?";
		jdbcTemplete.update(sql,password,username);
	}
	public void updateBydepart(String username,String depart) throws SQLException{
		String sql = "update users set Depart=? where Username=?";
		jdbcTemplete.update(sql,depart,username);
	}
	public void deleteUser(int id) throws SQLException{
		String sql = "delete from users where Id=?";
		jdbcTemplete.update(sql,id);
	}
	
	public void updateAll(int id,String username,String depart,String phone) throws SQLException{
		String sql = "update users set Username=?,Depart=?,Phone=? where Id=?";
		jdbcTemplete.update(sql,username,depart,phone,id);
	}
	public void updateAllandpwd(int id,String username,String password,String depart,String phone) throws SQLException{
		String sql = "update users set Username=?,Password=?,Depart=?,Phone=? where Id=?";
		jdbcTemplete.update(sql,username,password,depart,phone,id);
	}
	
	public void updateByphone(String username,String phone) throws SQLException{
		String sql = "update users set Phone=? where Username=?";
		jdbcTemplete.update(sql,phone,username);
	}
	
	public List<Map<String,String>> findAll(int pageindex) throws SQLException{
		String sql = "select Id,Username,Depart,Phone from users where Power=0 limit ?,?";
		return (List<Map<String,String>>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				final List<Map<String,String>> list = new ArrayList<Map<String,String>>();
				Map<String,String> u;
				while(rs.next()){
//					System.out.println(p++);
					u = new HashMap<String, String>();
					u.put("id", String.valueOf(rs.getInt("Id")));
					u.put("username", rs.getString("Username"));
					u.put("depart", rs.getString("Depart"));
					u.put("phone", rs.getString("Phone"));
					list.add(u);
				}
				
				return list;
			}
		},pageindex,6);
	}
	
	public List<Map<String,String>> findAllexcel() throws SQLException{
		String sql = "select Username from users where Power=0";
		return (List<Map<String,String>>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				final List<Map<String,String>> list = new ArrayList<Map<String,String>>();
				Map<String,String> u;
				while(rs.next()){
//					System.out.println(p++);
					u = new HashMap<String, String>();
					u.put("username", rs.getString("Username"));
					list.add(u);
				}
				
				return list;
			}
		});
	}

	
	
	public int getCount() throws SQLException{
		String sql = "select count(Username) from users";
		return (int)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				int sum=0;
				if(rs.next()){
					sum = rs.getInt(1);
				}
				return sum;
			}
		});
	}
	
	public int getLoginCount() throws SQLException{
		String sql = "select COUNT(Id) from loginrecord where Logindate>=date(now()) and Logindate<DATE_ADD(date(now()),INTERVAL 1 DAY);";
		return (int)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				int sum=0;
				if(rs.next()){
					sum = rs.getInt(1);
				}
				return sum;
			}
		});
	}
}
