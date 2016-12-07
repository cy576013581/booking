package com.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.util.DataUtils;
import com.util.JdbcTemplete;
import com.util.ResultSetHandler;

public class BookingDAO {
	
	private JdbcTemplete jdbcTemplete = null;
	public BookingDAO(){
		jdbcTemplete = new JdbcTemplete();
	}
	
	public int findByUsername(String classname,String coursename,int yearid) throws SQLException{
		String sql = "select Id from classinfo where Classname=? and Coursename=? and Flag=0 and Yearid=?";
		return (int)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(ResultSet rs) throws SQLException {
				
				// TODO Auto-generated method stub
				int n=0;
				if(rs.next()){
					n=rs.getInt("Id");
				}
				return n;
			}
		}, classname,coursename,yearid);
	}
	
	public void delByroomid(int roomid,int yearid) throws SQLException{
		String sql = "update bookings set Flag=1 where Roomid = ? and Yearid=?";
		jdbcTemplete.update(sql,roomid,yearid);
	}
	
	
	public List<Map<String,String>> findAllByusername(String username,int roomid,int yearid) throws SQLException{
		String sql = "select a2.Classname,a2.Coursename,Classtime,Section from bookings a1,classinfo a2 where a1.Username=? and a1.Roomid=? and a1.Flag=0 and a1.Classid = a2.Id and a1.Yearid=? order by a1.Classtime";
//		String sql = "select Classid,Classtime,Section from bookings where Username=? and Roomid=? and Flag=0";

		return (List<Map<String,String>>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				List<Map<String,String>> list =  DataUtils.getHashMap(rs);
				return list;
			}
		},username,roomid,yearid);
	}
	
	public int getbookingSum(String username,int yearid) throws SQLException{
		String sql = "select count(Id) from bookings where Username=? and Flag=0 and Yearid=?";
		return (int)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(ResultSet rs) throws SQLException {
				
				// TODO Auto-generated method stub
				int n=0;
				if(rs.next()){
					n=rs.getInt(1);
				}
				return n;
			}
		}, username,yearid);
	}
	
	public int getbookingSum(String username,String start,String end,int yearid) throws SQLException{
		String sql = "select count(Id) from bookings where Username=? and Flag=0 and Classtime>=? and Classtime<=? and Yearid=?";
		return (int)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(ResultSet rs) throws SQLException {
				
				// TODO Auto-generated method stub
				int n=0;
				if(rs.next()){
					n=rs.getInt(1);
				}
				return n;
			}
		}, username,start,end,yearid);
	}
	
	//管理端
	public int getCount(int yearid) throws SQLException{
		String sql = "select count(Id) from bookings where Flag=0 and Yearid=?";
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
		},yearid);
	}
	
	public int getCountbydate(String date,int yearid) throws SQLException{
		String sql = "select count(Id) from bookings where Flag=0 and Bookingtime=? and Yearid=?";
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
		},date,yearid);
	}
	
	public int getCountbydateandusername(String date,String username,int yearid) throws SQLException{
		String sql = "select count(Id) from bookings where Flag=0 and Bookingtime=? and Username=? and Yearid=?";
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
		},date,username,yearid);
	}
	
	public int getCountbyusername(String username,int yearid) throws SQLException{
		String sql = "select count(Id) from bookings where Flag=0 and Username=? and Yearid=?";
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
		},username,yearid);
	}
	
	public List<Map<String,String>> findAll(int pageindex,int yearid) throws SQLException{
		String sql = "select a.Id,c.Coursename,c.Classname,d.Phone,c.Students,a.Username,b.Roomname,a.Classtime,Bookingtime,Section "
				+ "from bookings  as a "
				+ "LEFT JOIN rooms as b ON a.Roomid=b.Id "
				+ "LEFT JOIN classinfo AS c ON a.Username=c.Username AND a.Classid=c.Id "
				+ "LEFT JOIN users AS d ON a.Username=d.Username "
				+ "WHERE a.Flag=0 and a.Yearid=? order by Classtime limit ?,?";
		return (List<Map<String,String>>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				final List<Map<String,String>> list = new ArrayList<Map<String,String>>();
				Map<String,String> u;
				while(rs.next()){
					u = new HashMap<String, String>();
					u.put("id", String.valueOf(rs.getInt("Id")));
					u.put("coursename", rs.getString("Coursename"));
					u.put("classname", rs.getString("Classname"));
					u.put("phone", rs.getString("Phone"));
					u.put("students", rs.getString("Students"));
					u.put("username", rs.getString("Username"));
					u.put("roomname", rs.getString("Roomname"));
					u.put("classtime", rs.getString("Classtime"));
					u.put("bookingtime", rs.getString("Bookingtime").substring(0, 19));
					u.put("section", rs.getString("Section"));
					list.add(u);
				}
				return list;
			}
		},yearid,pageindex,6);
	}
	
	public List<Map<String,String>> findAllbyusername(int pageindex,String username,int yearid) throws SQLException{
		String sql = "select a.Id,c.Coursename,c.Classname,d.Phone,c.Students,a.Username,b.Roomname,"
				+ "a.Classtime,Bookingtime,Section from bookings  as a LEFT JOIN rooms as b ON "
				+ "a.Roomid=b.Id LEFT JOIN classinfo AS c ON a.Username=c.Username AND a.Classid=c.Id "
				+ "LEFT JOIN users AS d ON a.Username=d.Username WHERE a.Flag=0 and a.Username=? and a.Yearid=? order by Classtime limit ?,?";
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
					u.put("coursename", rs.getString("Coursename"));
					u.put("classname", rs.getString("Classname"));
					u.put("phone", rs.getString("Phone"));
					u.put("students", rs.getString("Students"));
					u.put("username", rs.getString("Username"));
					u.put("roomname", rs.getString("Roomname"));
					u.put("classtime", rs.getString("Classtime"));
					u.put("bookingtime", rs.getString("Bookingtime").substring(0, 19));
					u.put("section", rs.getString("Section"));
					list.add(u);
				}
				
				return list;
			}
		},username,yearid,pageindex,6);
	}
	
	public List<Map<String,String>> findAllbySearch(int pageindex,String username,String date,int yearid) throws SQLException{
		String sql = "select a.Id,c.Coursename,c.Classname,d.Phone,c.Students,a.Username,b.Roomname,"
				+ "a.Classtime,Bookingtime,Section from bookings  as a LEFT JOIN rooms as b ON "
				+ "a.Roomid=b.Id LEFT JOIN classinfo AS c ON a.Username=c.Username AND a.Classid=c.Id "
				+ "LEFT JOIN users AS d ON a.Username=d.Username WHERE a.Flag=0 and a.Yearid=? and a.Username=? and a.Classtime=? order by Classtime limit ?,?";
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
					u.put("coursename", rs.getString("Coursename"));
					u.put("classname", rs.getString("Classname"));
					u.put("phone", rs.getString("Phone"));
					u.put("students", rs.getString("Students"));
					u.put("username", rs.getString("Username"));
					u.put("roomname", rs.getString("Roomname"));
					u.put("classtime", rs.getString("Classtime"));
					u.put("bookingtime", rs.getString("Bookingtime").substring(0, 19));
					u.put("section", rs.getString("Section"));
					list.add(u);
				}
				
				return list;
			}
		},username,date,pageindex,6,yearid);
	}
	
	public List<Map<String,String>> findAllbydate(int pageindex,String date,int yearid) throws SQLException{
		String sql = "select a.Id,c.Coursename,c.Classname,d.Phone,c.Students,a.Username,b.Roomname,"
				+ "a.Classtime,Bookingtime,Section from bookings  as a LEFT JOIN rooms as b ON "
				+ "a.Roomid=b.Id LEFT JOIN classinfo AS c ON a.Username=c.Username AND a.Classid=c.Id "
				+ "LEFT JOIN users AS d ON a.Username=d.Username WHERE a.Flag=0 and a.Yearid=? and a.Classtime=? order by Classtime limit ?,?";
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
					u.put("coursename", rs.getString("Coursename"));
					u.put("classname", rs.getString("Classname"));
					u.put("phone", rs.getString("Phone"));
					u.put("students", rs.getString("Students"));
					u.put("username", rs.getString("Username"));
					u.put("roomname", rs.getString("Roomname"));
					u.put("classtime", rs.getString("Classtime"));
					u.put("bookingtime", rs.getString("Bookingtime").substring(0, 19));
					u.put("section", rs.getString("Section"));
					list.add(u);
				}
				
				return list;
			}
		},date,pageindex,6,yearid);
	}
	
	public Map<String,String> findbyId(int id) throws SQLException{
		String sql = "select a.Id,c.Coursename,c.Classname,a.Roomid,"
				+ "a.Classtime,Section from bookings as a LEFT JOIN classinfo AS c ON a.Username=c.Username AND a.Classid=c.Id "
				+ "WHERE a.Flag=0 and a.Id=?";
		return (Map<String,String>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				Map<String,String> u = new HashMap();
				while(rs.next()){
//					System.out.println(p++);
					u = new HashMap<String, String>();
					u.put("id", String.valueOf(rs.getInt("Id")));
					u.put("coursename", rs.getString("Coursename"));
					u.put("classname", rs.getString("Classname"));
					u.put("roomid", rs.getString("Roomid"));
					u.put("classtime", rs.getString("Classtime"));
					u.put("section", rs.getString("Section"));
				}
				
				return u;
			}
		},id);
	}
	
	public void delbooking(int delid) throws SQLException{
		String sql = "update bookings set Flag=1 where Id = ?";
		jdbcTemplete.update(sql,delid);
	}
	
	public boolean checkBooking(int roomid,String classtime,int section,int yearid) throws SQLException{
		String sql = "select Id from bookings where Roomid=? and Classtime=? and Section=? and Flag=0 and Yearid=?";
		return (boolean)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(ResultSet rs) throws SQLException {
				
				// TODO Auto-generated method stub
				if(rs.next()){
					return false;
				}else{
					return true;
				}
			}
		},roomid,classtime,section,yearid);
	}
	
	public int selectBookingId(int roomid,String classtime,int section,int yearid) throws SQLException{
		String sql = "select Id from bookings where Roomid=? and Classtime=? and Section=? and Flag=0 and Yearid=?";
		return (int)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(ResultSet rs) throws SQLException {
				
				// TODO Auto-generated method stub
				int id = 0;
				if(rs.next()){
					id = rs.getInt("Id");
				}
				return id;
			}
		},roomid,classtime,section,yearid);
	}
	
	public int getBookingID(int roomid,String classtime,int section,int yearid) throws SQLException{
		String sql = "select Id from bookings where Roomid=? and Classtime=? and Section=? and Flag=0 and Yearid=?";
		return (int)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(ResultSet rs) throws SQLException {
				
				// TODO Auto-generated method st
				int id=0;
				if(rs.next()){
					id = rs.getInt("Id");
				}
				return id;
			}
		},roomid,classtime,section,yearid);
	}
	
	public void booking(int roomid,String username,int classid,String classtime,String bookingtime,int section,int yearid) throws SQLException{
		String sql = "insert into bookings(Roomid,Username,Classid,Classtime,Bookingtime,Section,Flag,Yearid) values(?,?,?,?,?,?,?,?)";
		jdbcTemplete.update(sql,roomid,username,classid,classtime,bookingtime,section,0,yearid);
	}
	//修改没有写
	
	public void updateBooking(int id,int roomid,int classid,String classtime,String bookingtime,int section) throws SQLException{
		String sql = "update bookings set Roomid=?,Classid=?,Classtime=?,Bookingtime=?,Section=? where id=?";
		jdbcTemplete.update(sql,roomid,classid,classtime,bookingtime,section,id);
	}
	
	public int getBookingCount7(int day,int yearid) throws SQLException{
		String sql = "SELECT count(Id) FROM bookings WHERE TO_DAYS( NOW( ) ) - TO_DAYS(Bookingtime) = ? and Yearid = ?";
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
		},day,yearid);
	}
	
}
