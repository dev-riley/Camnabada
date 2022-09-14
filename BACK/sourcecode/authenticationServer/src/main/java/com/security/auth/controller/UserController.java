package com.security.auth.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.security.auth.model.User;
import com.security.auth.repository.UserRepository;
import com.security.auth.service.token.JWTCreateServiceImpl;
import com.security.auth.service.token.JWTServiceImpl;
import com.security.auth.service.user.OUserServiceImpl;
import com.security.auth.service.user.UserServiceImpl;
import com.security.auth.service.verify.VerificationImpl;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserServiceImpl userService;
	
	@Autowired
	OUserServiceImpl ouserService;
	
	@Autowired
	JWTServiceImpl jwtService;
	
	@Autowired
	JWTCreateServiceImpl jwtCreate;
	
	@Autowired
	VerificationImpl veryfiyService;
	
	//회원가입
	@PostMapping
	public ResponseEntity join(@RequestBody User user) {		
		if(userService.sign(user))
			return new ResponseEntity(HttpStatus.OK);
		else
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
	}
	
	//로그인
	@PostMapping("/login")
	public ResponseEntity login(@RequestBody HashMap<String,String>map){
		if(userService.login(map.get("id"),map.get("password"))) {
			
			//token 발행
			String accessToken = jwtCreate.createRefreshToken(map.get("id"));
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization","Bearer " + accessToken);
			return new ResponseEntity(headers,HttpStatus.OK);
		}else {
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	//이름 입력시 정보불러오기
	@GetMapping("{nickname}")
	public ResponseEntity<List<User>> list(@PathVariable("nickname") String nickname){
		List<User> selectUser = userService.list(nickname);
		if(selectUser != null) {
			return new ResponseEntity<List<User>>(selectUser,HttpStatus.OK);
		}else {
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	//아이디 중복 검사
	@GetMapping("/valid/{id}")
	public ResponseEntity<String> valid(@PathVariable("id") String newId){
		if(userService.valid(newId) && ouserService.valid(newId)) {
			return new ResponseEntity<String>("OK",HttpStatus.OK);
		}else {
			return new ResponseEntity<String>("NO",HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	//수정하기
	@PutMapping("{id}")
	public ResponseEntity update(@PathVariable("id") String id,@RequestBody User user) {
		if(userService.update(id, user))
			return new ResponseEntity(HttpStatus.OK);
		else {
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	//삭제하기
	@DeleteMapping("{id}")
	public ResponseEntity delete(@PathVariable("id") String id) {
		if(userService.delete(id))
			return new ResponseEntity(HttpStatus.OK);
		else {
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	@GetMapping
	public ResponseEntity<String> verifyClientIdAndReturn(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		String clientId = null;
		if((clientId = veryfiyService.verify(token)) != null)
			return new ResponseEntity<String>(clientId,HttpStatus.OK);
		else {
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	@GetMapping("/search/{word}")
	public ResponseEntity<List<User>> nicknameSearch(@PathVariable("word") String word) {
		return new ResponseEntity<List<User>>(userService.search(word),HttpStatus.OK);
	}
	
	@GetMapping("/nickname")
	public ResponseEntity<String> getNickName(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		String clientId = veryfiyService.verify(token);
		String nickName = null;
		if((nickName = userService.getNickname(clientId)) != null)
			return new ResponseEntity<String>(nickName,HttpStatus.OK);
		else {
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	//닉네임 가져오기
	@GetMapping("/getnickname/{id}")
	public ResponseEntity<String> getNickName(@PathVariable("id") String id){
		String nickName = userService.getNickname(id);
		if(nickName != null)
			return new ResponseEntity<String>(nickName,HttpStatus.OK);
		else {
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		}
	}
}
