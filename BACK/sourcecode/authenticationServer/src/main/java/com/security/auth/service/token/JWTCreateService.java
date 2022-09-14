package com.security.auth.service.token;

public interface JWTCreateService {
	
	public String createAccessToken(String id);
	public String createRefreshToken(String id);
	
}
