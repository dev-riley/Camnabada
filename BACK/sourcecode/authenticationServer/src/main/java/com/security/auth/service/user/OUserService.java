package com.security.auth.service.user;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import com.security.auth.model.OUser;

public interface OUserService {
	public String login(String code,HttpServletRequest request);
	public boolean delete(String token,String email);
	public boolean update(String email, OUser user);
	public List<OUser> list(String nickname);
	
	public boolean valid(String id);
	public List<OUser> search(String word);
	public String getNickname(String clientId);
}
