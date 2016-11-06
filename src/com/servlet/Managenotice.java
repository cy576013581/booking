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

import com.dao.NoticeDAO;
import com.dao.RoomDAO;
import com.dao.UserDAO;

public class Managenotice extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		    doPost(request,response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String act = request.getParameter("act");
		
		if(act.equals("getAllnotice")){
			getAllnotice(request,response);
		}else if(act.equals("getSum")){
			getSum(request,response);
		}else if(act.equals("deleteNotice")){
			deleteNotice(request,response);
		}else if(act.equals("updateNotice")){
			updateNotice(request,response);
		}else if(act.equals("addNotice")){
			addNotice(request,response);
		}
	}
	public void addNotice(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String releasetime = sdf.format(new Date());
//		System.out.println("page"+page);
		NoticeDAO notice = new NoticeDAO();
		try {
			notice.insertNotice(title, content, releasetime, 0);
//			System.out.println(data.get(0).get("id"));
//			List<Map<String,String>> data = dao.getNews(flag);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void updateNotice(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int id = Integer.valueOf(request.getParameter("id"));
		String title = request.getParameter("title");
		String content = request.getParameter("content");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String releasetime = sdf.format(new Date());
		//		System.out.println("page"+page);
		NoticeDAO notice = new NoticeDAO();
		
		try {
			notice.updateAll(id, title, content, releasetime);
//			System.out.println(data.get(0).get("id"));
//			List<Map<String,String>> data = dao.getNews(flag);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void deleteNotice(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int id = Integer.valueOf(request.getParameter("id"));
//		System.out.println("page"+page);
		NoticeDAO notice = new NoticeDAO();
		try {
			notice.deleteNotice(id);;
//			System.out.println(data.get(0).get("id"));
//			List<Map<String,String>> data = dao.getNews(flag);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	public void getAllnotice(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int page = Integer.valueOf(request.getParameter("page"))*6;
//		System.out.println("page"+page);
		NoticeDAO notice = new NoticeDAO();
		List<Map<String,String>> data = new ArrayList<>();
		try {
			data = notice.findAll(page);
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
	
	public void getSum(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		NoticeDAO notice = new NoticeDAO();
		int sum =0;
		try {
			sum = notice.getnoticeSum();
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
