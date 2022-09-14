//package com.security.auth.interceptor;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.HandlerInterceptor;
//
//import com.security.auth.service.token.JWTService;
//
//@Component
//public class JWTInterceptor implements HandlerInterceptor {
//
//	private static final String HEADER_AUTH = "Authorization";
//
//	@Autowired
//	private JWTService jwtService;
//	
//	@Override
//	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
//			throws Exception {
//		
//		final String token = request.getHeader(HEADER_AUTH);
//		
//		System.out.println(request.getRequestURL());
//		
//		if(token != null && jwtService.isUsableAccessToken(token)){
//			response.setHeader(HEADER_AUTH, "Bearer " + token);
//			System.out.println("access token이 유효함");
//			//그냥 사용자 access 토큰이 유효
//			return true;
//		}
//		else if(token != null && jwtService.isUsableRefreshToken(token,response)) {
//			System.out.println("refresh token이 유효함");
//			//그냥 사용자 refresh 토큰이 유효
//			return true;
//		}
//		else if(token != null && jwtService.isUsableOauthToken(token,response)) {
//			System.out.println(response.getHeader("Authorization"));
//			//카카오 사용자 access 토큰이 유효
//			System.out.println("third party token이 유효함");
//			return true;
//		}
//		else
//			throw new Exception("New Login");
//	}
//	
//}
