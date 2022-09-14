package com.camp.board.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.camp.board.model.Board;
import com.camp.board.model.BoardLike;
import com.camp.board.model.Comment;
import com.camp.board.model.CommentLike;
import com.camp.board.repository.BoardLikeRepository;
import com.camp.board.repository.BoardRepository;
import com.camp.board.repository.CommentLikeRepository;
import com.camp.board.repository.CommentRepository;

@Service
public class LikeServiceImpl implements LikeService{
	
	@Autowired
	BoardLikeRepository boardLikeRepo;
	
	@Autowired
	CommentLikeRepository commentLikeRepo;
	
	@Autowired
	BoardRepository boardRepo;
	
	@Autowired
	CommentRepository commentRepo;
	
	@Override
	public boolean doLikeBoard(int boardId, String userId) {
		Board board = boardRepo.findByBoardId(boardId);
		BoardLike boardStoreLike= boardLikeRepo.findByUser(userId,boardId);
		if(board != null && boardStoreLike == null) {
			board.setLike(board.getLike() + 1);
			boardRepo.save(board);
			
			BoardLike boardLike = new BoardLike();
			boardLike.setBoard(board);
			boardLike.setBoardId(boardId);
			boardLike.setId(userId);
			boardLikeRepo.save(boardLike);
			return true;
		}
		else return false;
	}

	@Override
	public boolean undoLikeBoard(int boardId, String userId) {
		Board board = boardRepo.findByBoardId(boardId);
		BoardLike boardLike= boardLikeRepo.findByUser(userId,boardId);
		if(board != null && boardLike != null) {
			board.setLike(board.getLike() - 1);
			boardRepo.save(board);
			boardLikeRepo.delete(boardLikeRepo.findByDeleteBoardLike(userId, boardId));
			return true;
		}
		else return false;
	}

	@Override
	public boolean doLikeComment(int commentId, String userId) {
		Comment comment = commentRepo.findById(commentId);
		CommentLike commentStoreLike= commentLikeRepo.findByUser(userId, commentId);
		if(comment != null && commentStoreLike == null) {
			comment.setLike(comment.getLike() + 1);
			commentRepo.save(comment);
			
			CommentLike commentLike = new CommentLike();
			commentLike.setComment(comment);
			commentLike.setCommentId(commentId);
			commentLike.setId(userId);
			commentLikeRepo.save(commentLike);
			return true;
		}
		else return false;
	}

	@Override
	public boolean undoLikeComment(int commentId, String userId) {
		Comment comment = commentRepo.findById(commentId);
		CommentLike commentLike= commentLikeRepo.findByUser(userId,commentId);
		if(comment != null && commentLike != null) {
			comment.setLike(comment.getLike() - 1);
			commentRepo.save(comment);
			
			commentLikeRepo.delete(commentLikeRepo.findByDeleteCommentLike(userId, commentId));
			return true;
		}
		else return false;
	}
}
