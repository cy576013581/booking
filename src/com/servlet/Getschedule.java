package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.dao.ClassDAO;
import com.dao.ScheduleDAO;

public class Getschedule extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		    doPost(request,response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String act = request.getParameter("act");
//		System.out.println("--");
		if(act.equals("getSchedule")){
			getSchedule(request,response);
		}else if(act.equals("insertSchoolDate")){
			insertSchoolDate(request,response);
		}else if(act.equals("manageSchedule")){
			manageSchedule(request,response);
		}else if(act.equals("admingetSchoolDate")){
			admingetSchoolDate(request,response);
		}else if(act.equals("setSystemtime")){
			setSystemtime(request,response);
		}else if(act.equals("getSystemtime")){
			getSystemtime(request,response);
		}else if(act.equals("getScheduleSpeed")){
			getScheduleSpeed(request,response);
		}
	}
	
	public void getScheduleSpeed(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
//		int roomid = 5;
		int roomid = Integer.valueOf(request.getParameter("roomid"));
		ScheduleDAO sche = new ScheduleDAO();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		String strWeek[] = null;
		String week_Monthday = null;
		try {
			int section;
			int day;
			int weeks=0;
			int week=0;
			String classtime;
			Date classdate;
			strWeek = sche.getWeek().split(",");
			List<Map<String,String>> data = sche.findClassSpeed(roomid);
			for (int i = 0; i < data.size(); i++) {
				section = Integer.valueOf(data.get(i).get("section"));
				classtime = data.get(i).get("classtime");
				classdate = sdf.parse(classtime);
				c.setTime(classdate);
//				System.out.println(classdate);				
				for(int p = 0; p < strWeek.length; p++){
					Date monday = sdf.parse(strWeek[p]);
//					System.out.println(monday);
					  if (monday.getTime() <= classdate.getTime()) {
						  week = daysBetween(monday,classdate)+1;
						  if(week <= 7){
						  	weeks=p+1;
						  	break;
						  }
			          } 
				}
				data.get(i).put("station", "data-"+weeks+"-"+week+"-"+section);
//				System.out.println("station"+("lesson"+day+section)+" week"+week);
			}
			JSONArray result = new JSONArray(data);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
//			response.getWriter().println(result.toString());
//			System.out.println(week_Monthday);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	public int daysBetween(Date smdate,Date bdate) throws Exception{ 
		Calendar cal = Calendar.getInstance(); 
		cal.setTime(smdate); 
		long time1 = cal.getTimeInMillis(); 
		cal.setTime(bdate); 
		long time2 = cal.getTimeInMillis(); 
		long between_days=(time2-time1)/(1000*3600*24); 

		return Integer.parseInt(String.valueOf(between_days)); 
	}
	
	//设置系统开启、关闭时间
	public void setSystemtime(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String start = request.getParameter("start");
		String end = request.getParameter("end");
		start = start.replace('T', ' ');
		end = end.replace('T', ' ');
//		System.out.println(username);
//		int roomid = 5;
		ScheduleDAO sche = new ScheduleDAO();
		try {
			sche.insertSystemtime(start, end);
//			response.getWriter().println(result.toString());
//			System.out.println(week_Monthday);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	//获取系统开启、关闭时间
	public void getSystemtime(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		
		ScheduleDAO sche = new ScheduleDAO();
		Map<String, String> date = new HashMap<>();
		try {
			date = sche.getSystemtime();
			JSONObject result = new JSONObject(date);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
//			response.getWriter().println(result.toString());
//			System.out.println(week_Monthday);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	//获取学期开学时间
	public void admingetSchoolDate(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{

		ScheduleDAO sche = new ScheduleDAO();
		String date =null;
		try {
			date = sche.getSchooldate();
			JSONObject result = new JSONObject();
			result.put("date", date);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
//			response.getWriter().println(result.toString());
//			System.out.println(week_Monthday);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	//获取我的预约机房数据
	public void manageSchedule(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int week = Integer.valueOf(request.getParameter("week"));
		String username = request.getParameter("username");
//		System.out.println(username);
//		int roomid = 5;
		ScheduleDAO sche = new ScheduleDAO();
		String strWeek[] = null;
		String week_Monthday = null;
		try {
			strWeek = sche.getWeek().split(",");
			week_Monthday = strWeek[week-1];
			List<Map<String,String>> data = produceDate2(week_Monthday,username);
			JSONArray result = new JSONArray(data);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
//			response.getWriter().println(result.toString());
//			System.out.println(week_Monthday);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	public void getSchedule(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int week = Integer.valueOf(request.getParameter("week"));
		int roomid = Integer.valueOf(request.getParameter("roomid"));
//		int roomid = 5;
		ScheduleDAO sche = new ScheduleDAO();
		String strWeek[] = null;
		String week_Monthday = null;
		try {
			strWeek = sche.getWeek().split(",");
			week_Monthday = strWeek[week-1];
			List<Map<String,String>> data = produceDate(week_Monthday,roomid);
//			System.out.println(data);
			JSONArray result = new JSONArray(data);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
//			response.getWriter().println(result.toString());
//			System.out.println(week_Monthday);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	
	public List<Map<String,String>> produceDate(String strdate,int room){
		List<Map<String,String>> list = new ArrayList<Map<String,String>>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		Date date = null;
		try {
			date = sdf.parse(strdate);
			c.setTime(date);
//			System.out.println(date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		int month = c.get(Calendar.MONTH)+1;
//		System.out.println(month);
		Map<String,String> dates = new HashMap<String, String>();
		//获取格式的日期
		Map<String,String> dateall = new HashMap<String, String>();
		dates.put("month", month+"月");
		dates.put("date1", String.valueOf(c.get(Calendar.DAY_OF_MONTH)));
		dateall.put("date1", sdf.format(date));
		for (int i = 0; i < 6; i++) {
			long time = date.getTime(); 
			time+=24*60*60*1000; 
			date = new Date(time);
//			System.out.println(sdf.format(date));
			dateall.put("date"+(i+2), sdf.format(date));
			c.setTime(date);
			if(c.get(Calendar.MONTH)+1 == month){
//				System.out.println("tian"+(c.get(Calendar.MONTH)+1));
				dates.put("date"+(i+2), String.valueOf(c.get(Calendar.DAY_OF_MONTH)));
				
			}else {
				dates.put("date"+(i+2), (c.get(Calendar.MONTH)+1)+"月");
				month=c.get(Calendar.MONTH)+1;
			}
		}
//		System.out.println(dateall);
		list.add(dates);
		for (int i = 1; i < 8; i++) {
			String riqi = dateall.get("date"+i);
//			System.out.println(riqi);
			List<Map<String,String>> li= new ArrayList<>();
			li = getClass(riqi,room);
			if(li.size() != 0){
//				System.out.println("-----"+li+li.size());
				for(int j = 0; j < li.size(); j++)  
		        {  
					list.add(li.get(j));  
//		            System.out.println(list.get(i));  
		        }
			}
		}
		return list;
	}
	
	public List<Map<String,String>> produceDate2(String strdate,String username){
		List<Map<String,String>> list = new ArrayList<Map<String,String>>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		Date date = null;
		try {
			date = sdf.parse(strdate);
			c.setTime(date);
//			System.out.println(date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		int month = c.get(Calendar.MONTH)+1;
//		System.out.println(month);
		Map<String,String> dates = new HashMap<String, String>();
		//获取格式的日期
		Map<String,String> dateall = new HashMap<String, String>();
		dates.put("month", month+"月");
		dates.put("date1", String.valueOf(c.get(Calendar.DAY_OF_MONTH)));
		dateall.put("date1", sdf.format(date));
		for (int i = 0; i < 6; i++) {
			long time = date.getTime(); 
			time+=24*60*60*1000; 
			date = new Date(time);
//			System.out.println(sdf.format(date));
			dateall.put("date"+(i+2), sdf.format(date));
			c.setTime(date);
			if(c.get(Calendar.MONTH)+1 == month){
//				System.out.println("tian"+(c.get(Calendar.MONTH)+1));
				dates.put("date"+(i+2), String.valueOf(c.get(Calendar.DAY_OF_MONTH)));
				
			}else {
				dates.put("date"+(i+2), (c.get(Calendar.MONTH)+1)+"月");
				month=c.get(Calendar.MONTH)+1;
			}
		}
//		System.out.println(dateall);
		list.add(dates);
		for (int i = 1; i < 8; i++) {
			String riqi = dateall.get("date"+i);
//			System.out.println(riqi);
			List<Map<String,String>> li= new ArrayList<>();
			li = getClass2(riqi,username);
			if(li.size() != 0){
//				System.out.println("-----"+li+li.size());
				for(int j = 0; j < li.size(); j++)  
		        {  
					list.add(li.get(j));  
//		            System.out.println(list.get(i));  
		        }
			}
		}
		return list;
	}
	
	public List<Map<String,String>> getClass(String date,int room){
		List<Map<String,String>> list= new ArrayList<>();
		ScheduleDAO sche = new ScheduleDAO();
		try {
			list = sche.findClass(date,room);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;
		
	}
	
	public List<Map<String,String>> getClass2(String date,String username){
		List<Map<String,String>> list= new ArrayList<>();
		ScheduleDAO sche = new ScheduleDAO();
		try {
			list = sche.findClass2(date,username);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	
	//根据开学日期生成所有周的周一、为之后的获取预定数据提高效率
	public void insertSchoolDate(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String date = request.getParameter("date");
		System.out.println(date);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		ScheduleDAO sche = new ScheduleDAO();
		try {
			String strweek = produceMonthday(date);
			sche.deleteSchooldate();
			sche.insertSchooldate(date, strweek);
//			System.out.print(strweek.length());
//			response.getWriter().println("succss");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public String produceMonthday(String schooldate){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String Week_Schedule = schooldate;
		Calendar c = Calendar.getInstance();
		Date date = null;
		try {
			date = sdf.parse(schooldate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		c.setTime(date);
		int dayForWeek = 0;
		if(c.get(Calendar.DAY_OF_WEEK) == 1){
		  dayForWeek = 7;
		}else{
		  dayForWeek = c.get(Calendar.DAY_OF_WEEK) - 1;
		}
		Week_Schedule += ","+getDate(date,dayForWeek);
//		System.out.print(Week_Schedule);
		return Week_Schedule;
	}
	public String getDate(Date date,int day){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String week = null; 
		long time = date.getTime(); 
		day = (8-day)*24*60*60*1000; 
		time+=day; 
		date = new Date(time);
		week = sdf.format(date);
		for (int i = 0; i < 18; i++) {
			long time1 = date.getTime(); 
			time1+=7*24*60*60*1000; 
			date = new Date(time1);
			week += ","+sdf.format(date);
		}
		return week;
	}
}
