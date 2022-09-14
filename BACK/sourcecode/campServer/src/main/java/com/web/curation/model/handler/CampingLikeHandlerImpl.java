package com.web.curation.model.handler;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.curation.model.dao.CampingLikeDAO;
import com.web.curation.model.entity.CampingBasicEntity;
import com.web.curation.model.entity.CampingLikeEntity;
import com.web.curation.model.repository.CampingBasicRepository;

@Service
public class CampingLikeHandlerImpl implements CampingLikeHandler {

	@Autowired
	CampingBasicRepository campingBasicRepository;
	
	@Autowired
	CampingLikeDAO campingLikeDAO;
	
	@Override
	public CampingLikeEntity saveLikeEntity(Integer campId, String userId) {
		CampingBasicEntity campingBasicEntity = campingBasicRepository.findByCampId(campId);
		
		CampingLikeEntity campingLikeEntity = new CampingLikeEntity(campingBasicEntity, null, userId);
		
		return campingLikeDAO.saveUserId(campingLikeEntity);
	}
	
	@Override
	public CampingLikeEntity deleteLikeEntity(Integer campId, String userId) {
		CampingBasicEntity campingBasicEntity = campingBasicRepository.findByCampId(campId);
		
		CampingLikeEntity campingLikeEntity = new CampingLikeEntity(campingBasicEntity, null, userId);
		
		return campingLikeDAO.deleteUserId(campingLikeEntity);
		
	}
	
	@Override
	public List<Map<String, String>> getListCampingBasicByLikedList(String userIdFromNick) {
		
		
		return campingLikeDAO.getListCampingBasicByLikedList(userIdFromNick);
	}
}
