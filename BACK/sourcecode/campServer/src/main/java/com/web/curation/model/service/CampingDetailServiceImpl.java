package com.web.curation.model.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.curation.model.dto.CampingDetailDTO;
import com.web.curation.model.entity.CampingDetailEntity;
import com.web.curation.model.handler.CampingDetailHandler;

@Service
public class CampingDetailServiceImpl implements CampingDetailService {

	CampingDetailHandler campingDetailHandler;
	
	
	@Autowired
	public CampingDetailServiceImpl(CampingDetailHandler campingDetailHandler) {
		this.campingDetailHandler = campingDetailHandler;
	}
	
	@Override
	public CampingDetailDTO saveOneCampingDetail(CampingDetailDTO campingDetailDTO) {
		CampingDetailEntity campingDetailEntity = campingDetailHandler.saveOneCampingDetailEntity(campingDetailDTO);
		
		// handler를 통해 만든 campingDetialEntity로 campingDetailDTO 재생성
		CampingDetailDTO campingDetailDTO2 = new CampingDetailDTO(campingDetailEntity.getCampingBasicEntity().getCampId(), campingDetailEntity.getCampDetailId(), campingDetailEntity.getIntro(), campingDetailEntity.getInduty(), campingDetailEntity.getHomepage(), campingDetailEntity.getAllar(), campingDetailEntity.getLctCl(),
				campingDetailEntity.isAnimalCmgCl(), campingDetailEntity.getAutoSiteCo(), campingDetailEntity.getCaravSiteCo(), campingDetailEntity.getGlampSiteCo(), campingDetailEntity.getGnrlSiteCo(), campingDetailEntity.getIndvdlCaravSiteCo(),
				campingDetailEntity.isCaravAcmpnyAt(), campingDetailEntity.isTrlerAcmpnyAt(), campingDetailEntity.getEqpmnLendCl(), campingDetailEntity.getBrazierCl(), campingDetailEntity.getOperDeCl(),
				campingDetailEntity.getOperPdCl(), campingDetailEntity.getPosblFcltyCl(), campingDetailEntity.getResveCl(), campingDetailEntity.getResveUrl(), campingDetailEntity.getSbrsCl(),
				campingDetailEntity.getSiteBottomCl1(), campingDetailEntity.getSiteBottomCl2(), campingDetailEntity.getSiteBottomCl3(), campingDetailEntity.getSiteBottomCl4(), campingDetailEntity.getSiteBottomCl5(),
				campingDetailEntity.getTel(), campingDetailEntity.getThemaEnvrnCl(), campingDetailEntity.getSwrmCo(), campingDetailEntity.getToiletCo(), campingDetailEntity.getWtrplCo());
		
		return campingDetailDTO2;
	}

	@Override
	public CampingDetailDTO getOneCampingDetailByCampDetailId(Integer campDetailId) {
		CampingDetailEntity campingDetailEntity = campingDetailHandler.getOneCampingDetailEntity(campDetailId);
		
		CampingDetailDTO campingDetailDTO = new CampingDetailDTO(campingDetailEntity.getCampingBasicEntity().getCampId(), campingDetailEntity.getCampDetailId(), campingDetailEntity.getIntro(), campingDetailEntity.getInduty(), campingDetailEntity.getHomepage(), campingDetailEntity.getAllar(), campingDetailEntity.getLctCl(),
				campingDetailEntity.isAnimalCmgCl(), campingDetailEntity.getAutoSiteCo(), campingDetailEntity.getCaravSiteCo(), campingDetailEntity.getGlampSiteCo(), campingDetailEntity.getGnrlSiteCo(), campingDetailEntity.getIndvdlCaravSiteCo(),
				campingDetailEntity.isCaravAcmpnyAt(), campingDetailEntity.isTrlerAcmpnyAt(), campingDetailEntity.getEqpmnLendCl(), campingDetailEntity.getBrazierCl(), campingDetailEntity.getOperDeCl(),
				campingDetailEntity.getOperPdCl(), campingDetailEntity.getPosblFcltyCl(), campingDetailEntity.getResveCl(), campingDetailEntity.getResveUrl(), campingDetailEntity.getSbrsCl(),
				campingDetailEntity.getSiteBottomCl1(), campingDetailEntity.getSiteBottomCl2(), campingDetailEntity.getSiteBottomCl3(), campingDetailEntity.getSiteBottomCl4(), campingDetailEntity.getSiteBottomCl5(),
				campingDetailEntity.getTel(), campingDetailEntity.getThemaEnvrnCl(), campingDetailEntity.getSwrmCo(), campingDetailEntity.getToiletCo(), campingDetailEntity.getWtrplCo());
		
		return campingDetailDTO;
	}
}
