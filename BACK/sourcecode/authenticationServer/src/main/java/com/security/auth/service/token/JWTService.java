package com.security.auth.service.token;

import javax.servlet.http.HttpServletResponse;

public interface JWTService {
	
	public boolean isUsableAccessToken(String jwt);
	public boolean isUsableRefreshToken(String jwt,HttpServletResponse response);
	
	public boolean isUsableOauthToken(String jwt,HttpServletResponse response);
}
