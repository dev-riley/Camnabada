package com.web.curation.model.dao;

import java.util.List;
import java.util.Map;

import com.web.curation.model.entity.CampingLikeEntity;

public interface CampingLikeDAO {

	CampingLikeEntity saveUserId(CampingLikeEntity campingLikeEntity);
	CampingLikeEntity deleteUserId(CampingLikeEntity campingLikeEntity);
	List<Map<String, String>> getListCampingBasicByLikedList(String userIdFromNick);
}
