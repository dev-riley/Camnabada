package com.camp.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.camp.board.DTO.CommentDTO;
import com.camp.board.service.BoardServiceImpl;

@RestController
@RequestMapping("/comment")
public class CommentController {
	
	@Autowired
	BoardServiceImpl boardService;
	
	//게시판 댓글 쓰기
	@PostMapping
	public ResponseEntity writeComment(@RequestBody CommentDTO commentDto) throws Exception {
		if (boardService.writeComment(commentDto)) {
			return new ResponseEntity(HttpStatus.OK);
		}
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}
	
	//캠핑장 id에 맞는 게시판들
	@GetMapping("{boardId}")
	public ResponseEntity<List<CommentDTO>> getArticleList(@PathVariable("boardId") int boardId) throws Exception {
		return new ResponseEntity<List<CommentDTO>>(boardService.getComments(boardId), HttpStatus.OK);
	}
	
	//게시판 댓글 수정하기
	@PutMapping
	public ResponseEntity<String> modifyArticle(@RequestBody CommentDTO commentDto){
		if(boardService.modifyComment(commentDto)) {
			return new ResponseEntity(HttpStatus.OK);
		}
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}
	
	//게시판 댓글 삭제하기
	@DeleteMapping("{commentId}")
	public ResponseEntity deleteArticle(@PathVariable("commentId") int commentId){
		if (boardService.deleteComment(commentId)) {
			return new ResponseEntity(HttpStatus.OK);
		}
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}
}
