package com.camp.board.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.camp.board.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer>{
	@Query(value = "select * from Comment where board_id = :boardId", nativeQuery = true)
	List<Comment> findBoardId(@Param(value = "boardId")Integer boardId);
	Comment findById(int commentId);
}
