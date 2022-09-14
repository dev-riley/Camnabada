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
import com.camp.board.DTO.BoardDTO;
import com.camp.board.model.Board;
import com.camp.board.service.BoardService;
import com.camp.board.service.BoardServiceImpl;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/board")
@CrossOrigin("*")
public class BoardController {
	
	@Autowired
	private BoardServiceImpl boardService;
	
	//게시판 글쓰기
	@PostMapping
	public ResponseEntity writeArticle(@RequestBody BoardDTO boardDto) throws Exception {
		if (boardService.writeArticle(boardDto)) {
			return new ResponseEntity(HttpStatus.OK);
		}
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}
	
	//모든 게시판에 있는 게시판 정보들
	@GetMapping
	public ResponseEntity<List<BoardDTO>> getArticleList() throws Exception {
		return new ResponseEntity<List<BoardDTO>>(boardService.getArticleList(), HttpStatus.OK);
	}
	
	//제목으로 찾기
	@GetMapping("/search/{title}")
	public ResponseEntity<List<BoardDTO>> getTitleSearch(@PathVariable("title") String title) throws Exception {
		return new ResponseEntity<List<BoardDTO>>(boardService.getTitleSearchList(title), HttpStatus.OK);
	}
	
	//팔로우 게시판 정보들
	@PostMapping("/follow")
	public ResponseEntity<List<BoardDTO>> getFollowBoardList(@RequestBody List<String> followUserIds) throws Exception {
		return new ResponseEntity<List<BoardDTO>>(boardService.getFollowArticleList(followUserIds), HttpStatus.OK);
	}
	
	//캠핑장 id에 맞는 게시판들
	@GetMapping("/camp/{campId}")
	public ResponseEntity<List<BoardDTO>> getArticleList(@PathVariable("campId") int campId) throws Exception {
		return new ResponseEntity<List<BoardDTO>>(boardService.getCampingArticleList(campId), HttpStatus.OK);
	}
	
	//게시판 한개 상세정보
	@GetMapping("/one/{boardId}")
	public ResponseEntity<BoardDTO> getArticle(@PathVariable("boardId") int boardId) throws Exception {
		return new ResponseEntity<BoardDTO>(boardService.getCampingArticle(boardId), HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<String> modifyArticle(@RequestBody BoardDTO boardDto){
		if(boardService.modifyArticle(boardDto)) {
			return new ResponseEntity(HttpStatus.OK);
		}
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}
	
	@DeleteMapping("{boardId}")
	public ResponseEntity deleteArticle(@PathVariable("boardId") int boardId){
		if (boardService.deleteArticle(boardId)) {
			return new ResponseEntity(HttpStatus.OK);
		}
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}
}
