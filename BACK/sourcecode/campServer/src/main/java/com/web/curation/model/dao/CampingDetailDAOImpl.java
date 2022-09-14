package com.web.curation.model.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.curation.model.entity.CampingDetailEntity;
import com.web.curation.model.repository.CampingDetailRepository;

@Service
public class CampingDetailDAOImpl implements CampingDetailDAO {

	@Autowired
	CampingDetailRepository campingDetailRepository;
	
	@Override
	public CampingDetailEntity saveOneCampingDetail(CampingDetailEntity campingDetailEntity) {
		campingDetailRepository.save(campingDetailEntity);
		
		return campingDetailEntity;
	}
	
	@Override
	public CampingDetailEntity getOneCampingDetailByCampId(Integer campId) {
		CampingDetailEntity campingDetailEntity = campingDetailRepository.findByCampDetailId(campId);
		return campingDetailEntity;
	}
}
