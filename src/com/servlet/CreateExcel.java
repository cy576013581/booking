package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.dao.ScheduleDAO;
import com.util.CheckSession;
import com.util.ExportExcel;

public class CreateExcel extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
			doPost(request, response);
	}


	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
			request.setCharacterEncoding("utf-8");
			
			if(CheckSession.check(request)){
				String username = request.getParameter("username");
				username = URLDecoder.decode(username,"UTF-8");
//				System.out.println(username);
				
				String sheetname[] = {"第1周","第2周","第3周","第4周","第5周","第6周","第7周","第8周","第9周","第10周","第11周","第12周","第13周","第14周","第15周","第16周","第17周","第18周","第19周","第20周"};
				String[][][] data = new String[20][6][8];
				for (int i = 0; i < 20; i++) {
					data[i][0][0] = "第一大节";
					data[i][1][0] = "第二大节";
					data[i][2][0] = "午间";
					data[i][3][0] = "第三大节";
					data[i][4][0] = "第四大节";
					data[i][5][0] = "晚间";
				}
				int section;
				String classname;
				String roomname;
				String cousename;
				
				String titleName[][] = new String[20][8];
				int titleSize[] = {12,20,20,20,20,20,20,20};
				ExportExcel pee = new ExportExcel(response,username+"教师课表");
				
				pee.setFormtitle("中原工学院信息商务学院"+username+"教师课表");

				
				for (int sheetindex = 0; sheetindex < 20; sheetindex++) {
					int week = sheetindex+1;
					ScheduleDAO sche = new ScheduleDAO();
					String strWeek[] = null;
					String week_Monthday = null;
					List<Map<String,String>> list =null;
					try {
						strWeek = sche.getWeek().split(",");
						week_Monthday = strWeek[week-1];
//						System.out.println(week_Monthday);
						list = produceDate2(week_Monthday,username);
						/*System.out.println(list);
						System.out.println("-----------------");*/
					} catch (SQLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
					String titleName1[][] = new String[20][8];
					titleName[sheetindex][0] = "";
					titleName[sheetindex][1] = "周一("+list.get(0).get("date1")+")";
					titleName[sheetindex][2] = "周二("+list.get(0).get("date2")+")";
					titleName[sheetindex][3] = "周三("+list.get(0).get("date3")+")";
					titleName[sheetindex][4] = "周四("+list.get(0).get("date4")+")";
					titleName[sheetindex][5] = "周五("+list.get(0).get("date5")+")";
					titleName[sheetindex][6] = "周六("+list.get(0).get("date6")+")";
					titleName[sheetindex][7] = "周日("+list.get(0).get("date7")+")";
					
					titleName1[sheetindex][1] = list.get(0).get("date1");
					titleName1[sheetindex][2] = list.get(0).get("date2");
					titleName1[sheetindex][3] = list.get(0).get("date3");
					titleName1[sheetindex][4] = list.get(0).get("date4");
					titleName1[sheetindex][5] = list.get(0).get("date5");
					titleName1[sheetindex][6] = list.get(0).get("date6");
					titleName1[sheetindex][7] = list.get(0).get("date7");
					
					
					for(int i=0;i<list.size();i++){
						for(int j=1;j<8;j++){
							if(titleName1[sheetindex][j].equals(list.get(i).get("classtime"))){
								section = Integer.valueOf(list.get(i).get("section"));
								classname =list.get(i).get("classname");
								roomname =list.get(i).get("roomname");
								cousename =list.get(i).get("coursename");
								data[sheetindex][section-1][j] = roomname+"-"+classname+"-"+cousename;
//								System.out.println(data[sheetindex][section-1][j]);
							}
//							System.out.println(1);
						}
					}
					
					
//					System.out.println(list);
					
				}
				pee.wirteExcel(sheetname, titleName, titleSize, data);
			}
	}
	
	public List<Map<String,String>> produceDate2(String strdate,String username){
		List<Map<String,String>> list = new ArrayList<Map<String,String>>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		Date date = null;
		try {
			date = sdf.parse(strdate);
			c.setTime(date);
//			System.out.println(date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		int month = c.get(Calendar.MONTH)+1;
//		System.out.println(month);
		//获取格式的日期
		Map<String,String> dateall = new HashMap<String, String>();
		dateall.put("date1", sdf.format(date));
		for (int i = 0; i < 6; i++) {
			long time = date.getTime(); 
			time+=24*60*60*1000; 
			date = new Date(time);
//			System.out.println(sdf.format(date));
			dateall.put("date"+(i+2), sdf.format(date));
		}
//		System.out.println(dateall);
		list.add(dateall);
		
		for (int i = 1; i < 8; i++) {
			String riqi = dateall.get("date"+i);
//			System.out.println(riqi);
			List<Map<String,String>> li= new ArrayList<>();
			li = getClass2(riqi,username);
			if(li.size() != 0){
//				System.out.println("-----"+li+li.size());
				for(int j = 0; j < li.size(); j++)  
		        {  
					list.add(li.get(j));  
//		            System.out.println(list.get(i));  
		        }
			}
		}
		
		
		
		return list;
		
	}
	public List<Map<String,String>> getClass2(String date,String username){
		List<Map<String,String>> list= new ArrayList<>();
		ScheduleDAO sche = new ScheduleDAO();
		try {
			list = sche.findClass3(date,username);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return list;
		
	}
}
