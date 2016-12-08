package com.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class CheckSession {
	public static boolean check(HttpServletRequest request){
		HttpSession session = request.getSession();
		String username = (String) session.getAttribute("username");
		
		if(username != null){
			return true;
		}else{
			return false;
		}
	}
}
