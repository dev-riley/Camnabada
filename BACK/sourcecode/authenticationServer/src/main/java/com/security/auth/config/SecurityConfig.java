package com.security.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity//스프링 시큐리티 필터가 스프링 필터 체인에 등록
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
//PRE,POST authorize 둘다 활성화 시키는 어노테이션임
//secured 어노테이션 활성화 preauthorize 어노테이션 활성화
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.httpBasic().disable().cors()
		.and().csrf().disable();
	}
//	@Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//
//        configuration.addAllowedOrigin("*");
//        configuration.addAllowedHeader("*");
//        configuration.addAllowedMethod("*");
//        configuration.addExposedHeader("*");
//        configuration.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
}
