package com.web.curation.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.curation.model.entity.CampingDetailEntity;

public interface CampingDetailRepository extends JpaRepository<CampingDetailEntity, Integer>{

	CampingDetailEntity findByCampDetailId(Integer campDetailId);
	
}
