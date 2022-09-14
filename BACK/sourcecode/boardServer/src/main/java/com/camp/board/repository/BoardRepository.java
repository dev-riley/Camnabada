package com.camp.board.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.camp.board.model.Board;

public interface BoardRepository extends JpaRepository<Board, Integer>{
	@Query(value = "select * from Board where camp_id = :campId", nativeQuery = true)
	List<Board> findByCampId(@Param(value = "campId")int campId);
	
	List<Board> findByTitleLike(String title);
	
	Board findByBoardId(Integer boardId);
	List<Board> findByTag(String tag);
	
	List<Board> findByClientId(String ClientId);
}
