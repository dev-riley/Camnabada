package com.web.curation.model.service;

import java.util.List;
import java.util.Map;

import com.web.curation.model.dto.CampingLikeDTO;

public interface CampingLikeService {

	CampingLikeDTO saveUserId(Integer campId, String userId);
	CampingLikeDTO deleteUserId(Integer campId, String userId);
	List<Map<String, String>> getListCampingBasicByLikedList(String userIdFromNick);
}
