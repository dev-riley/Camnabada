package com.web.curation.model.dao;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.curation.model.entity.CampingBasicEntity;
import com.web.curation.model.entity.CampingLikeEntity;
import com.web.curation.model.repository.CampingBasicRepository;
import com.web.curation.model.repository.CampingLikeRepository;

@Service
public class CampingLikeDAOImpl implements CampingLikeDAO {

	@Autowired
	CampingLikeRepository campingLikeRepository;
	
	@Autowired
	CampingBasicRepository campingBasicRepository;
	

	@Override
	public CampingLikeEntity saveUserId (CampingLikeEntity campingLikeEntity) {

		CampingLikeEntity checkEntity = campingLikeRepository.findUserIdByCampIdAndUserId(campingLikeEntity.getCampingBasicEntity().getCampId(), campingLikeEntity.getUserId());
		System.out.println(checkEntity);
		if(checkEntity == null) {
			CampingBasicEntity campingBasicEntity = campingBasicRepository.findByCampId(campingLikeEntity.getCampingBasicEntity().getCampId());
			campingBasicEntity.setLikes(campingBasicEntity.getLikes() + 1);
			campingBasicRepository.save(campingBasicEntity);
			campingLikeRepository.save(campingLikeEntity);
			return checkEntity;
		} else {
			return campingLikeEntity;
		}
	}

	@Override
	public CampingLikeEntity deleteUserId(CampingLikeEntity campingLikeEntity) {
		campingLikeRepository.deleteByCampIdAndUserId(campingLikeEntity.getCampingBasicEntity().getCampId(), campingLikeEntity.getUserId());
		CampingBasicEntity campingBasicEntity = campingBasicRepository.findByCampId(campingLikeEntity.getCampingBasicEntity().getCampId());
		campingBasicEntity.setLikes(campingBasicEntity.getLikes() - 1);
		campingBasicRepository.save(campingBasicEntity);
		
		return campingLikeEntity;
	}
	
	@Override
	public List<Map<String, String>> getListCampingBasicByLikedList(String userIdFromNick) {
		
		return campingLikeRepository.getListCampingBasicByUserId(userIdFromNick);
	}
}
