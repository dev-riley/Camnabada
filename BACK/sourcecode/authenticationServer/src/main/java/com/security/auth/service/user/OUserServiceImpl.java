package com.security.auth.service.user;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import com.security.auth.model.OUser;
import com.security.auth.model.Session;
import com.security.auth.repository.OUserRepository;
import com.security.auth.repository.SessionRepository;

@Service
public class OUserServiceImpl implements OUserService{

	@Autowired
	OUserRepository ouserRepo;
	
	@Autowired
	SessionRepository sessionRepo;
	
	@Override
	public String login(String code,HttpServletRequest request){
		try {
			RestTemplate rt = new RestTemplate();
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");
			MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
			
			params.add("grant_type", "authorization_code");
			params.add("client_id","e24081f3e4348cfdc855a4cb83abe882");
			params.add("redirect_uri","http://i6c109.p.ssafy.io:8050/oauth/code/kakao");
			params.add("code",code);
			
			HttpEntity<MultiValueMap<String, String>> kakaoRequest = new HttpEntity<>(params,headers);
			ResponseEntity<String> response = rt.exchange(
					"https://kauth.kakao.com/oauth/token",
					HttpMethod.POST,
					kakaoRequest,
					String.class);
						
			String httpresppronse = response.getBody();
	
			JSONObject jObject = new JSONObject(httpresppronse);
			String accessToken = jObject.getString("access_token");
			String refreshToken = jObject.getString("refresh_token");
			
			HttpHeaders headers2 = new HttpHeaders();
			headers2.add("Authorization","Bearer " + accessToken);//access token
			headers2.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");
			
			HttpEntity<HttpHeaders> kakaoRequest2 = new HttpEntity<>(headers2);
			ResponseEntity<String> profile = rt.exchange(
					"https://kapi.kakao.com/v2/user/me",
					HttpMethod.POST,
					kakaoRequest2,
					String.class);
			
			//프로필 바꿔서 db에 저장하기
			JSONObject jsonObject = new JSONObject(profile.getBody());
			
			JSONObject profileObject = jsonObject.getJSONObject("properties");
			JSONObject profileObject2 = jsonObject.getJSONObject("kakao_account");
			
			String name = profileObject.getString("nickname");//카카오 이름
			String id = profileObject2.getString("email");//카카오 이메일
			
			if(ouserRepo.findById(id) == null) {//이메일로 id 찾기, 없으면 db에 저장
				OUser newUser = new OUser();
				newUser.setId(id);
				newUser.setName(name);
				ouserRepo.save(newUser);
			}
			
			//refresh token 저장하기
			Session session = new Session();
			session.setAccessToken(accessToken);
			session.setRefreshToken(refreshToken);
			sessionRepo.save(session);
			return accessToken;
		}catch(Exception e) {
			return null;
		}
	}

	//회원 탈퇴
	@Override
	public boolean delete(String token,String email) {
		RestTemplate rt = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		
		headers.add("Authorization",token);//access token
		headers.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");
		
		HttpEntity<HttpHeaders> kakaoRequest = new HttpEntity<>(headers);
		ResponseEntity<String> logout = rt.exchange(
				"https://kapi.kakao.com/v1/user/unlink",
				HttpMethod.POST,
				kakaoRequest,
				String.class);
		
		//table에서도 제거
		ouserRepo.delete(ouserRepo.findById(email));
		return true;
	}

	@Override
	public boolean update(String email, OUser user) {
		OUser selectUser = ouserRepo.findById(email);
		if(selectUser != null && user.getIntro() != null && user.getNickname() != null) {
			if(user.getIntro() != null)
				selectUser.setIntro(user.getIntro());
			if(user.getNickname() != null)
				selectUser.setNickname(user.getNickname());
			if(user.getPhoto() != null)
				selectUser.setPhoto(user.getPhoto());
			
			ouserRepo.save(selectUser);
			
			return true;
		}
		else return false;
	}

	@Override
	public List<OUser> list(String nickname) {
		List<OUser> ousers = ouserRepo.findByNickname(nickname);
		return ousers;
	}

	@Override
	public boolean valid(String id) {
		OUser user = ouserRepo.findById(id);
		if(user != null)
			return false;
		else return true;
	}

	@Override
	public List<OUser> search(String word) {
		List<OUser> user = ouserRepo.findByNicknameLike("%"+word+"%");
		return user;
	}

	@Override
	public String getNickname(String clientId) {
		try {
			OUser user = ouserRepo.findById(clientId);
			return user.getNickname();
		} catch (Exception e) {
			return null;
		}
	}
}

//로그아웃 관련

//accesstoken 만료시키기
//RestTemplate rt = new RestTemplate();
//HttpHeaders headers = new HttpHeaders();
//
//headers.add("Authorization","Bearer " + map.get("token"));//access token
//headers.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");
//
//HttpEntity<HttpHeaders> kakaoRequest = new HttpEntity<>(headers);
//ResponseEntity<String> logout = rt.exchange(
//		"https://kapi.kakao.com/v1/user/logout",
//		HttpMethod.POST,
//		kakaoRequest,
//		String.class);
//System.out.println(logout);

//카카오랑 access token 만료시키기
//RestTemplate rt = new RestTemplate();
//HttpHeaders headers = new HttpHeaders();
//
//String logoutUrl = "https://kauth.kakao.com/oauth/logout?";
//String clientId = "e24081f3e4348cfdc855a4cb83abe882";
//String redirectUrl = "http://localhost:8080/oauthLogout";
//
//headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);  
//UriComponents builder = UriComponentsBuilder.fromHttpUrl(logoutUrl)
//            .queryParam("client_id", clientId)
//            .queryParam("logout_redirect_uri", redirectUrl)
//            .build(false);    //자동으로 encode해주는 것을 막기 위해 false
//    
//HttpEntity<HttpHeaders> kakaoRequest = new HttpEntity<>(headers);
//ResponseEntity<String> logout = rt.exchange(
//		builder.toUriString(),
//		HttpMethod.GET,
//		kakaoRequest,
//		String.class);
//
//System.out.println(logout);
//System.out.println("로그아웃 성공");

//연결 끊기
//RestTemplate rt = new RestTemplate();
//HttpHeaders headers = new HttpHeaders();
//
//headers.add("Authorization","Bearer " + request.getSession().getAttribute("accessToken"));//access token
//headers.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");
//HttpSession session = request.getSession();
//session.setAttribute("accessToken", null);
//
//HttpEntity<HttpHeaders> kakaoRequest = new HttpEntity<>(headers);
//ResponseEntity<String> logout = rt.exchange(
//		"https://kapi.kakao.com/v1/user/unlink",
//		HttpMethod.POST,
//		kakaoRequest,
//		String.class);
//System.out.println(logout);
