package com.camp.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.camp.board.model.CommentLike;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Integer>{
	@Query(value = "select * from Comment_like where user_id = :userId and comment_id = :commentId", nativeQuery = true)
	CommentLike findByUser(@Param(value = "userId")String userId,@Param(value = "commentId")int commentId);
	
	@Query(value = "select * from Comment_like where user_id = :userId and comment_id = :commentId", nativeQuery = true)
	CommentLike findByDeleteCommentLike(@Param(value = "userId")String userId,@Param(value = "commentId")int commentId);
}
