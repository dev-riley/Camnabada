package com.gateway.route.service;

public interface JWTService {
	public boolean isUsableAccessToken(String jwt);
	public boolean isUsableRefreshToken(String jwt);
	
	public boolean isUsableOauthAccessToken(String jwt);
	public boolean isUsableOauthRefreshToken(String jwt);
	
	public String createRefreshToken(String jwt);
	public String createOauthRefreshToken(String jwt);
}
