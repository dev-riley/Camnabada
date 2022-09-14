package com.security.auth.service.token;

import java.util.Date;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.security.auth.model.Session;
import com.security.auth.model.User;
import com.security.auth.repository.OUserRepository;
import com.security.auth.repository.SessionRepository;
import com.security.auth.repository.UserRepository;

@Service
public class JWTServiceImpl implements JWTService{
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	OUserRepository ouserRepo;
	
	@Autowired
	SessionRepository sessionRepo;
	
	@Override
	public boolean isUsableAccessToken(String token) {
		try {
			System.out.println("token : " + token);
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
	public boolean isUsableRefreshToken(String token, HttpServletResponse response) {
		token = token.replaceAll("Bearer ", "");
		try {
			System.out.println("token : " + token);
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
				response.setHeader("Authorization", "Bearer " + accessToken);
				
				System.out.println("refresh token 검증 완료");
				return true;
			}
			catch(Exception e) {//검증 실패됨 - 토큰 만료 or 다른 아이디, 비밀번호일 경우
				return false;
			}
		} catch (Exception e) {//없는 아이디
			return false;// TODO: handle exception
		}
	}	

	@Override
	public boolean isUsableOauthToken(String jwt, HttpServletResponse res) {
		RestTemplate rt = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		
		try {
			headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
			headers.add("Authorization",jwt);//access token
			headers.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");
			
			//info로 바꺼야댐
			String Url = "https://kapi.kakao.com/v1/user/access_token_info1";
			HttpEntity<HttpHeaders> kakaoRequest = new HttpEntity<>(headers);
			ResponseEntity<String> response = rt.exchange(
					Url,
					HttpMethod.GET,
					kakaoRequest,
					String.class);
			
			System.out.println(response.getBody());
			return true;//지금 access token은 유효해요
		} catch (Exception e) {
			jwt = jwt.replaceAll("Bearer ", "");
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
					
					//응답값에 전달
					res.setHeader("Authorization", "Bearer " + newAccessToken);
					return true;
				} catch (JSONException je) {
					//갱신
					Session newSession = new Session();
					newSession.setAccessToken(newAccessToken);
					newSession.setRefreshToken(refreshToken);
					sessionRepo.save(newSession);
					//응답값에 전달
					res.setHeader("Authorization", "Bearer " + newAccessToken);
					return true;
				}
			}
			return false;
		}
	}
}
