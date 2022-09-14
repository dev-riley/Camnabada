package com.web.curation.model.dao;

import java.util.List;

import com.web.curation.model.entity.CampingBasicEntity;
import com.web.curation.model.mapperInterface.SidoMapper;
import com.web.curation.model.mapperInterface.SigunguMapper;

public interface CampingBasicDAO {
	
	CampingBasicEntity saveOneCampingBasic(CampingBasicEntity campingBasicEntity);
	CampingBasicEntity getOneCampingBasicByCampId(Integer campId);
	List<CampingBasicEntity> getListCampingBasicAll();
	List<CampingBasicEntity> getListCampingBasicByKeywordEntity(String keyword);
	List<SidoMapper> getListSido();
	List<SigunguMapper> getListSigungu(String sido);
	List<CampingBasicEntity> getListCampingBasicByLocationEntity(String sigungu);
}
