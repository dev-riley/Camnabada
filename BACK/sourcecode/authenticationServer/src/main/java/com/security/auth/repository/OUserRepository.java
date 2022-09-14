package com.security.auth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.security.auth.model.OUser;

public interface OUserRepository extends JpaRepository<OUser, Integer>{
	OUser findById(String id);//아이디로 찾기
	List<OUser> findByNickname(String nickname);
	List<OUser> findByNicknameLike(String nickname);
}
