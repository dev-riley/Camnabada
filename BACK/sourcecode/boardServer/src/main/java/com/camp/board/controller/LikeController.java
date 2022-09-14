package com.camp.board.controller;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.camp.board.service.LikeServiceImpl;
import com.camp.board.service.verify.VerificationImpl;

@RestController
@RequestMapping("/like")
public class LikeController {
	
	private final String auth = "Authorization";
	
	@Autowired
	LikeServiceImpl likeService;
	
	@Autowired
	VerificationImpl verify;
	
	//게시판 한개 상세정보
	@GetMapping("/board/{boardId}")
	public ResponseEntity doLikeBoard(@PathVariable("boardId")int boardId, HttpServletRequest request){
		String token = request.getHeader(auth);
		String userId = verify.verify(token);
		System.out.println(userId);
		if(userId != null) {
			if(likeService.doLikeBoard(boardId, userId))
				return new ResponseEntity(HttpStatus.OK);
			else
				return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}
	
	@DeleteMapping("/board/{boardId}")
	public ResponseEntity deleteArticle(@PathVariable("boardId")int boardId, HttpServletRequest request){
		String token = request.getHeader(auth);
		String userId = verify.verify(token);
		if(userId != null) {
			if(likeService.undoLikeBoard(boardId, userId))
				return new ResponseEntity(HttpStatus.OK);
			else
				return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/comment/{commentId}")
	public ResponseEntity doLikeComment(@PathVariable("commentId")int commentId, HttpServletRequest request){
		String token = request.getHeader(auth);
		String userId = verify.verify(token);
		if(userId != null) {
			if(likeService.doLikeComment(commentId, userId))
				return new ResponseEntity(HttpStatus.OK);
			else
				return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}
	
	@DeleteMapping("/comment/{commentId}")
	public ResponseEntity undoLikeComment(@PathVariable("commentId")int commentId, HttpServletRequest request){
		String token = request.getHeader(auth);
		String userId = verify.verify(token);
		if(userId != null) {
			if(likeService.undoLikeComment(commentId, userId))
				return new ResponseEntity(HttpStatus.OK);
			else
				return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}
}
