package com.gateway.route.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.gateway.route.service.JWTService;

import reactor.core.publisher.Mono;

@Component
public class CustomFilter extends AbstractGatewayFilterFactory<CustomFilter.Config>{
	
	@Autowired
	private JWTService jwtService;
	private static final String HEADER_AUTH = "Authorization";
	
	public CustomFilter() {super(Config.class);}
	public static class Config {}
	
	@Override
	public GatewayFilter apply(Config config){
		return ((exchange,chain) ->{
			ServerHttpRequest request = exchange.getRequest();
			ServerHttpResponse response = exchange.getResponse();
			
			final String token = request.getHeaders().getFirst(HEADER_AUTH);
			
			if(token != null && jwtService.isUsableAccessToken(token)){
				//그냥 사용자 access 토큰이 유효
				System.out.println("access token이 유효함");
				response.beforeCommit(() -> {
					response.getHeaders().remove(HEADER_AUTH);
					response.getHeaders().set(HEADER_AUTH,token);
					return Mono.empty();
				});
				return chain.filter(exchange);
			}else if(token != null && jwtService.isUsableRefreshToken(token)) {
				//그냥 사용자 refresh 토큰이 유효
				System.out.println("refresh token이 유효함");
				response.beforeCommit(() -> {
					response.getHeaders().remove(HEADER_AUTH);
					response.getHeaders().set(HEADER_AUTH, "Bearer " + jwtService.createRefreshToken(token));
					return Mono.empty();
				});
				return chain.filter(exchange);
			}else if(token != null && jwtService.isUsableOauthAccessToken(token)) {
				//카카오 사용자 access 토큰이 유효
				System.out.println("third party token이 유효함");
				response.beforeCommit(() -> {
					response.getHeaders().remove(HEADER_AUTH);
					response.getHeaders().set(HEADER_AUTH, token);
					return Mono.empty();
				});
				return chain.filter(exchange);
			}else if(token != null && jwtService.isUsableOauthRefreshToken(token)) {
				System.out.println("third party refresh token이 유효함");
				response.beforeCommit(() -> {
					response.getHeaders().remove(HEADER_AUTH);
					response.getHeaders().set(HEADER_AUTH, "Bearer " + jwtService.createOauthRefreshToken(token));
					return Mono.empty();
				});
				return chain.filter(exchange);
			}
			else {
				System.out.println("아무것도 검증 못함");
				return onError(exchange,"RE LOGIN PLEASE",HttpStatus.UNAUTHORIZED);
			}
		});
	}
	
	private Mono<Void> onError(ServerWebExchange exchange, String error, HttpStatus status) {
	    ServerHttpResponse response = exchange.getResponse();
	    response.setStatusCode(status);
	    return response.setComplete();
	}

}