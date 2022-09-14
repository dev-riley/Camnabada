package com.camp.board.service;

import java.util.List;
import com.camp.board.DTO.BoardDTO;
import com.camp.board.DTO.CommentDTO;

public interface BoardService {
	
	public List<CommentDTO> getComments(int boardId);
	public boolean writeComment(CommentDTO comment);
	public boolean modifyComment(CommentDTO comment);
	public boolean deleteComment(int commentId);
	
	public List<BoardDTO> getArticleList();//모든 게시판들
	public List<BoardDTO> getFollowArticleList(List<String> followUserIds);//팔로워들 게시판
	public List<BoardDTO> getCampingArticleList(int campId);//한 캠핑장에 대한 모든 게시판들
	public List<BoardDTO> getTitleSearchList(String title);//제목으로 게시판 찾기
	
	public BoardDTO getCampingArticle(int boardId);//게시판 상세정보
	public List<BoardDTO> getCampingTagList(String tag);//태그로 게시판 찾기
	public boolean writeArticle(BoardDTO Board);
	public boolean modifyArticle(BoardDTO board);
	public boolean deleteArticle(int boardId);
}
