package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.dao.ClassDAO;
import com.dao.UserDAO;

public class Account extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		    doPost(request,response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String act = request.getParameter("act");
		
		if(act.equals("getAccount")){
			getAccount(request,response);
		}else if(act.equals("updateAccount")){
			updateAccount(request,response);
		}
	}
	
	public void updateAccount(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String username = request.getParameter("username");
		String type = request.getParameter("type");
		String value = request.getParameter("value");
//		System.out.println(username+"--"+type+"--"+value);
		UserDAO user = new UserDAO();
		try {
			if(type.equals("password")){
				user.updateBypassword(username, value);
			}else if(type.equals("depart")){
				user.updateBydepart(username, value);
			}else if(type.equals("phone")){
				user.updateByphone(username, value);
			}
			/*response.setContentType("text/html;charset=utf-8");
			response.getWriter().println("success");*/
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void getAccount(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String username = request.getParameter("username");
		UserDAO user = new UserDAO();
		try {
			Map<String,String> data = user.getAccount(username);
//			List<Map<String,String>> data = dao.getNews(flag);
			JSONObject result = new JSONObject(data);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
