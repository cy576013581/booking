package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.dao.BookingDAO;
import com.dao.RoomDAO;
import com.dao.ScheduleDAO;
import com.dao.UserDAO;
import com.util.CheckSession;

public class Managerbooking extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		    doPost(request,response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String act = request.getParameter("act");
		if(CheckSession.check(request)){
			if(act.equals("getAllbooking")){
				getAllbooking(request,response);
			}else if(act.equals("getSum")){
				getSum(request,response);
			}else if(act.equals("deleteBooking")){
				deleteBooking(request,response);
			}else if(act.equals("updateBooking")){
				updateBooking(request,response);
			}else if(act.equals("addBooking")){
				addBooking(request,response);
			}else if(act.equals("getAllbyrearch")){
				getAllbyrearch(request,response);
			}else if(act.equals("getSearchcount")){
				getSearchcount(request,response);
			}else if(act.equals("getRoom")){
				getRoom(request,response);
			}
		}
		
	}
	
	public void getRoom(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
//		System.out.println("page"+page);
		RoomDAO room = new RoomDAO();
		List<Map<String,String>> data = new ArrayList<>();
		try {
			data = room.findAllroom();
//			System.out.println(data.get(0).get("id"));
//			List<Map<String,String>> data = dao.getNews(flag);
			JSONArray result = new JSONArray(data);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void getSearchcount(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String classtime = request.getParameter("date");
		String username = request.getParameter("username");
//		System.out.println("classtime"+classtime+"username"+username);
		BookingDAO booking = new BookingDAO();
		ScheduleDAO sche = new ScheduleDAO();
		int sum =0;
		try {
			int yearid = sche.getYearID();
			if(classtime.isEmpty() && !username.isEmpty()){
//				System.out.println("username");
				sum = booking.getCountbyusername(username,yearid);
			}
			if(!classtime.isEmpty() && username.isEmpty()){
//				System.out.println("classtime");
				sum = booking.getCountbydate(classtime,yearid);
			}
			if(!classtime.isEmpty() && !username.isEmpty()){
//				System.out.println("two");
				sum = booking.getCountbydateandusername(classtime, username,yearid);
			}
			
//			List<Map<String,String>> data = dao.getNews(flag);
			JSONObject result = new JSONObject();
			result.put("sum", sum);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	
	public void getAllbyrearch(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int page = Integer.valueOf(request.getParameter("page"))*6;
		String classtime = request.getParameter("date");
		String username = request.getParameter("username");
//		System.out.println("page"+page);
		BookingDAO booking = new BookingDAO();
		ScheduleDAO sche = new ScheduleDAO();
		List<Map<String,String>> data = new ArrayList<>();
		try {
			int yearid = sche.getYearID();
			if(classtime.isEmpty() && !username.isEmpty()){
//				System.out.println("usernamesad");
				data = booking.findAllbyusername(page,username,yearid);
			}
			if(!classtime.isEmpty() && username.isEmpty()){
//				System.out.println("classtime");
				
				data = booking.findAllbydate(page,classtime,yearid);
			}
			if(!classtime.isEmpty() && !username.isEmpty()){
//				System.out.println("two");
				data = booking.findAllbySearch(page, username, classtime,yearid);
			}
//			System.out.println(data.get(0).get("id"));
//			List<Map<String,String>> data = dao.getNews(flag);
			JSONArray result = new JSONArray(data);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	

	
	public void addBooking(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String username = request.getParameter("username");
		String classname = request.getParameter("classname");
		String coursename = request.getParameter("coursename");
		
		int roomid = Integer.valueOf(request.getParameter("roomid"));
		int section = Integer.valueOf(request.getParameter("section"));
		String classtime = request.getParameter("classtime");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
//		System.out.println(classname+"-"+coursename);
		BookingDAO book =new BookingDAO();
		ScheduleDAO sche = new ScheduleDAO();
		try {
			int yearid = sche.getYearID();
			String bookingtime = sdf.format(new Date());
			JSONObject result = new JSONObject();
			int classid = book.findByUsername(classname, coursename,yearid);
//			System.out.println(roomid+"-"+classid+"-"+classtime+"-"+section);
			boolean flag = book.checkBooking(roomid, classtime, section,yearid);
			if(flag){
				book.booking(roomid, username, classid, classtime, bookingtime, section,yearid);
				result.put("state", "success");
			}else{
				//已经有人预定 
				result.put("state", "error");
			}
			
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
//			System.out.println(data.get(0).get("id"));
//			List<Map<String,String>> data = dao.getNews(flag);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void updateBooking(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String username = request.getParameter("username");
		String classname = request.getParameter("classname");
		String coursename = request.getParameter("coursename");
		
		int roomid = Integer.valueOf(request.getParameter("roomid"));
		int section = Integer.valueOf(request.getParameter("section"));
		String classtime = request.getParameter("classdate");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		System.out.println(classname+"-"+coursename+"-"+classtime);
		BookingDAO book = new BookingDAO();
		ScheduleDAO sche = new ScheduleDAO();
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
				UserDAO user = new UserDAO();
				Map<String , String> map = user.getAccount(username);
				result.put("state", "success");
				result.put("students", map.get("students"));
				result.put("phone", map.get("phone"));
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
	
	public void deleteBooking(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int id = Integer.valueOf(request.getParameter("id"));
//		System.out.println("page"+page);
		BookingDAO booking = new BookingDAO();
		try {
			booking.delbooking(id);;
//			System.out.println(data.get(0).get("id"));
//			List<Map<String,String>> data = dao.getNews(flag);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	public void getAllbooking(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int page = Integer.valueOf(request.getParameter("page"))*6;
//		System.out.println("page"+page);
		BookingDAO booking = new BookingDAO();
		ScheduleDAO sche = new ScheduleDAO();
		List<Map<String,String>> data = new ArrayList<>();
		try {
			int yearid = sche.getYearID();
			data = booking.findAll(page,yearid);
			JSONArray result = new JSONArray(data);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void getSum(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		BookingDAO booking = new BookingDAO();
		ScheduleDAO sche = new ScheduleDAO();
		int sum =0;
		try {
			int yearid = sche.getYearID();
			sum = booking.getCount(yearid);
//			List<Map<String,String>> data = dao.getNews(flag);
			JSONObject result = new JSONObject();
			result.put("sum", sum);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
