package com.web.curation.model.dao;

import com.web.curation.model.entity.CampingDetailEntity;

public interface CampingDetailDAO {
	
	CampingDetailEntity saveOneCampingDetail(CampingDetailEntity campingDetailEntity);
	CampingDetailEntity getOneCampingDetailByCampId(Integer campId);
	
}
