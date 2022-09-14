package com.security.auth.service.user;

import java.util.List;
import com.security.auth.model.User;


public interface UserService {
	public boolean sign(User user);
	public boolean login(String id, String password);
	public boolean delete(String id);
	public boolean update(String id, User user);
	public List<User> list(String id);
	
	public boolean valid(String id);
	public List<User> search(String word);
	public String getNickname(String clientId);
}