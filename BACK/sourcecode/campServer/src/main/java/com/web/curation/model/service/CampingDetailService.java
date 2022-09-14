package com.web.curation.model.service;

import com.web.curation.model.dto.CampingDetailDTO;

public interface CampingDetailService {
	CampingDetailDTO saveOneCampingDetail
	(CampingDetailDTO campingDetailDTO);
//	(String intro, String induty, String homepage, double allar, String lctCl, boolean animalCmgCl, int autoSiteCo, int caravSiteCo, int glampSiteCo, int gnrlSiteCo, int indvdlCaravSiteCo,
//			boolean caravAcmpnyAt, boolean trlerAcmpnyAt, String eqpmnLendCl, String brazierCl, String operDeCl, String operPdCl, String posblFcltyCl, String resveCl, String resveUrl, String sbrsCl,
//			int siteBottomCl1, int siteBottomCl2, int siteBottomCl3, int siteBottomCl4, int siteBottomCl5, String tel, String themaEnvrnCl, int swrmCo, int toiletCo, int wtrplCo);
	CampingDetailDTO getOneCampingDetailByCampDetailId(Integer campDetailId);
}
