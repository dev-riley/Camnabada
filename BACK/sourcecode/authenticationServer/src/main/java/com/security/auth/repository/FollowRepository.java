package com.security.auth.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.security.auth.model.FollowUser;

public interface FollowRepository extends JpaRepository<FollowUser, Integer>{
	FollowUser findByFollowingAndFollower(String fromId,String toId);//아이디로 찾기
	List<FollowUser> findByFollowing(String id);
	List<FollowUser> findByFollower(String id);
}
