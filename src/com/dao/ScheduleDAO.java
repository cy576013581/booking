package com.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.util.DataUtils;
import com.util.JdbcTemplete;
import com.util.ResultSetHandler;

public class ScheduleDAO {
	private JdbcTemplete jdbcTemplete = null;
	public ScheduleDAO(){
		jdbcTemplete = new JdbcTemplete();
	}
	
	public void deleteSchooldate() throws SQLException{
		String sql = "delete from schooldate";
		jdbcTemplete.update(sql);
	}
	
	public void insertSchooldate(String schooldate,String week) throws SQLException{
		String sql = "insert into schooldate(Schooldate,Week_monday) values(?,?)";
		jdbcTemplete.update(sql,schooldate,week);
	}
	
	public String getWeek() throws SQLException{
		String sql = "select Week_monday from schooldate";
		return (String) jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				String week = null;
				if(rs.next()){
					week = rs.getString(1);
				}
				return week;
				
			}
		});
		 
	}
	
	public List<Map<String,String>> findClass(String date,int roomid) throws SQLException{
		String sql = "select a.Id,a.Username,c.Coursename,c.Classname,a.Roomid,a.Classtime,Section "
				+ "from bookings as a LEFT JOIN classinfo AS c ON a.Username=c.Username AND a.Classid=c.Id "
				+ "WHERE a.Flag=0 and a.Roomid=? and a.Classtime=?";
		return (List<Map<String,String>>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				return DataUtils.getHashMap(rs);
			}
		},roomid,date);
	}
	
	public List<Map<String,String>> findClass2(String date,String username) throws SQLException{
		String sql = "select b.Roomname,a.Id,a.Username,c.Coursename,c.Classname,a.Roomid,a.Classtime,Section "
				+ "from bookings as a LEFT JOIN rooms AS b ON a.Roomid=b.Id "
				+ "LEFT JOIN classinfo AS c ON a.Username=c.Username AND a.Classid=c.Id "
				+ "WHERE a.Flag=0 and a.Username=? and a.Classtime=?";
		return (List<Map<String,String>>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				return DataUtils.getHashMap(rs);
			}
		},username,date);
	}
	
	public List<Map<String,String>> findClassbyroomid(String date,int roomid) throws SQLException{
		String sql = "SELECT a.Classtime,a.Id,c.Coursename,c.Classname,d.Phone,c.Students,a.Username,Section FROM	bookings AS a "
				+ "LEFT JOIN rooms AS b ON a.Roomid = b.Id "
				+ "LEFT JOIN classinfo AS c ON a.Classid = c.Id "
				+ "LEFT JOIN users AS d ON a.Username = d.Username "
				+ "WHERE a.Flag = 0 and a.Classtime=? AND a.Roomid = ?";
		return (List<Map<String,String>>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				return DataUtils.getHashMap(rs);
			}
		},date,roomid);
	}
	
	public List<Map<String,String>> findClassbyPosition(String date,int position) throws SQLException{
		String sql = "SELECT b.Roomname,a.Classtime,a.Id,c.Coursename,c.Classname,d.Phone,c.Students,a.Username,Section FROM bookings AS a "
				+ "LEFT JOIN rooms AS b ON a.Roomid = b.Id "
				+ "LEFT JOIN classinfo AS c ON a.Classid = c.Id "
				+ "LEFT JOIN users AS d ON a.Username = d.Username "
				+ "WHERE a.Flag = 0 and a.Classtime=? and b.Position=?";
		return (List<Map<String,String>>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				return DataUtils.getHashMap(rs);
			}
		},date,position);
	}
	
	public List<Map<String,String>> findClassSpeed(int roomid) throws SQLException{
		String sql = "SELECT a.Classtime,a.Id,c.Coursename,c.Classname,a.Username,Section FROM	bookings AS a LEFT JOIN rooms AS b ON a.Roomid = b.Id LEFT JOIN classinfo AS c ON a.Classid = c.Id WHERE a.Flag = 0 AND a.Roomid = ?";
		return (List<Map<String,String>>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				return DataUtils.getHashMap(rs);
			}
		},roomid);
	}
	
	public String getSchooldate() throws SQLException{
		String sql = "select Schooldate from schooldate";
		return (String) jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				String date = null;
				if(rs.next()){
					date = rs.getString(1);
				}
				return date;
				
			}
		});
		 
	}
	
	public Map<String, String> getSystemtime() throws SQLException{
		String sql = "select Systemstart,Systemclose from schooldate";
		return (Map<String, String>) jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				Map<String, String> date = new HashMap<String, String>();
				if(rs.next()){
					String a = rs.getString(1).substring(0,16);
					String b = rs.getString(2).substring(0,16);
					a = a.replace(' ', 'T');
					b = b.replace(' ', 'T');
//					System.out.println(b);
					date.put("systemstart", a);
					date.put("systemclose", b);
				}
				return date;
				
			}
		});
		 
	}
	
	public void insertSystemtime(String start,String end) throws SQLException{
		String sql = "update schooldate set Systemstart=?,Systemclose=?";
		jdbcTemplete.update(sql,start,end);
	}
	
}
