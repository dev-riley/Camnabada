package com.gateway.route.service;

import java.util.Date;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.gateway.route.model.Session;
import com.gateway.route.model.User;
import com.gateway.route.repository.SessionRepository;
import com.gateway.route.repository.UserRepository;

import reactor.core.publisher.Mono;

@Service
public class JWTServiceImpl implements JWTService{
	
	@Autowired
	SessionRepository sessionRepo;
	
	@Autowired
	UserRepository userRepo;
	
	@Override
	public boolean isUsableAccessToken(String token) {
		try {
			System.out.println("access token 검증 중 ...  " + token);
			token = token.replaceAll("Bearer ", "");
			JWTVerifier verifier = JWT.require(Algorithm.HMAC512("login")) 
					.withSubject("loginToken")
				    .build();
			verifier.verify(token);
			System.out.println("access token 검증 완료");
			return true;
		}
		catch(Exception e) {//검증 실패됨 - 토큰 만료 or 다른 아이디, 비밀번호일 경우
			return false;
		}
	}
	
	@Override
	public boolean isUsableRefreshToken(String token) {
		token = token.replaceAll("Bearer ", "");
		try {
			System.out.println("refresh token 검증 중 ...  " + token);
			Session session = sessionRepo.findByAccessToken(token);
			JWTVerifier verifier = JWT.require(Algorithm.HMAC512("login")) 
					.withSubject("loginToken")
				    .build();
			verifier.verify(session.getRefreshToken());
			
			//이 토큰 정보는 더이상 필요 없음
			sessionRepo.delete(session);
			return true;
		} catch (Exception e) {//없는 아이디
			return false;// TODO: handle exception
		}
	}	

	@Override
	public boolean isUsableOauthAccessToken(String token) {
		RestTemplate rt = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		
		try {
			System.out.println("kakao token 검증 중 ...  " + token);
			
			headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
			headers.add("Authorization",token);//access token
			headers.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");
			
			String Url = "https://kapi.kakao.com/v1/user/access_token_info";
			HttpEntity<HttpHeaders> kakaoRequest = new HttpEntity<>(headers);
			ResponseEntity<String> response = rt.exchange(
					Url,
					HttpMethod.GET,
					kakaoRequest,
					String.class);
			//지금 access token은 유효해요
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public boolean isUsableOauthRefreshToken(String jwt) {
		RestTemplate rt = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		
		try {
			Session session = sessionRepo.findByAccessToken(jwt);
			String refreshToken = session.getRefreshToken();
			
			if(refreshToken != null) {
				//이 토큰 정보는 더이상 필요 없음
				sessionRepo.delete(session);
				
				headers = new HttpHeaders();
				headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
				headers.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");
				
				MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
				params.add("grant_type", "refresh_token");
				params.add("client_id","e24081f3e4348cfdc855a4cb83abe882");
				params.add("refresh_token",refreshToken);
				
				String Url = "https://kauth.kakao.com/oauth/token";
				HttpEntity<MultiValueMap<String, String>> kakaoRequest = new HttpEntity<>(params,headers);
				ResponseEntity<String> response = rt.exchange(
					Url,
					HttpMethod.POST,
					kakaoRequest,
					String.class);
				
				return true;
			}
			else 
				return false;
			
		}catch (Exception e) {
			return false;
		}
	
	}
	
	@Override
	public String createRefreshToken(String token) {
		token = token.replaceAll("Bearer ", "");
		try {
			
			Session session = sessionRepo.findByAccessToken(token);
			JWTVerifier verifier = JWT.require(Algorithm.HMAC512("login")) 
					.withSubject("loginToken")
				    .build();
			
			verifier.verify(session.getRefreshToken());
			String id = JWT.decode(token).getClaim("id").asString();
			
			try {
				User user = userRepo.findById(id);
				String refreshToken = session.getRefreshToken();
				
				sessionRepo.delete(session);
				//refreshToken 재발급
				String accessToken = JWT.create()
						.withSubject("loginToken")
						.withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 30))//30분
						.withClaim("id", id)
						.withClaim("username", user.getUsername())
						.sign(Algorithm.HMAC512("login"));
				
				session = new Session();
				session.setAccessToken(accessToken);
				session.setRefreshToken(refreshToken);
				sessionRepo.save(session);
				
				System.out.println("refresh token 검증 완료");
				return accessToken;
			}
			catch(Exception e) {//검증 실패됨 - 토큰 만료 or 다른 아이디, 비밀번호일 경우
				return "";
			}
		} catch (Exception e) {//없는 아이디
			return "";// TODO: handle exception
		}
	}

	@Override
	public String createOauthRefreshToken(String token) {
		RestTemplate rt = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		token = token.replaceAll("Bearer ", "");
		try {
			Session session = sessionRepo.findByAccessToken(token);
			String refreshToken = session.getRefreshToken();
			if(refreshToken != null) {
				//이 토큰 정보는 더이상 필요 없음
				sessionRepo.delete(session);
				
				headers = new HttpHeaders();
				headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
				headers.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");
				
				MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
				params.add("grant_type", "refresh_token");
				params.add("client_id","e24081f3e4348cfdc855a4cb83abe882");
				params.add("refresh_token",refreshToken);
				
				String Url = "https://kauth.kakao.com/oauth/token";
				HttpEntity<MultiValueMap<String, String>> kakaoRequest = new HttpEntity<>(params,headers);
				ResponseEntity<String> response = rt.exchange(
						Url,
						HttpMethod.POST,
						kakaoRequest,
						String.class);
				
				JSONObject jsonObject = new JSONObject(response.getBody());
				String newAccessToken = jsonObject.getString("access_token");
				
				try {
					String newRefreshToken = jsonObject.getString("refresh_token");
					refreshToken = newRefreshToken;
					//갱신
					Session newSession = new Session();
					newSession.setAccessToken(newAccessToken);
					newSession.setRefreshToken(newRefreshToken);
					sessionRepo.save(newSession);
					
					return newAccessToken;
				} catch (JSONException je) {
					//갱신
					Session newSession = new Session();
					newSession.setAccessToken(newAccessToken);
					newSession.setRefreshToken(refreshToken);
					sessionRepo.save(newSession);
					return newAccessToken;
				}
			}
		}catch(Exception e2) {
			return "";
		}
		return "";
	}	
}
