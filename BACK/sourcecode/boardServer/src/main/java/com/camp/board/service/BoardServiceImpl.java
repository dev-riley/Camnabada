package com.camp.board.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.camp.board.DTO.BoardDTO;
import com.camp.board.DTO.CommentDTO;
import com.camp.board.model.Board;
import com.camp.board.model.Camping;
import com.camp.board.model.Comment;
import com.camp.board.repository.BoardRepository;
import com.camp.board.repository.CampRepository;
import com.camp.board.repository.CommentRepository;

@Service
public class BoardServiceImpl implements BoardService{
	
	@Autowired
	CampRepository campRepo;
	
	@Autowired
	BoardRepository boardRepo;

	@Autowired
	CommentRepository commentRepo;
	
	@Override
	public List<CommentDTO> getComments(int boardId) {
		List<Comment> list = commentRepo.findBoardId(boardId);
		List<CommentDTO> comments = new ArrayList<CommentDTO>();
		if(list != null) {
			for (Comment comment : list) {
				CommentDTO oneComment = new CommentDTO();
				oneComment.setCommentId(comment.getId());
				oneComment.setClientId(comment.getClientId());
				oneComment.setContent(comment.getContent());
				oneComment.setDate(comment.getDate());
				oneComment.setBoardId(comment.getBoard().getBoardId());
				oneComment.setLike(comment.getLike());
				comments.add(oneComment);
			}
			return comments;
		}
		else return null;
	}

	@Override
	public boolean writeComment(CommentDTO comment) {
		Board board = boardRepo.findByBoardId(comment.getBoardId());
		if(board != null) {
			Comment oneComment = new Comment();
			oneComment.setClientId(comment.getClientId());
			oneComment.setContent(comment.getContent());
			oneComment.setDate(LocalDateTime.now());
			oneComment.setLike(0);
			oneComment.setBoard(board);
			commentRepo.save(oneComment);
			return true;
		}
		else return false;
	}

	@Override
	public boolean modifyComment(CommentDTO comment) {
		Board board = boardRepo.findByBoardId(comment.getBoardId());
		Comment oneComment = commentRepo.findById(comment.getCommentId());
		if(board != null && oneComment != null) {
			//시간
			oneComment.setDate(LocalDateTime.now());
			//내용
			if(comment.getContent() != null)
				oneComment.setContent(comment.getContent());
			else 
				oneComment.setContent(oneComment.getContent());
			commentRepo.save(oneComment);
			return true;
		}
		else return false;
	}

	@Override
	public boolean deleteComment(int commentId) {
		Comment comment = commentRepo.findById(commentId);
		if(comment != null) {
			commentRepo.delete(comment);
			return true;
		}
		else return false;
	}

	@Override
	public List<BoardDTO> getArticleList() {
		List<Board> list = boardRepo.findAll();
		List<BoardDTO> dtos = new ArrayList<BoardDTO>();
		if(list != null) {
			for (Board oneBoard : list) {
				BoardDTO dto = new BoardDTO();
				dto.setBoardId(oneBoard.getBoardId());
				dto.setCampId(oneBoard.getCamp().getCampId());
				dto.setClientId(oneBoard.getClientId());
				dto.setContent(oneBoard.getContent());
				dto.setDate(oneBoard.getDate());
				dto.setLike(oneBoard.getLike());
				dto.setPhoto(oneBoard.getPhoto());
				dto.setTag(oneBoard.getTag());
				dto.setTitle(oneBoard.getTitle());
				
				dtos.add(dto);
			}
			return dtos;
		}
		else return null;
	}
	
	@Override
	public List<BoardDTO> getCampingArticleList(int campId) {
		List<Board> board = boardRepo.findByCampId(campId);
		List<BoardDTO> dtos = new ArrayList<BoardDTO>();
		if(board != null) {
			for (Board oneBoard : board) {
				BoardDTO dto = new BoardDTO();
				dto.setBoardId(oneBoard.getBoardId());
				dto.setCampId(oneBoard.getCamp().getCampId());
				dto.setClientId(oneBoard.getClientId());
				dto.setContent(oneBoard.getContent());
				dto.setDate(oneBoard.getDate());
				dto.setLike(oneBoard.getLike());
				dto.setPhoto(oneBoard.getPhoto());
				dto.setTag(oneBoard.getTag());
				dto.setTitle(oneBoard.getTitle());
				
				dtos.add(dto);
			}
			return dtos;
		}
		else return null;
	}
	
	@Override
	public BoardDTO getCampingArticle(int boardId) {
		Board storeBoard = boardRepo.findByBoardId(boardId);
		BoardDTO dto = new BoardDTO();
		
		if(storeBoard != null) {
			dto.setBoardId(storeBoard.getBoardId());
			dto.setCampId(storeBoard.getCamp().getCampId());
			dto.setClientId(storeBoard.getClientId());
			dto.setContent(storeBoard.getContent());
			dto.setDate(storeBoard.getDate());
			dto.setLike(storeBoard.getLike());
			dto.setPhoto(storeBoard.getPhoto());
			dto.setTag(storeBoard.getTag());
			dto.setTitle(storeBoard.getTitle());
		}
		return dto;
	}

	@Override
	public boolean writeArticle(BoardDTO BoardDto) {
		Board board = new Board();
		Camping camp = campRepo.findByCampId(BoardDto.getCampId());
		if(camp.getCampId() != null) {
			board.setClientId(BoardDto.getClientId());//작성자
			board.setContent(BoardDto.getContent());//내용
			board.setDate(LocalDateTime.now());//시간
			board.setLike(0);//좋아요
			board.setPhoto(BoardDto.getPhoto());
			board.setTag(BoardDto.getTag());
			board.setTitle(BoardDto.getTitle());
			
			board.setCamp(camp);
			boardRepo.save(board);
			return true;
		}
		else return false;
	}

	@Override
	public boolean modifyArticle(BoardDTO BoardDto) {
		Board board = boardRepo.findByBoardId(BoardDto.getBoardId());
		Camping camp = campRepo.findByCampId(BoardDto.getCampId());
		
		if(camp.getCampId() != null && board != null) {
			
			board.setDate(LocalDateTime.now());//시간
			
			//내용
			if(BoardDto.getContent() != null)
				board.setContent(BoardDto.getContent());
			else
				board.setContent(board.getContent());
			//사진
			if(BoardDto.getPhoto() != null)
				board.setPhoto(BoardDto.getPhoto());
			else
				board.setPhoto(board.getPhoto());
			
			//캠핑장
			if(BoardDto.getCampId() != 0)
				board.setCamp(camp);
			else
				board.setCamp(board.getCamp());
			
			//태그
			if(BoardDto.getTag() != null)
				board.setTag(BoardDto.getTag());
			else
				board.setTag(board.getTag());
			//이름
			if(BoardDto.getTitle() != null)
				board.setTitle(BoardDto.getTitle());
			else
				board.setTitle(board.getTitle());
			boardRepo.save(board);
			return true;
		}
		else return false;
	}

	@Override
	public boolean deleteArticle(int boardId) {
		if(boardRepo.findByBoardId(boardId) != null) {
			boardRepo.delete(boardRepo.findByBoardId(boardId));
			return true;
		}
		else return false;
	}

	@Override
	public List<BoardDTO> getCampingTagList(String tag) {
		List<Board> list = boardRepo.findByTag(tag);
		List<BoardDTO> dtos = new ArrayList<BoardDTO>();
		if(list != null) {
			for (Board oneBoard : list) {
				BoardDTO dto = new BoardDTO();
				dto.setBoardId(oneBoard.getBoardId());
				dto.setCampId(oneBoard.getCamp().getCampId());
				dto.setClientId(oneBoard.getClientId());
				dto.setContent(oneBoard.getContent());
				dto.setDate(oneBoard.getDate());
				dto.setLike(oneBoard.getLike());
				dto.setPhoto(oneBoard.getPhoto());
				dto.setTag(oneBoard.getTag());
				dto.setTitle(oneBoard.getTitle());
				
				dtos.add(dto);
			}
			return dtos;
		}
		else return null;
	}

	@Override
	public List<BoardDTO> getFollowArticleList(List<String> followUserIds) {
		List<BoardDTO> dtos = new ArrayList<BoardDTO>();
		for (int i = 0; i < followUserIds.size(); i++) {
			String followOneUserId = followUserIds.get(i);
			List<Board> boards = boardRepo.findByClientId(followOneUserId);
			if(boards != null) {
				for (Board oneBoard : boards) {
					BoardDTO dto = new BoardDTO();
					dto.setBoardId(oneBoard.getBoardId());
					dto.setCampId(oneBoard.getCamp().getCampId());
					dto.setClientId(oneBoard.getClientId());
					dto.setContent(oneBoard.getContent());
					dto.setDate(oneBoard.getDate());
					dto.setLike(oneBoard.getLike());
					dto.setPhoto(oneBoard.getPhoto());
					dto.setTag(oneBoard.getTag());
					dto.setTitle(oneBoard.getTitle());
					
					dtos.add(dto);
				}
			}
		}
		return dtos;
	}

	@Override
	public List<BoardDTO> getTitleSearchList(String title) {
		List<Board> list = boardRepo.findByTitleLike("%"+title+"%");
		List<BoardDTO> dtos = new ArrayList<BoardDTO>();
		
		for (int i = 0; i < list.size(); i++) {
			Board oneBoard = list.get(i);
			BoardDTO dto = new BoardDTO();
			dto.setBoardId(oneBoard.getBoardId());
			dto.setCampId(oneBoard.getCamp().getCampId());
			dto.setClientId(oneBoard.getClientId());
			dto.setContent(oneBoard.getContent());
			dto.setDate(oneBoard.getDate());
			dto.setLike(oneBoard.getLike());
			dto.setPhoto(oneBoard.getPhoto());
			dto.setTag(oneBoard.getTag());
			dto.setTitle(oneBoard.getTitle());
			
			dtos.add(dto);
		}
		return dtos;
	}	
}
