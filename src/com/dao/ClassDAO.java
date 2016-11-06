package com.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.util.DataUtils;
import com.util.JdbcTemplete;
import com.util.ResultSetHandler;

public class ClassDAO {
	private JdbcTemplete jdbcTemplete = null;
	public ClassDAO(){
		jdbcTemplete = new JdbcTemplete();
	}

	public List<Map<String,String>> getClass(String username) throws SQLException{
		String sql = "select DISTINCT Classname from classinfo where Username=? and Flag=0";
		return (List<Map<String,String>>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				return DataUtils.getHashMap(rs);
			}
		},username);
	}
	public List<Map<String,String>> getCourse(String username,String classname) throws SQLException{
		String sql = "select DISTINCT Coursename from classinfo where Username=? and classname =? and Flag=0";
		return (List<Map<String,String>>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				return DataUtils.getHashMap(rs);
			}
		},username,classname);
	}
	public List<Map<String,String>> getClass1(String username) throws SQLException{
		String sql = "select Id,Coursename,Classname,Students from classinfo where Username=? and Flag=0";
		return (List<Map<String,String>>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				return DataUtils.getHashMap(rs);
			}
		},username);
	}
	
	public Map<String,String> getClassById(int id) throws SQLException{
		String sql = "select Coursename,Classname,Students from classinfo where Id=?";
		return (Map<String,String>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				return DataUtils.getHashMap(rs).get(0);
			}
		},id);
	}
	
	public int getMaxId() throws SQLException{
		String sql = "select max(Id) from classinfo";
		return (int)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				int a =-1;
				if(rs.next()){
					a=rs.getInt(1);
				}
				return a;
			}
		});
	}
	
	public void addClass(String username,String coursename,String classname,int students) throws SQLException{
		String sql = "insert into classinfo(Username,Coursename,Classname,Students,Flag) values(?,?,?,?,?)";
		jdbcTemplete.update(sql,username,coursename,classname,students,0);
	}
	public void editClass(int id,String coursename,String classname,int students) throws SQLException{
		String sql = "update classinfo set Coursename=?,Classname=?,Students=? where Id=?";
		jdbcTemplete.update(sql,coursename,classname,students,id);
	}
	public void deleteClass(int id) throws SQLException{
		String sql = "update classinfo set Flag=1 where Id=?";
		jdbcTemplete.update(sql,id);
	}
}
