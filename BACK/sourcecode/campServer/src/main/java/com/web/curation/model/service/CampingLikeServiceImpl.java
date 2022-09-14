package com.web.curation.model.service;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.curation.model.dto.CampingLikeDTO;
import com.web.curation.model.entity.CampingLikeEntity;
import com.web.curation.model.handler.CampingLikeHandler;

@Service
public class CampingLikeServiceImpl implements CampingLikeService {

	CampingLikeHandler campingLikeHandler;
	
	@Autowired
	public CampingLikeServiceImpl(CampingLikeHandler campingLikeHandler) {
		this.campingLikeHandler = campingLikeHandler;
	}
	
	@Override
	public CampingLikeDTO saveUserId(Integer campId, String userId) {
		CampingLikeEntity campingLikeEntity = campingLikeHandler.saveLikeEntity(campId, userId);
		
		if(campingLikeEntity == null) {
			return null;
		} else {
			CampingLikeDTO campingLikeDTO2 = new CampingLikeDTO(campingLikeEntity.getCampingBasicEntity().getCampId(), campingLikeEntity.getLikeId(),
					campingLikeEntity.getUserId());
			
			return campingLikeDTO2;
			
		}
	}
	
	@Override
	public CampingLikeDTO deleteUserId(Integer campId, String userId) {
		CampingLikeEntity campingLikeEntity = campingLikeHandler.deleteLikeEntity(campId, userId);
		
		CampingLikeDTO campingLikeDTO2 = new CampingLikeDTO(campingLikeEntity.getCampingBasicEntity().getCampId(), campingLikeEntity.getLikeId(),
				campingLikeEntity.getUserId());
		
		return campingLikeDTO2;
	}
	
	public List<Map<String, String>> getListCampingBasicByLikedList(String userIdFromNick) {
		return campingLikeHandler.getListCampingBasicByLikedList(userIdFromNick);
	}
}
