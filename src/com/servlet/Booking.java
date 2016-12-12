package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.crypto.Data;

import org.json.JSONArray;
import org.json.JSONObject;

import com.dao.BookingDAO;
import com.dao.ScheduleDAO;
import com.dao.UserDAO;
import com.util.CheckSession;

public class Booking extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		    doPost(request,response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		if(CheckSession.check(request)){
			String act = request.getParameter("act");
//			System.out.println("--");
			if(act.equals("booking")){
				booking(request,response);
			}else if(act.equals("bookingBySpeed")){
				bookingBySpeed(request,response);
			}else if(act.equals("getAlready")){
				getAlready(request,response);
			}else if(act.equals("delbooking")){
				delbooking(request,response);
			}else if(act.equals("updateBooking")){
				updateBooking(request,response);
			}else if(act.equals("getBooking")){
				getBooking(request,response);//预定编辑的时候根据id获取原来的预定信息
			}else if(act.equals("checkDate")){
				checkDate(request,response);//检查预定时间是否符合系统开启时间
			}
		}
	}
	public void checkDate(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		Date date = new Date();
		Date systemstart;
		Date systemclose;
		long starttime;
		long closetime;
		long nowtime;
//		System.out.println(date);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		ScheduleDAO sche = new ScheduleDAO();
		
		try {
			JSONObject result = new JSONObject();
			nowtime = date.getTime();
			Map<String, String> map_time = sche.getSystemtime();
			if(map_time.get("systemstart") ==null || map_time.get("systemstart") ==""){
				if(map_time.get("systemclose") ==null || map_time.get("systemclose") ==""){
					result.put("result", "1");
				}else{
					systemclose = sdf.parse(map_time.get("systemclose").replace('T', ' ').concat(":00"));
					closetime = systemclose.getTime();
					if(nowtime<=closetime){
						result.put("result", "1");
					}else{
						result.put("result", "0");
					}
				}				
			}else{
				systemstart = sdf.parse(map_time.get("systemstart").replace('T', ' ').concat(":00"));
				systemclose = sdf.parse(map_time.get("systemclose").replace('T', ' ').concat(":00"));
				starttime = systemstart.getTime();
				closetime = systemclose.getTime();
				if(nowtime>=starttime && nowtime<=closetime){
					result.put("result", "1");
				}else{
					result.put("result", "0");
				}
			}
			
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void bookingBySpeed(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String username = request.getParameter("username");
		String classname = request.getParameter("classname");
		String coursename = request.getParameter("coursename");
		
		int roomid = Integer.valueOf(request.getParameter("roomid"));
		int section = Integer.valueOf(request.getParameter("section"));
		int weeks = Integer.valueOf(request.getParameter("weeks"));
		int week = Integer.valueOf(request.getParameter("week"));
		String classtime = new String();//根据上课第几周、星期几来推算日期
		ScheduleDAO sche = new ScheduleDAO();
		String strWeek[] = null;
		try {
			strWeek = sche.getWeek().split(",");
			String week_Monthday = strWeek[weeks-1];
			SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd");
			Date date = dateformat.parse(week_Monthday);
			long time = date.getTime(); 
			time+=(week-1)*24*60*60*1000; 
			date = new Date(time);
			classtime  = dateformat.format(date);
//			System.out.println(classtime);
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		System.out.println(classname+"-"+coursename+"-"+classtime);
		BookingDAO book = new BookingDAO();
		try {
			int yearid = sche.getYearID();
			String bookingtime = sdf.format(new Date());
			int classid = book.findByUsername(classname, coursename,yearid);
//			System.out.println(classid);
			JSONObject result = new JSONObject();
//			System.out.println(roomid+"-"+classid+"-"+classtime+"-"+section);
			boolean flag = book.checkBooking(roomid, classtime, section,yearid);
			if(flag){
				book.booking(roomid, username, classid, classtime, bookingtime, section,yearid);
				int successid = book.getBookingID(roomid, classtime, section,yearid);
				result.put("state", "success");
				result.put("id", successid);
			}else{
				//已经有人预定 
				result.put("state", "error");
			}
			
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void getBooking(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int id = Integer.valueOf(request.getParameter("id"));
//		System.out.println(id);
		BookingDAO book =new BookingDAO();
		Map<String,String> data = new HashMap<String, String>();
		try {
			data = book.findbyId(id);
			String classtime = data.get("classtime");
			ScheduleDAO sche = new ScheduleDAO();
			String strWeek[] = null;
			try {
				SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd");
				Date classdate = dateformat.parse(classtime);
				Date date;
				int weeks=0;
				int week=0;
				strWeek = sche.getWeek().split(",");
				for(int p = 0; p < strWeek.length; p++){
					date = dateformat.parse(strWeek[p]);
//					System.out.println(monday);
					  if (date.getTime() <= classdate.getTime()) {
						  	if(daysBetween(date,classdate)<7){
						  		weeks=p+1;
						  		week=daysBetween(date,classdate)+1;
						  		break;
						  	}
			            } 
				}
				data.put("weeks", String.valueOf(weeks));
				data.put("week", String.valueOf(week));
				
//				System.out.println(classtime);
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			JSONObject result = new JSONObject(data);
//			System.out.println(result);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void updateBooking(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int id = Integer.valueOf(request.getParameter("id"));
		String classname = request.getParameter("classname");
		String coursename = request.getParameter("coursename");
		String username = request.getParameter("username");
		
		int roomid = Integer.valueOf(request.getParameter("roomid"));
		int section = Integer.valueOf(request.getParameter("section"));
		int weeks = Integer.valueOf(request.getParameter("weeks"));
		int week = Integer.valueOf(request.getParameter("week"));
		String classtime = new String();//根据上课第几周、星期几来推算日期
		ScheduleDAO sche = new ScheduleDAO();
		String strWeek[] = null;
		try {
			strWeek = sche.getWeek().split(",");
			String week_Monthday = strWeek[weeks-1];
			SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd");
			Date date = dateformat.parse(week_Monthday);
			long time = date.getTime(); 
			time+=(week-1)*24*60*60*1000; 
			date = new Date(time);
			classtime  = dateformat.format(date);
//			System.out.println(classtime);
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		System.out.println(classname+"-"+coursename+"-"+classtime);
		BookingDAO book = new BookingDAO();
		try {
			int yearid = sche.getYearID();
			String bookingtime = sdf.format(new Date());
			int classid = book.findByUsername(classname, coursename,yearid);
//			System.out.println(classid);
			JSONObject result = new JSONObject();
//			System.out.println(roomid+"-"+classid+"-"+classtime+"-"+section);
			boolean flag = book.checkBookingMy(roomid, classtime, section,yearid,username);
			if(flag){
				book.updateBooking(id, roomid, classid, classtime, bookingtime, section);;
				result.put("state", "success");
			}else{
				//已经有人预定 
				result.put("state", "error");
			}
			
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void delbooking(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int bookingid = Integer.valueOf(request.getParameter("bookingid"));
		
//		System.out.println(classname+"-"+coursename);
		BookingDAO book =new BookingDAO();
		try {
			book.delbooking(bookingid);
//			response.getWriter().println("success");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void getAlready(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String username = request.getParameter("username");
		int roomid = Integer.valueOf(request.getParameter("roomid"));

//		System.out.println(username+"-s"+roomid);
		BookingDAO book =new BookingDAO();
		ScheduleDAO sche = new ScheduleDAO();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		try {
			int section;
			int day;
			int week=0;
			String classtime;
			Date classdate;
			
			String strWeek[] = sche.getWeek().split(",");
			int yearid = sche.getYearID();
			List<Map<String,String>> data = book.findAllByusername(username, roomid,yearid);
//			System.out.println(data.size());
			for (int i = 0; i < data.size(); i++) {
				section = Integer.valueOf(data.get(i).get("section"));
				classtime = data.get(i).get("classtime");
				classdate = sdf.parse(classtime);
				c.setTime(classdate);
//				System.out.println(classdate);
				day = c.get(Calendar.DAY_OF_WEEK)-1;
				
				for(int p = 0; p < strWeek.length; p++){
					Date monday = sdf.parse(strWeek[p]);
//					System.out.println(monday);
					  if (monday.getTime() <= classdate.getTime()) {
						  	if(daysBetween(monday,classdate)<7){
						  		week=p+1;
						  		break;
						  	}
			            } 
				}
				data.get(i).put("station", "lesson"+day+section);
				data.get(i).put("week", String.valueOf(week));
//				System.out.println("station"+("lesson"+day+section)+" week"+week);
			}
//			System.out.println(data);
			JSONArray result = new JSONArray(data);
//			List<Map<String,String>> data = dao.getNews(flag);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void booking(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String username = request.getParameter("username");
		String classname = request.getParameter("classname");
		String coursename = request.getParameter("coursename");
		
		int roomid = Integer.valueOf(request.getParameter("roomid"));
		int section = Integer.valueOf(request.getParameter("section"));
		String classtime = request.getParameter("classtime");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		ScheduleDAO sche = new ScheduleDAO();
//		System.out.println(classname+"-"+coursename);
		BookingDAO book =new BookingDAO();
		try {
			int yearid = sche.getYearID();
			String bookingtime = sdf.format(new Date());
//			System.out.println(bookingtime);
			int classid = book.findByUsername(classname, coursename,yearid);
			JSONObject result = new JSONObject();
//			System.out.println(classname+"-"+coursename+"-"+classid);
//			System.out.println(roomid+"-"+username+"-"+classid+"-"+classtime+"-"+bookingtime+"-"+section);
			boolean flag = book.checkBooking(roomid, classtime, section,yearid);
//			System.out.println(flag);
			if(flag){
				book.booking(roomid, username, classid, classtime, bookingtime, section,yearid);
				result.put("state", "success");
			}else{
				//已经有人预定 
				result.put("state", "error");
			}
			int maxid = book.getBookingID(roomid, classtime, section,yearid);
			result.put("id", maxid);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
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
}
