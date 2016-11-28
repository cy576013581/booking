package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;

import com.dao.RoomDAO;
import com.dao.UserDAO;
import com.util.CheckSession;

public class Classlist extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		    doPost(request,response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
			RoomDAO cla = new RoomDAO();
			try {
				List<Map<String,String>> data = cla.findAllroom();
//				List<Map<String,String>> data = dao.getNews(flag);
				JSONArray result = new JSONArray(data);
				response.setContentType("text/html;charset=utf-8");
				response.getWriter().println(result.toString());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		
		
	}
}
