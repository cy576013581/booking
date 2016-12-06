package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;
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
import com.dao.NoticeDAO;
import com.dao.ScheduleDAO;
import com.util.CheckSession;

public class Mybooking extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		    doPost(request,response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String act = request.getParameter("act");
//		System.out.println("--");
		if(CheckSession.check(request)){
			if(act.equals("getbookingSum")){
				getbookingSum(request,response);
			}else if(act.equals("getNowSum")){
				getNowSum(request,response);
			}else if(act.equals("getnoticeSum")){
				getnoticeSum(request,response);
			}else if(act.equals("getAllnotice")){
				getAllnotice(request,response);
			}else if(act.equals("getnoticeById")){
				getnoticeById(request,response);
			}
		}
		
	}
	
	public void getnoticeById(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
//		System.out.println(classname+"-"+coursename);
		int id = Integer.valueOf(request.getParameter("id"));
		NoticeDAO notice = new NoticeDAO();
		Map<String,String> map = null;
		try {
			map = notice.findnoticeById(id);
			JSONObject data = new JSONObject(map);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(data.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void getAllnotice(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
//		System.out.println(classname+"-"+coursename);
		NoticeDAO notice = new NoticeDAO();
		List<Map<String,String>> list = null;
		try {
			list = notice.findAllnotice();
			JSONArray data = new JSONArray(list);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(data.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void getnoticeSum(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
//		System.out.println(classname+"-"+coursename);
		NoticeDAO notice =new NoticeDAO();
		try {
			int sum = notice.getnoticeSum();
			response.getWriter().println(sum);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void getNowSum(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String username = request.getParameter("username");
		int nowweek = Integer.valueOf(request.getParameter("nowweek"));
//		System.out.println(classname+"-"+coursename);
		ScheduleDAO sche = new ScheduleDAO();
		BookingDAO book =new BookingDAO();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		try {
			int yearid = sche.getYearID();
			String strWeek[] = sche.getWeek().split(",");
			String start = strWeek[nowweek-1];
			Date date = sdf.parse(start);
			long time = date.getTime();
			time+=6*24*60*60*1000; 
			date = new Date(time);
			String end = sdf.format(date);
//			System.out.println(start+"-"+end);
			int sum = book.getbookingSum(username,start,end,yearid);
//			System.out.println(sum);
			response.getWriter().println(sum);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void getbookingSum(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String username = request.getParameter("username");
//		System.out.println(classname+"-"+coursename);
		BookingDAO book =new BookingDAO();
		ScheduleDAO sche = new ScheduleDAO();
		try {
			int yearid = sche.getYearID();
			int sum = book.getbookingSum(username,yearid);
			response.getWriter().println(sum);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
