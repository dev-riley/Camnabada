package com.camp.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.camp.board.model.Camping;

public interface CampRepository extends JpaRepository<Camping, Integer>{
	Camping findByCampId(Integer campId);//아이디로 찾기
}
