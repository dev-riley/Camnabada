package com.security.auth.controller;

import java.io.IOException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.security.auth.model.OUser;
import com.security.auth.model.User;
import com.security.auth.service.user.OUserServiceImpl;
import com.security.auth.service.verify.VerificationImpl;

@RestController
@RequestMapping(value = "/oauth")
public class OUserController {
	
	@Autowired
	OUserServiceImpl ouserService;
	
	@Autowired
	VerificationImpl veryfiyService;
	
	//로그인 redirect url반환 
	@GetMapping("/getKakao")
	public String getKakaoAuthUrl(
			HttpServletRequest request) throws Exception {
		String reqUrl = 
				"https://kauth.kakao.com/oauth/authorize"
				+ "?client_id=e24081f3e4348cfdc855a4cb83abe882"
				+ "&redirect_uri=http://i6c109.p.ssafy.io:8050/oauth/code/kakao"
				+ "&response_type=code";

		return reqUrl;//code를 포함한 kauth redirection 창 나옴
	}
	
	//로그인 수행
	@GetMapping("/code/kakao")
	public ResponseEntity oauthLogin(@RequestParam(value = "code") String code,HttpServletResponse response, HttpServletRequest request) throws ParseException, IOException  {
		String tok = ouserService.login(code, request);
		if(tok != null) {
			HttpHeaders headers = new HttpHeaders();
			response.sendRedirect("http://i6c109.p.ssafy.io:80/main?kakao_token=" + tok);
			return new ResponseEntity(HttpStatus.OK);
		}else
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
	}
	
	//삭제하기
	@DeleteMapping("{email}")
	public ResponseEntity oauthLogout(@PathVariable("email") String email,HttpServletRequest request) {
		if(ouserService.delete(request.getHeader("Authorization"),email)){
			//token도 만료해버리기
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization","");			
			return new ResponseEntity(HttpStatus.OK);
		}
		else
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
	}
	
	//카카오 계정 이메일을 통해서 정보불러오기
	@GetMapping("{nickname}")
	public ResponseEntity<List<OUser>> list(@PathVariable("nickname") String nickname){
		List<OUser> selectUser = ouserService.list(nickname);
		if(selectUser != null) {
			return new ResponseEntity<List<OUser>>(selectUser,HttpStatus.OK);
		}else {
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	//수정하기
	//nickname, 자기소개는 무조건 있어야함
	@PutMapping("{id}")
	public ResponseEntity update(@PathVariable("id") String id,@RequestBody OUser user) {
		if(ouserService.update(id, user))
			return new ResponseEntity(HttpStatus.OK);
		else {
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	@GetMapping("/search/{word}")
	public ResponseEntity<List<OUser>> nicknameSearch(@PathVariable("word") String word) {
		return new ResponseEntity<List<OUser>>(ouserService.search(word),HttpStatus.OK);
	}
	
	@GetMapping("/nickname")
	public ResponseEntity<String> getNickName(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		String clientId = veryfiyService.verify(token);
		String nickName = null;
		if((nickName = ouserService.getNickname(clientId)) != null)
			return new ResponseEntity<String>(nickName,HttpStatus.OK);
		else {
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	//닉네임 가져오기
	@GetMapping("/getnickname/{id}")
	public ResponseEntity<String> getNickName(@PathVariable("id") String id){
		String nickName = ouserService.getNickname(id);
		if(nickName != null)
			return new ResponseEntity<String>(nickName,HttpStatus.OK);
		else {
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		}
	}
}
