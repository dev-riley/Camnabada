package com.web.curation.model.handler;

import com.web.curation.model.dto.CampingDetailDTO;
import com.web.curation.model.entity.CampingDetailEntity;

public interface CampingDetailHandler {
	CampingDetailEntity saveOneCampingDetailEntity
	(CampingDetailDTO campingDetailDTO);
	CampingDetailEntity getOneCampingDetailEntity(Integer campId);
}
