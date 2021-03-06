package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
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

public class Managerview extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		    doPost(request,response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String act = request.getParameter("act");
		if(CheckSession.check(request)){
			if(act.equals("getCount")){
				getCount(request,response);
			}else if(act.equals("getLogin")){
				getLogin(request,response);
			}else if(act.equals("getBooking")){
				getBooking(request,response);
			}else if(act.equals("getYearname")){
				getYearname(request,response);
			}
		}
		
	}
	
	public void getYearname(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		ScheduleDAO sche = new ScheduleDAO();
		try {
			String yearname = sche.getYearname();
			JSONObject data = new JSONObject();
			data.put("yearname", yearname);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(data.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public void getBooking(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		ScheduleDAO sche = new ScheduleDAO();
		BookingDAO book = new BookingDAO();
		JSONObject data = new JSONObject();
		try {
			int yearid = sche.getYearID();
			int count;
			for (int i = 1; i <= 7; i++) {
				count = book.getBookingCount7(i, yearid);
				data.put("day"+(8-i), count);
			}
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(data.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	public void getLogin(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		UserDAO user = new UserDAO();
		JSONObject data = new JSONObject();
		try {
			for (int i = 1; i <= 7; i++) {
				data.put("day"+(8-i), user.getLoginCount7(i));
			}
			
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(data.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	public void getCount(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		
		int countuser = 0;
		int countlogin = 0;
		int countbooking = 0;
		int countroom = 0;
		UserDAO user = new UserDAO();
		BookingDAO book = new BookingDAO();
		RoomDAO room = new RoomDAO();
		ScheduleDAO sche = new ScheduleDAO();
		try {
			int yearid = sche.getYearID();
			countuser = user.getCount();
			countlogin = user.getLoginCount();
			countbooking = book.getCount(yearid);
			countroom = room.getCount();
//			System.out.println(data.get(0).get("id"));
//			Map<String,String> data = dao.getNews(flag);
			JSONObject data = new JSONObject();
			data.put("countuser", countuser);
			data.put("countlogin", countlogin);
			data.put("countbooking", countbooking);
			data.put("countroom", countroom);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(data.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
