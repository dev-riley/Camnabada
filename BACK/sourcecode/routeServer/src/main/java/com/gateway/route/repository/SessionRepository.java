package com.gateway.route.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gateway.route.model.Session;

public interface SessionRepository extends JpaRepository<Session, Integer>{
	Session findByAccessToken(String token);//아이디로 찾기
}
