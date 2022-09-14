package com.security.auth.service.token;

import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.security.auth.model.Session;
import com.security.auth.model.User;
import com.security.auth.repository.SessionRepository;
import com.security.auth.repository.UserRepository;

@Service
public class JWTCreateServiceImpl implements JWTCreateService {
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	SessionRepository sessionRepo;
	
	@Override
	public String createAccessToken(String id) {
		User loginUser = userRepo.findById(id);
		//Hash 암호화 방식 
		String jwtToken = JWT.create()
				.withSubject("loginToken")
				.withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 30)))//30분
				.withClaim("id", id)
				.withClaim("username", loginUser.getUsername())
				.sign(Algorithm.HMAC512("login"));
		
		return jwtToken;
	}

	@Override
	public String createRefreshToken(String id) {
		User user = userRepo.findById(id);
		//Hash 암호화 방식
		String newAccessToken = JWT.create()
				.withSubject("loginToken")
				.withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 30)))//30분
				.withClaim("id", id)
				.withClaim("username", user.getUsername())
				.sign(Algorithm.HMAC512("login"));
		
		String newRefreshToken = JWT.create()
				.withSubject("loginToken")
				.withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 60 * 24)))//하루
				.withClaim("id", id)
				.withClaim("username", user.getUsername())
				.sign(Algorithm.HMAC512("login"));
		
		Session session = new Session();
		session.setAccessToken(newAccessToken);
		session.setRefreshToken(newRefreshToken);
		sessionRepo.save(session);
		
		return newAccessToken;
	}
}
