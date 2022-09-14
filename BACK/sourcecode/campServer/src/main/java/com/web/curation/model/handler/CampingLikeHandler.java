package com.web.curation.model.handler;

import java.util.List;
import java.util.Map;

import com.web.curation.model.entity.CampingLikeEntity;

public interface CampingLikeHandler {

	CampingLikeEntity saveLikeEntity(Integer campId, String userId);
	CampingLikeEntity deleteLikeEntity(Integer campId, String userId);
	List<Map<String, String>> getListCampingBasicByLikedList(String userIdFromNick);
}
