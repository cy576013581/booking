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

public class NoticeDAO {
	private JdbcTemplete jdbcTemplete = null;
	public NoticeDAO(){
		jdbcTemplete = new JdbcTemplete();
	}
	
	public List<Map<String,String>> findAllnotice() throws SQLException{
		String sql = "select Id,Title,Content,Releasetime from notice where Flag=0 order by Releasetime";
//		String sql = "select Classid,Classtime,Section from bookings where Username=? and Roomid=? and Flag=0";

		return (List<Map<String,String>>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				List<Map<String,String>> list =  DataUtils.getHashMap(rs);
				return list;
			}
		});
	}
	
	public Map<String,String> findnoticeById(int id) throws SQLException{
		String sql = "select Title,Content,Releasetime from notice where Flag=0 and Id=? order by Releasetime";
//		String sql = "select Classid,Classtime,Section from bookings where Username=? and Roomid=? and Flag=0";

		return (Map<String,String>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				List<Map<String,String>> list =  DataUtils.getHashMap(rs);
				return list.get(0);
			}
		},id);
	}
	
	public int getnoticeSum() throws SQLException{
		String sql = "select count(Id) from notice where Flag=0";
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
		});
	}
	
	public List<Map<String,String>> findAll(int pageindex) throws SQLException{
		String sql = "select Id,Title,Content,Releasetime from notice where Flag=0 order by Releasetime limit ?,?";
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
					u.put("title", rs.getString("Title"));
					u.put("content", rs.getString("Content"));
					u.put("releasetime", rs.getString("Releasetime"));
					list.add(u);
				}
				
				return list;
			}
		},pageindex,6);
	}
	
	public void insertNotice(String title,String content,String releasetime,int flag) throws SQLException{
		String sql = "insert into notice(Title,Content,Releasetime,Flag) values(?,?,?,?)";
		jdbcTemplete.update(sql,title,content,releasetime,flag);
	}
	public void updateAll(int id,String title,String content,String releasetime) throws SQLException{
		String sql = "update notice set Title=?,Content=?,Releasetime=? where Id=?";
		jdbcTemplete.update(sql,title,content,releasetime,id);
	}
	
	public void deleteNotice(int id) throws SQLException{
		String sql = "update notice set Flag=1 where Id=?";
		jdbcTemplete.update(sql,id);
	}
	
}
