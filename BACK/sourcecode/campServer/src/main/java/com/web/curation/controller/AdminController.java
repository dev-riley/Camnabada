package com.web.curation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.curation.model.dto.CampingBasicDTO;
import com.web.curation.model.dto.CampingDetailDTO;
import com.web.curation.model.service.CampingBasicService;
import com.web.curation.model.service.CampingDetailService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private CampingBasicService campingBasicService;
	
	@Autowired
	private CampingDetailService campingDetailService;
	
	@ApiOperation(value = "캠핑장 기본 데이터 입력", notes = "캠핑장 기본 정보를 직접 입력하여 DB에 저장")
	@PostMapping(value = "/camp/data/basic")
	public CampingBasicDTO saveCampingBaisc(@RequestBody CampingBasicDTO campingBasicDTO) {
		return campingBasicService.saveOneCampingBasic(campingBasicDTO);
		// campId는 @GeneratedValue 어노테이션으로 인해 null값으로 넣어도 자동 증가됨
		
//		String doNm = campingBasicDTO.getDoNm();
//		String sigunguNm = campingBasicDTO.getSigunguNm();
//		String facltNm = campingBasicDTO.getFacltNm();
//		String firstImageUrl = campingBasicDTO.getFirstImageUrl();
//		String lineIntro = campingBasicDTO.getLineIntro();
//		String address = campingBasicDTO.getAddress();
//		String manageSttus = campingBasicDTO.getManageSttus();
//		double mapX = campingBasicDTO.getMapX();
//		double mapY = campingBasicDTO.getMapY();
//		int likes = campingBasicDTO.getLikes();
		
//		return campingBasicService.saveCampingBasic(doNm, sigunguNm, facltNm, firstImageUrl, lineIntro, address, manageSttus, mapX, mapY, likes);
	}

	@ApiOperation(value = "캠핑장 상세 데이터 입력", notes = "캠핑장 상세 정보를 직접 입력하여 DB에 저장.")
	@PostMapping(value = "/camp/data/detail")
	public CampingDetailDTO saveCampingDetail(@RequestBody CampingDetailDTO campingDetailDTO) {
		return campingDetailService.saveOneCampingDetail(campingDetailDTO);

//		String intro = campingDetailDTO.getIntro();
//		String induty = campingDetailDTO.getInduty();
//		String homepage = campingDetailDTO.getHomepage();
//		double allar = campingDetailDTO.getAllar();
//		String lctCl = campingDetailDTO.getLctCl();
//		boolean animalCmgCl = campingDetailDTO.isAnimalCmgCl();
//		int autoSiteCo = campingDetailDTO.getAutoSiteCo();
//		int caravSiteCo = campingDetailDTO.getCaravSiteCo();
//		int glampSiteCo = campingDetailDTO.getGlampSiteCo();
//		int gnrlSiteCo = campingDetailDTO.getGnrlSiteCo();
//		int indvdlCaravSiteCo = campingDetailDTO.getIndvdlCaravSiteCo();
//		boolean caravAcmpnyAt = campingDetailDTO.isCaravAcmpnyAt();
//		boolean trlerAcmpnyAt = campingDetailDTO.isTrlerAcmpnyAt();
//		String eqpmnLendCl = campingDetailDTO.getEqpmnLendCl();
//		String brazierCl = campingDetailDTO.getBrazierCl();
//		String operDeCl = campingDetailDTO.getOperDeCl();
//		String operPdCl = campingDetailDTO.getOperPdCl();
//		String posblFcltyCl = campingDetailDTO.getPosblFcltyCl();
//		String resveCl = campingDetailDTO.getResveCl();
//		String resveUrl = campingDetailDTO.getResveUrl();
//		String sbrsCl = campingDetailDTO.getSbrsCl();
//		int siteBottomCl1 = campingDetailDTO.getSiteBottomCl1();
//		int siteBottomCl2 = campingDetailDTO.getSiteBottomCl2();
//		int siteBottomCl3 = campingDetailDTO.getSiteBottomCl3();
//		int siteBottomCl4 = campingDetailDTO.getSiteBottomCl4();
//		int siteBottomCl5 = campingDetailDTO.getSiteBottomCl5();
//		String tel = campingDetailDTO.getTel();
//		String themaEnvrnCl = campingDetailDTO.getThemaEnvrnCl();
//		int swrmCo = campingDetailDTO.getSwrmCo();
//		int toiletCo = campingDetailDTO.getToiletCo();
//		int wtrplCo = campingDetailDTO.getWtrplCo();
		
//		return campingDetailService.saveCampingDetail(intro, induty, homepage, allar, lctCl, animalCmgCl, autoSiteCo, caravSiteCo, glampSiteCo, gnrlSiteCo, indvdlCaravSiteCo, caravAcmpnyAt, trlerAcmpnyAt, eqpmnLendCl, brazierCl,
//				operDeCl, operPdCl, posblFcltyCl, resveCl, resveUrl, sbrsCl, siteBottomCl1, siteBottomCl2, siteBottomCl3, siteBottomCl4, siteBottomCl5, tel, themaEnvrnCl, swrmCo, toiletCo, wtrplCo);
	}
}
