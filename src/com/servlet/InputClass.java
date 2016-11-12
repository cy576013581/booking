package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.dao.BookingDAO;
import com.dao.ClassDAO;
import com.util.CheckSession;

public class InputClass extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		    doPost(request,response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String act = request.getParameter("act");
		if(CheckSession.check(request)){
			if(act.equals("getClass")){
				getClass(request,response);
			}else if(act.equals("addClass")){
				addClass(request,response);
			}else if(act.equals("getClassById")){
				getClassById(request,response);
			}else if(act.equals("editClass")){
				editClass(request,response);
			}else if(act.equals("deleteClass")){
				deleteClass(request,response);
			}
		}
//		System.out.println("--");
		
		
	}
	
	public void deleteClass(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int id = Integer.valueOf(request.getParameter("id"));
//		System.out.println("id:"+id);
		ClassDAO cla = new ClassDAO();
		BookingDAO book = new BookingDAO();
		try {
			cla.deleteClass(id);
			book.delByroomid(id);
			response.getWriter().println("true");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	public void editClass(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int id = Integer.valueOf(request.getParameter("id"));
		String coursename = request.getParameter("coursename");
		String classname = request.getParameter("classname");
		
		int students = Integer.valueOf(request.getParameter("students"));
//		System.out.println("id:"+id+"-coursename:"+coursename+"-classname:"+classname+"-students:"+students);
		ClassDAO cla = new ClassDAO();
		try {
			cla.editClass(id, coursename, classname, students);

			response.getWriter().println("true");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	public void addClass(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String username = request.getParameter("username");
		String coursename = request.getParameter("coursename");
		String classname = request.getParameter("classname");
		int students = Integer.valueOf(request.getParameter("students"));
		ClassDAO cla = new ClassDAO();
		try {
			Map<String,String> data = new HashMap<String, String>();
			
			cla.addClass(username, coursename, classname, students);;
			int id = cla.getMaxId();
//			System.out.println("id"+id);
			data.put("id", String.valueOf(id));
//			List<Map<String,String>> data = dao.getNews(flag);
			JSONObject result = new JSONObject(data);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void getClassById(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int id = Integer.valueOf(request.getParameter("id"));
		ClassDAO cla = new ClassDAO();
		try {
			Map<String,String> data = cla.getClassById(id);
//			List<Map<String,String>> data = dao.getNews(flag);
			JSONObject result = new JSONObject(data);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void getClass(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String username = request.getParameter("username");
		ClassDAO cla = new ClassDAO();
		try {
			List<Map<String,String>> data = cla.getClass1(username);
//			List<Map<String,String>> data = dao.getNews(flag);
			JSONArray result = new JSONArray(data);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
