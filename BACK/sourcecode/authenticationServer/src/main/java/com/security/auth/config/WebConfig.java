//package com.security.auth.config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//import com.security.auth.interceptor.JWTInterceptor;
//
//@Configuration
//@EnableWebMvc
//public class WebConfig implements WebMvcConfigurer {
//	
//	//주입 안하면 container가 확인 못함..
//	@Autowired
//	JWTInterceptor jwtInterCeptor;
//		
//	@Override
//	public void addCorsMappings(CorsRegistry registry) {
//		
////		System.out.println("CORS Setting");
////		default 설정.
////		Allow all origins.
////		Allow "simple" methods GET, HEAD and POST.
////		Allow all headers.
////		Set max age to 1800 seconds (30 minutes).
////		
//		registry.addMapping("/**")
//			.allowedOrigins("*")
////			.allowedOrigins("http://localhost:8080", "http://localhost:8081")
//			.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//			.maxAge(6000);
//	}
//
//	@Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(jwtInterCeptor)
//      .excludePathPatterns("/**");//test 용
////    	.addPathPatterns("/**")  // 보통은 일단은 모든 패턴을 매칭되도록
////    	
////    	.excludePathPatterns("/swagger-resources/**")
////    	.excludePathPatterns("/v2/api-docs")
////    	.excludePathPatterns("/swagger-ui.html")
////    	.excludePathPatterns("/webjars/**")//swagger 관련
////        
////        .excludePathPatterns("/oauth/**")//third party 로그인 관련
////        
////        .excludePathPatterns("/user/**"); //로그인 관련
//    }
//	
//}
