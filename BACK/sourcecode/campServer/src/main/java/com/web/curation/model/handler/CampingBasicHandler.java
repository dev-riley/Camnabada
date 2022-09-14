package com.web.curation.model.handler;

import java.util.List;

import com.web.curation.model.dto.CampingBasicDTO;
import com.web.curation.model.entity.CampingBasicEntity;
import com.web.curation.model.mapperInterface.SidoMapper;
import com.web.curation.model.mapperInterface.SigunguMapper;

public interface CampingBasicHandler {
	CampingBasicEntity saveOneCampingBasicEntity
	(CampingBasicDTO campingBasicDTO);
	CampingBasicEntity getOneCampingBasicEntity(Integer campId);
	List<CampingBasicEntity> getListCampingBasicEntity();
	List<CampingBasicEntity> getListCampingBasicByKeywordEntity(String Keyword);
	List<SidoMapper> getListSido();
	List<SigunguMapper> getListSigungu(String sido);
	List<CampingBasicEntity> getListCampingBasicByLocationEntity(String sigungu);
}
