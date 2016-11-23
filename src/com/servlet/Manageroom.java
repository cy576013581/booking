package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.dao.RoomDAO;
import com.dao.UserDAO;
import com.util.CheckSession;

public class Manageroom extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		    doPost(request,response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String act = request.getParameter("act");
		if(CheckSession.check(request)){
			if(act.equals("getAllroom")){
				getAllroom(request,response);
			}else if(act.equals("getSum")){
				getSum(request,response);
			}else if(act.equals("deleteRoom")){
				deleteRoom(request,response);
			}else if(act.equals("updateRoom")){
				updateRoom(request,response);
			}else if(act.equals("addRoom")){
				addRoom(request,response);
			}
		}
		
	}
	public void addRoom(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		String roomname = request.getParameter("roomname");
		String firstchar = request.getParameter("firstchar");
		int students = Integer.valueOf(request.getParameter("students"));
		int position = Integer.valueOf(request.getParameter("position"));
//		System.out.println(roomname);
		RoomDAO room = new RoomDAO();
		try {
			room.insertRoom(roomname,firstchar,students,position);
//			System.out.println(data.get(0).get("id"));
//			List<Map<String,String>> data = dao.getNews(flag);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void updateRoom(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int id = Integer.valueOf(request.getParameter("id"));
		String roomname = request.getParameter("roomname");
		String firstchar = request.getParameter("firstchar");
		int students = Integer.valueOf(request.getParameter("students"));
//		System.out.println("page"+page);
		RoomDAO room = new RoomDAO();
		try {
			room.updateAll(id, roomname,firstchar,students);
//			System.out.println(data.get(0).get("id"));

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void deleteRoom(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int id = Integer.valueOf(request.getParameter("id"));
//		System.out.println("page"+page);
		RoomDAO room = new RoomDAO();
		try {
			room.deleteRoom(id);;
//			System.out.println(data.get(0).get("id"));
//			List<Map<String,String>> data = dao.getNews(flag);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	public void getAllroom(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		int page = Integer.valueOf(request.getParameter("page"))*6;
//		System.out.println("page"+page);
		RoomDAO room = new RoomDAO();
		List<Map<String,String>> data = new ArrayList<>();
		try {
			data = room.findAll(page);
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
		RoomDAO room = new RoomDAO();
		int sum =0;
		try {
			sum = room.getCount();
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
