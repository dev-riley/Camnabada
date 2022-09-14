package com.security.auth.service.follow;

import java.util.List;

import com.security.auth.model.FollowUser;

public interface FollowService {
	public boolean follow(String fromId, String toId);
	public boolean unfollow(String fromId, String toId);
	
	public List<FollowUser> list(String id, String user);
}
