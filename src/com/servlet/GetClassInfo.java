package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.dao.ClassDAO;
import com.util.CheckSession;

public class GetClassInfo extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		    doPost(request,response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		if(CheckSession.check(request)){
			String act = request.getParameter("act");
			if(act.equals("getClass")){
				String username = request.getParameter("username");
				ClassDAO cla = new ClassDAO();
				try {
					List<Map<String,String>> data = cla.getClass(username);;
//					List<Map<String,String>> data = dao.getNews(flag);
					JSONArray result = new JSONArray(data);
					response.setContentType("text/html;charset=utf-8");
					response.getWriter().println(result.toString());
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}else if(act.equals("getCourse")){
				String username = request.getParameter("username");
				String classname = request.getParameter("classname");
				classname = URLDecoder.decode(classname,"UTF-8");
//				System.out.println(classname);
				ClassDAO cla = new ClassDAO();
				try {
					List<Map<String,String>> data = cla.getCourse(username,classname);
//					List<Map<String,String>> data = dao.getNews(flag);
					JSONArray result = new JSONArray(data);
					response.setContentType("text/html;charset=utf-8");
					response.getWriter().println(result.toString());
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		
	}
	
	

}
