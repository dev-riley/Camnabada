package com.web.curation.model.service;

import java.util.List;

import com.web.curation.model.dto.CampingBasicDTO;
import com.web.curation.model.mapperInterface.SidoMapper;
import com.web.curation.model.mapperInterface.SigunguMapper;

public interface CampingBasicService {
	CampingBasicDTO saveOneCampingBasic(CampingBasicDTO campingBasicDTO);
	CampingBasicDTO getOneCampingBasicByCampId(Integer campId);
	List<CampingBasicDTO> getListCampingBasicAll();
	List<CampingBasicDTO> getListCampingBasicByKeyword(String keyword);
	List<SidoMapper> getListSido();
	List<SigunguMapper> getListSigungu(String sido);
	List<CampingBasicDTO> getListCampingBasicByLocation(String sigungu);
}
