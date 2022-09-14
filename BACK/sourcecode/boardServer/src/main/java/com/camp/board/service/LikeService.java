package com.camp.board.service;

public interface LikeService {
	public boolean doLikeBoard(int boardId, String userId);
	public boolean undoLikeBoard(int boardId, String userId);	
	public boolean doLikeComment(int commentId, String userId);
	public boolean undoLikeComment(int commentId, String userId);
}
