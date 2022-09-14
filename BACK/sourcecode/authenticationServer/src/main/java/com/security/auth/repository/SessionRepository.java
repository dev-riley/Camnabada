package com.security.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.security.auth.model.Session;

public interface SessionRepository extends JpaRepository<Session, Integer>{
	Session findByAccessToken(String token);//아이디로 찾기
}
