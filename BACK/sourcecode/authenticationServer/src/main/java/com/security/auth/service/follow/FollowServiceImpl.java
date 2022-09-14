package com.security.auth.service.follow;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.security.auth.model.FollowUser;
import com.security.auth.repository.FollowRepository;

@Service
public class FollowServiceImpl implements FollowService{

	@Autowired
	FollowRepository followRepo;
	
	@Override
	public boolean follow(String fromId, String toId) {
		
		if(followRepo.findByFollowingAndFollower(fromId,toId) == null) {
			FollowUser follower = new FollowUser();
			follower.setFollower(fromId);
			follower.setFollowing(toId);
			
			followRepo.save(follower);
			return true;
		}else return false;
	}

	@Override
	public boolean unfollow(String fromId, String toId) {
		
		FollowUser follower = new FollowUser();
		
		if((follower = followRepo.findByFollowingAndFollower(toId,fromId)) != null) {
			followRepo.delete(follower);;
			return true;
		}else return false;
	}

	@Override
	public List<FollowUser> list(String id, String user) {
		List<FollowUser> list;
		if("follower".equals(user))
			list = followRepo.findByFollower(id);
		else if("following".equals(user))
			list = followRepo.findByFollowing(id);
		else
			list = null;
		
		return list;
	}
}
