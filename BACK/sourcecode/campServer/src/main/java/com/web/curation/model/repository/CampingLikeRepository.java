package com.web.curation.model.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web.curation.model.entity.CampingLikeEntity;

public interface CampingLikeRepository extends JpaRepository<CampingLikeEntity, Integer>{

//	void deleteByCampingBasicEntityAndUserId(Integer campingBasicEntity, String userId);
	
	@Query(value = "select * from camping_like where camp_id = :campId and user_id = :userId", nativeQuery = true)
	CampingLikeEntity findUserIdByCampIdAndUserId(@Param(value = "campId")Integer campId, @Param(value = "userId")String userId);

	@Query(value = "delete from camping_like where camp_id = :campId and user_id = :userId", nativeQuery = true)
	void deleteByCampIdAndUserId(@Param(value = "campId")Integer campId, @Param(value = "userId")String userId);

	@Query(value = "SELECT cb.camp_id as campId, cb.address as address, cb.do_nm as doNm, cb.faclt_nm as facltNm, cb.first_image_url as firstImageUrl, cb.likes as likes, cb.line_intro as lineIntro, cb.manage_sttus as manageSttus, cb.map_x as mapX, cb.map_y as mapY, cb.sigungu_nm as sigunguNm "
			+ "FROM camping_basic cb, camping_like cl WHERE cb.camp_id = cl.camp_id AND cl.user_id = :userIdFromNick ", nativeQuery = true)
	List<Map<String, String>> getListCampingBasicByUserId(@Param(value = "userIdFromNick")String userIdFromNick);
}