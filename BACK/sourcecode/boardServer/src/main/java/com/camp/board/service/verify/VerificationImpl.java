package com.camp.board.service.verify;

import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;

@Service
public class VerificationImpl implements Verification{

	@Override
	public String verify(String token) {
		token = token.replaceAll("Bearer ", "");
		try {
			System.out.println("verify token : " + token);
			JWTVerifier verifier = JWT.require(Algorithm.HMAC512("login")) 
					.withSubject("loginToken")
				    .build();
			//유효한 토큰인지 검증
			verifier.verify(token);
			String id = JWT.decode(token).getClaim("id").asString();
			System.out.println("verify id : " + id);
			//유효하므로 id를 반환해줌
			return id;
		} catch (Exception e) {//카카오 토큰 일 수도 있음
			try {
				System.out.println("verify token kakao : " + token);
				RestTemplate rt = new RestTemplate();
				HttpHeaders headers = new HttpHeaders();
				
				headers.add("Authorization","Bearer " + token);//access token
				headers.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");
				
				HttpEntity<HttpHeaders> kakaoRequest = new HttpEntity<>(headers);
				ResponseEntity<String> info = rt.exchange(
						"https://kapi.kakao.com/v2/user/me",
						HttpMethod.GET,
						kakaoRequest,
						String.class);
				
				JSONObject jsonObject = new JSONObject(info.getBody());
				JSONObject profileObject = jsonObject.getJSONObject("kakao_account");
				
				String id = profileObject.getString("email");//카카오 계정
				return id;
			} catch (Exception e2) {
				//토큰이 인증되지 않으면 null
				return null;
			}
		}
	}

}
