package com.web.curation.model.handler;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.curation.model.dao.CampingDetailDAO;
import com.web.curation.model.dto.CampingDetailDTO;
import com.web.curation.model.entity.CampingBasicEntity;
import com.web.curation.model.entity.CampingDetailEntity;
import com.web.curation.model.repository.CampingBasicRepository;

@Service
public class CampingDetailHandlerImpl implements CampingDetailHandler {

	@Autowired
	CampingBasicRepository campingBasicRepository;
	
	@Autowired
	CampingDetailDAO campingDetailDAO;
	
//	@Autowired
//	public CampingDetailHandlerImpl(CampingDetailDAO campingDetailDAO) {
//		this.campingDetailDAO = campingDetailDAO;
//	}
	
	@Override
	public CampingDetailEntity saveOneCampingDetailEntity(CampingDetailDTO campingDetailDTO) {
		CampingBasicEntity campingBasicEntity = campingBasicRepository.findByCampId(campingDetailDTO.getCampId());
		
		CampingDetailEntity campingDetailEntity = new CampingDetailEntity
				(campingBasicEntity, null, campingDetailDTO.getIntro(), campingDetailDTO.getInduty(), campingDetailDTO.getHomepage(), campingDetailDTO.getAllar(), campingDetailDTO.getLctCl(), campingDetailDTO.isAnimalCmgCl(), campingDetailDTO.getAutoSiteCo(), campingDetailDTO.getCaravSiteCo(), campingDetailDTO.getGlampSiteCo(), campingDetailDTO.getGnrlSiteCo(), campingDetailDTO.getIndvdlCaravSiteCo(), campingDetailDTO.isCaravAcmpnyAt(), campingDetailDTO.isTrlerAcmpnyAt(), campingDetailDTO.getEqpmnLendCl(), campingDetailDTO.getBrazierCl(),
						campingDetailDTO.getOperDeCl(), campingDetailDTO.getOperPdCl(), campingDetailDTO.getPosblFcltyCl(), campingDetailDTO.getResveCl(), campingDetailDTO.getResveUrl(), campingDetailDTO.getSbrsCl(), campingDetailDTO.getSiteBottomCl1(), campingDetailDTO.getSiteBottomCl2(), campingDetailDTO.getSiteBottomCl3(), campingDetailDTO.getSiteBottomCl4(), campingDetailDTO.getSiteBottomCl5(), campingDetailDTO.getTel(), campingDetailDTO.getThemaEnvrnCl(), campingDetailDTO.getSwrmCo(), campingDetailDTO.getToiletCo(), campingDetailDTO.getWtrplCo());
		return campingDetailDAO.saveOneCampingDetail(campingDetailEntity);
	}

	public CampingDetailEntity getOneCampingDetailEntity(Integer campId) {
		return campingDetailDAO.getOneCampingDetailByCampId(campId);
	}
}
