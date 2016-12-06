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

	public Integer getYearID() throws SQLException{
		String sql = "select Id from schooldate WHERE Flag = 0";
		return (Integer) jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				int id = 0;
				if(rs.next()){
					id = rs.getInt(1);
				}
				return id;
				
			}
		});
		 
	}
	public void deleteSchooldate() throws SQLException{
		String sql = "UPDATE schooldate SET Flag=1";
		jdbcTemplete.update(sql);
	}
	
	public void insertSchooldate(String yearname,String schooldate,String week) throws SQLException{
		String sql = "insert into schooldate(Yearname,Schooldate,Week_monday,Flag) values(?,?,?,0)";
		jdbcTemplete.update(sql,yearname,schooldate,week);
	}
	
	public String getWeek() throws SQLException{
		String sql = "select Week_monday from schooldate WHERE Flag = 0";
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
	
	//导出机房的Excel
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
	
	//导出分校区的Excel
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
	
	public Map<String, String> getSchooldate() throws SQLException{
		String sql = "select Schooldate,Yearname from schooldate WHERE Flag = 0";
		return (Map<String, String>) jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				Map<String, String> date = new HashMap<String, String>();
				if(rs.next()){
					date.put("date", rs.getString(1));
					date.put("yearname", rs.getString(2));
				}
				return date;
				
			}
		});
		 
	}
	
	public Map<String, String> getSystemtime() throws SQLException{
		String sql = "select Systemstart,Systemclose from schooldate WHERE Flag = 0";
		return (Map<String, String>) jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				Map<String, String> date = new HashMap<String, String>();
				if(rs.next()){
					String a ="";
					String b ="";
					if(rs.getString(1) != null){
						a = rs.getString(1).substring(0,16).replace(' ', 'T');
					}
					if(rs.getString(2) != null){
						b = rs.getString(2).substring(0,16).replace(' ', 'T');
					}
//					System.out.println(b);
					date.put("systemstart", a);
					date.put("systemclose", b);
				}
				return date;
				
			}
		});
		 
	}
	
	public void insertSystemtime(String start,String end) throws SQLException{
		String sql = "update schooldate set Systemstart=?,Systemclose=? WHERE Flag = 0";
		jdbcTemplete.update(sql,start,end);
	}
	
}
