package com.web.curation.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.curation.model.entity.CampingBasicEntity;
import com.web.curation.model.mapperInterface.SidoMapper;
import com.web.curation.model.mapperInterface.SigunguMapper;

public interface CampingBasicRepository extends JpaRepository<CampingBasicEntity, Integer>{

	List<CampingBasicEntity> findByFacltNmLike(String keyword);
	CampingBasicEntity findByCampId(Integer campId);
	List<SigunguMapper> findDistinctSigunguNmByDoNm(String sido);
	List<CampingBasicEntity> findBySigunguNm(String sigungu);
//	List<SidoMapper> findDistinctDoNmBy();
	List<SidoMapper> findDistinctDoNmByOrderByDoNmCode();

}
