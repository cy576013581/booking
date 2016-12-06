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

public class RoomDAO {
	private JdbcTemplete jdbcTemplete = null;
	public RoomDAO(){
		jdbcTemplete = new JdbcTemplete();
	}
	public List<Map<String,String>> findAllroom() throws SQLException{
		String sql = "select Id,Roomname,Students,Branchid,Firstchar from rooms order by Firstchar";
		return (List<Map<String,String>>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				return DataUtils.getHashMap(rs);
			}
		});
	}
	
	public List<Map<String,String>> findAllBranch() throws SQLException{
		String sql = "select * from branch";
		return (List<Map<String,String>>)jdbcTemplete.query(sql, new ResultSetHandler() {
			
			@Override
			public Object doHandler(final ResultSet rs) throws SQLException {
				// TODO Auto-generated method stub
				return DataUtils.getHashMap(rs);
			}
		});
	}

	
	public int getCount() throws SQLException{
		String sql = "select count(Id) from rooms";
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
	public List<Map<String,String>> findAll(int pageindex) throws SQLException{
		String sql = "select Id,Roomname,Students from rooms limit ?,?";
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
					u.put("roomname", rs.getString("Roomname"));
					u.put("students", rs.getString("Students"));
					list.add(u);
				}
				
				return list;
			}
		},pageindex,6);
	}
	public void deleteBranch(int id) throws SQLException{
		String sql = "delete from branch where Id=?";
		jdbcTemplete.update(sql,id);
	}
	
	public void updateBranch(int id,String areaname) throws SQLException{
		String sql = "update branch set Areaname=? where Id=?";
		jdbcTemplete.update(sql,areaname,id);
	}
	public void insertBranch(String areaname) throws SQLException{
		String sql = "insert into branch(Areaname) values(?)";
		jdbcTemplete.update(sql,areaname);
	}
	
	public void insertRoom(String roomname,String firstchar,int students,int branchid) throws SQLException{
		String sql = "insert into rooms(Roomname,Firstchar,Students,Branchid) values(?,?,?,?)";
		jdbcTemplete.update(sql,roomname,firstchar,students,branchid);
	}
	public void updateAll(int id,String roomname,String firstchar,int students) throws SQLException{
		String sql = "update rooms set Roomname=?,Students=?,Firstchar=? where Id=?";
		jdbcTemplete.update(sql,roomname,firstchar,students,id);
	}
	
	public void deleteRoom(int id) throws SQLException{
		String sql = "delete from rooms where Id=?";
		jdbcTemplete.update(sql,id);
	}
	public void deleteRoomByBranchid(int branchid) throws SQLException{
		String sql = "delete from rooms where Branchid=?";
		jdbcTemplete.update(sql,branchid);
	}
	
}
