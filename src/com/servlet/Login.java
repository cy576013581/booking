package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import com.dao.UserDAO;

public class Login extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		    doPost(request,response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String act = request.getParameter("act");
		
//		System.out.println("--");
		if(act.equals("userlogin")){
			userLogin(request,response);
		}else if(act.equals("adminlogin")){
			adminLogin(request,response);
		}
	}
	
	public void adminLogin(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String verifyCode = request.getParameter("verifyCode");
		String kaptchaValue = (String) request.getSession().getAttribute(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY);
//		System.out.println(username+password);
		UserDAO dao = new UserDAO();
		int flag=0;
		try {
			
			JSONObject result = new JSONObject();
			if(kaptchaValue == null || kaptchaValue == ""||!verifyCode.equalsIgnoreCase(kaptchaValue)) {
				
//				System.out.println(flag);
				result.put("flag", "2");
				
			}else{
				flag = dao.adminvalidate(username, password);
				if(flag ==1){
					HttpSession session = request.getSession();
					session.setAttribute("username", username);
				}
				result.put("flag", String.valueOf(flag));
			}
//			System.out.println(flag);
			
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void userLogin(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		UserDAO dao = new UserDAO();
		boolean flag=false;
		try {
			
			flag = dao.validate(username, password);
			if(flag){
				HttpSession session = request.getSession();
				session.setAttribute("username", username);
				dao.insertLoginRecord(username, sdf.format(new Date()));
			}
			JSONObject result = new JSONObject();
			result.put("flag", flag);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().println(result.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	

}
