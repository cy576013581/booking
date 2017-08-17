package com.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ResourceBundle;

public class DBUtils {
	public static String URL;
	
	public static String USERNAME;
	
	public static String PASSWORD;
	
	public static String DRIVER;
	
	private static ResourceBundle rb = ResourceBundle.getBundle("db-config");
	
	private DBUtils(){}
	static {
		URL = rb.getString("jdbc.url");
		USERNAME = rb.getString("jdbc.username");
		PASSWORD = rb.getString("jdbc.password");
		DRIVER = rb.getString("jdbc.driver");
		try{
			Class.forName(DRIVER);
		} catch (ClassNotFoundException e){
			e.printStackTrace();
		}
		
	}
		
	public static Connection getConnection(){
		Connection conn = null;
		try {
			conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return conn;
	}
	public static void close(ResultSet rs,Statement stat,Connection conn){
		try{
			if(rs!=null)rs.close();
			if(stat!=null)stat.close();
			if(conn!=null)conn.close();
		}catch (SQLException e){
			e.printStackTrace();
		}
	}
}
