package com.camp.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.camp.board.model.BoardLike;

public interface BoardLikeRepository extends JpaRepository<BoardLike, Integer>{
	BoardLike findById(String id);
	
	@Query(value = "select * from Board_like where user_id = :userId and board_id = :boardId", nativeQuery = true)
	BoardLike findByUser(@Param(value = "userId")String userId,@Param(value = "boardId")int boardId);
	
	@Query(value = "select * from Board_like where user_id = :userId and board_id = :boardId", nativeQuery = true)
	BoardLike findByDeleteBoardLike(@Param(value = "userId")String userId,@Param(value = "boardId")int boardId);
}
