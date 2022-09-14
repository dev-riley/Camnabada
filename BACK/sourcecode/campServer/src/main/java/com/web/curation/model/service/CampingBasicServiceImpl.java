package com.web.curation.model.service;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.curation.model.dto.CampingBasicDTO;
import com.web.curation.model.entity.CampingBasicEntity;
import com.web.curation.model.handler.CampingBasicHandler;
import com.web.curation.model.mapperInterface.SidoMapper;
import com.web.curation.model.mapperInterface.SigunguMapper;

@Service
public class CampingBasicServiceImpl implements CampingBasicService {

	CampingBasicHandler campingBaiscHandler;
	
	
	@Autowired
	public CampingBasicServiceImpl(CampingBasicHandler campingBaiscHandler) {
		this.campingBaiscHandler = campingBaiscHandler;
	}
	
	@Override
	public CampingBasicDTO saveOneCampingBasic(CampingBasicDTO campingBasicDTO) {
		CampingBasicEntity campingBasicEntity = campingBaiscHandler.saveOneCampingBasicEntity(campingBasicDTO);
		
		CampingBasicDTO campingBasicDTO2 = new CampingBasicDTO(campingBasicEntity.getCampId(), campingBasicEntity.getDoNm(), campingBasicEntity.getSigunguNm(), campingBasicEntity.getFacltNm(), 
				campingBasicEntity.getFirstImageUrl(), campingBasicEntity.getLineIntro(), campingBasicEntity.getAddress(), campingBasicEntity.getManageSttus(),
				campingBasicEntity.getMapX(), campingBasicEntity.getMapY(), campingBasicEntity.getLikes(), campingBasicEntity.getDoNmCode());
		
		return campingBasicDTO2;
	}

	@Override
	public CampingBasicDTO getOneCampingBasicByCampId(Integer campId) {
		CampingBasicEntity campingBasicEntity = campingBaiscHandler.getOneCampingBasicEntity(campId);
		
		CampingBasicDTO campingBasicDTO = new CampingBasicDTO(campingBasicEntity.getCampId(), campingBasicEntity.getDoNm(), campingBasicEntity.getSigunguNm(), campingBasicEntity.getFacltNm(), 
				campingBasicEntity.getFirstImageUrl(), campingBasicEntity.getLineIntro(), campingBasicEntity.getAddress(), campingBasicEntity.getManageSttus(),
				campingBasicEntity.getMapX(), campingBasicEntity.getMapY(), campingBasicEntity.getLikes(), campingBasicEntity.getDoNmCode());
		
		return campingBasicDTO;
	}

	@Override
	public List<CampingBasicDTO> getListCampingBasicAll() {
		List<CampingBasicEntity> list = campingBaiscHandler.getListCampingBasicEntity();
		List<CampingBasicDTO> list2 = new ArrayList<>();
		
		for(int i=0; i<list.size(); i++) {
			CampingBasicDTO campingBasicDTO = new CampingBasicDTO(list.get(i).getCampId(), list.get(i).getDoNm(), list.get(i).getSigunguNm(), list.get(i).getFacltNm(), 
					list.get(i).getFirstImageUrl(), list.get(i).getLineIntro(), list.get(i).getAddress(), list.get(i).getManageSttus(),
					list.get(i).getMapX(), list.get(i).getMapY(), list.get(i).getLikes(), list.get(i).getDoNmCode());
			
			list2.add(campingBasicDTO);
		}
		
		return list2;
	}
	
	@Override
	public List<CampingBasicDTO> getListCampingBasicByKeyword(String keyword) {
		List<CampingBasicEntity> list = campingBaiscHandler.getListCampingBasicByKeywordEntity(keyword);
		List<CampingBasicDTO> list2 = new ArrayList<>();
		
		for(int i=0; i<list.size(); i++) {
			CampingBasicDTO campingBasicDTO = new CampingBasicDTO(list.get(i).getCampId(), list.get(i).getDoNm(), list.get(i).getSigunguNm(), list.get(i).getFacltNm(), 
					list.get(i).getFirstImageUrl(), list.get(i).getLineIntro(), list.get(i).getAddress(), list.get(i).getManageSttus(),
					list.get(i).getMapX(), list.get(i).getMapY(), list.get(i).getLikes(), list.get(i).getDoNmCode());
			
			list2.add(campingBasicDTO);
		}
		
		return list2;
	}

	@Override
	public List<SidoMapper> getListSido() {
		List<SidoMapper> list = campingBaiscHandler.getListSido();
		
		return list;
	}

	@Override
	public List<SigunguMapper> getListSigungu(String sido) {
		List<SigunguMapper> list = campingBaiscHandler.getListSigungu(sido);
		
		return list;
	}

	@Override
	public List<CampingBasicDTO> getListCampingBasicByLocation(String sigungu) {
		List<CampingBasicEntity> list = campingBaiscHandler.getListCampingBasicByLocationEntity(sigungu);
		List<CampingBasicDTO> list2 = new ArrayList<>();
		
		for(int i=0; i<list.size(); i++) {
			CampingBasicDTO campingBasicDTO = new CampingBasicDTO(list.get(i).getCampId(), list.get(i).getDoNm(), list.get(i).getSigunguNm(), list.get(i).getFacltNm(), 
					list.get(i).getFirstImageUrl(), list.get(i).getLineIntro(), list.get(i).getAddress(), list.get(i).getManageSttus(),
					list.get(i).getMapX(), list.get(i).getMapY(), list.get(i).getLikes(), list.get(i).getDoNmCode());
			
			list2.add(campingBasicDTO);
		}

		return list2;
	}
}
