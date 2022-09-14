package com.security.auth.controller;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.security.auth.model.FollowUser;
import com.security.auth.service.follow.FollowServiceImpl;
import com.security.auth.service.verify.VerificationImpl;

@RestController
@RequestMapping(value = "/follow")
public class FollowController {
	
	private static final String HEADER_AUTH = "Authorization";
	
	@Autowired
	FollowServiceImpl followService;
	
	@Autowired
	VerificationImpl verifyService;
	
	//로그인 한사람의 팔로우
	@GetMapping("{followORfollowing}")
	public ResponseEntity<List<FollowUser>> list(@PathVariable(value ="followORfollowing") String user, HttpServletRequest request) {
		List<FollowUser> list = null;
		try {
			String token = request.getHeader(HEADER_AUTH);
			String userId = verifyService.verify(token);
			if(userId != null) {
				if((list = followService.list(userId,user)) != null) {
					return new ResponseEntity<List<FollowUser>>(list,HttpStatus.OK);
				}
				else return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
				
			}
			else return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	//로그인 한사람의 팔로우
	@GetMapping("/{id}/{followORfollowing}")
	public ResponseEntity<List<FollowUser>> list(@PathVariable(value ="id")String id,@PathVariable(value ="followORfollowing") String user) {
		List<FollowUser> list = null;
		if((list = followService.list(id,user)) != null) {
			return new ResponseEntity<List<FollowUser>>(list,HttpStatus.OK);
		}
		else return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
	}
	
	
	@PostMapping("{id}")	
	public ResponseEntity follow(@PathVariable String id, HttpServletRequest request) {
		try {
			String token = request.getHeader(HEADER_AUTH);
			String userId = verifyService.verify(token);
			if(userId != null) {
				if(followService.follow(userId, id)) {
					return new ResponseEntity(HttpStatus.OK);
				}
				else return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
			}
			else return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity unfollow(@PathVariable String id, HttpServletRequest request) {
		try {
			String token = request.getHeader(HEADER_AUTH);
			String userId = verifyService.verify(token);
			if(userId != null) {
				if(followService.unfollow(userId, id)) {
					return new ResponseEntity(HttpStatus.OK);
				}
				else return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
			}
			else return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
		}	
	}
}
