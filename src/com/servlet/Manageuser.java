package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.dao.UserDAO;
import com.util.CheckSession;

public class Manageuser extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		    doPost(request,response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String act = request.getParameter("act");
		if(CheckSession.check(request)){
			if(act.equals("getAlluser")){
				getAlluser(request,response);
			}else if(act.equals("getSum")){
				getSum(request,response);
			}else if(act.equals("deleteUser")){
				deleteUser(request,response);
			}else if(act.equals("updateUser")){
				updateUser(request,response);
			}else if(act.equals("addUser")){
				addUser(request,response);
			}else if(act.equals("getUserexcel")){
				getUserexcel(request,response);
			}
		}
		
	}
	
	public void getUserexcel(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
//		System.out.println("page"+page);
		UserDAO user = new UserDAO();
		List<Map<String,String>> data = new ArrayList<>();
		try {
			data = user.findAllexcel();
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
	public void addUser(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String depart = request.getParameter("depart");
		String phone = request.getParameter("phone");
//		System.out.println("page"+page);
		UserDAO user = new UserDAO();
		try {
			user.insertUser(username, password, depart, phone,0);
//			System.out.println(data.get(0).get("id"));
//			List<Map<String,String>> data = dao.getNews(flag);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void updateUser(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int id = Integer.valueOf(request.getParameter("id"));
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String depart = request.getParameter("depart");
		String phone = request.getParameter("phone");
//		System.out.println(id+"-"+username+"-"+password+"-"+depart+"-"+phone);
		UserDAO user = new UserDAO();
		try {
			if(password.equals("")){
//				System.out.println("1");
				user.updateAll(id, username, depart, phone);
			}else{
				user.updateAllandpwd(id, username, password, depart, phone);
			}
//			System.out.println(data.get(0).get("id"));

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	public void deleteUser(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int id = Integer.valueOf(request.getParameter("id"));
//		System.out.println("page"+page);
		UserDAO user = new UserDAO();
		try {
			user.deleteUser(id);
//			System.out.println(data.get(0).get("id"));
//			List<Map<String,String>> data = dao.getNews(flag);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	public void getAlluser(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int page = Integer.valueOf(request.getParameter("page"))*6;
//		System.out.println("page"+page);
		UserDAO user = new UserDAO();
		List<Map<String,String>> data = new ArrayList<>();
		int sum =0;
		try {
			data = user.findAll();
			sum = user.getCount();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("total", sum);
			map.put("rows", data);
			JSONObject result = new JSONObject(map);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void getSum(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		UserDAO user = new UserDAO();
		int sum =0;
		try {
			sum = user.getCount();
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
