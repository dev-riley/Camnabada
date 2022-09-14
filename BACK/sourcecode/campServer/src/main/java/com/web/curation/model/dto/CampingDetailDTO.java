package com.web.curation.model.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
//@Builder
public class CampingDetailDTO {
	private Integer campId;
	private Integer campDetailId;
	private String intro;
	private String induty;
	private String homepage;
	private double allar;
	private String lctCl;
	private boolean animalCmgCl;
	private int autoSiteCo;
	private int caravSiteCo;
	private int glampSiteCo;
	private int gnrlSiteCo;
	private int indvdlCaravSiteCo;
	private boolean caravAcmpnyAt;
	private boolean trlerAcmpnyAt;
	private String eqpmnLendCl;
	private String brazierCl;
	private String operDeCl;
	private String operPdCl;
	private String posblFcltyCl;
	private String resveCl;
	private String resveUrl;
	private String sbrsCl;
	private int siteBottomCl1;
	private int siteBottomCl2;
	private int siteBottomCl3;
	private int siteBottomCl4;
	private int siteBottomCl5;
	private String tel;
	private String themaEnvrnCl;
	private int swrmCo;
	private int toiletCo;
	private int wtrplCo;
	
//	public CampingDetailEntity toEntity() {
//		return CampingDetailEntity.builder()
//				.intro(intro)
//				.induty(induty)
//				.homepage(homepage)
//				.allar(allar)
//				.lctCl(lctCl)
//				.animalCmgCl(animalCmgCl)
//				.autoSiteCo(autoSiteCo)
//				.caravSiteCo(caravSiteCo)
//				.glampSiteCo(glampSiteCo)
//				.gnrlSiteCo(gnrlSiteCo)
//				.indvdlCaravSiteCo(indvdlCaravSiteCo)
//				.caravAcmpnyAt(caravAcmpnyAt)
//				.trlerAcmpnyAt(trlerAcmpnyAt)
//				.eqpmnLendCl(eqpmnLendCl)
//				.brazierCl(brazierCl)
//				.operDeCl(operDeCl)
//				.operPdCl(operPdCl)
//				.posblFcltyCl(posblFcltyCl)
//				.resveCl(resveCl)
//				.resveUrl(resveUrl)
//				.sbrsCl(sbrsCl)
//				.siteBottomCl1(siteBottomCl1)
//				.siteBottomCl2(siteBottomCl2)
//				.siteBottomCl3(siteBottomCl3)
//				.siteBottomCl4(siteBottomCl4)
//				.siteBottomCl5(siteBottomCl5)
//				.tel(tel)
//				.themaEnvrnCl(themaEnvrnCl)
//				.swrmCo(swrmCo)
//				.toiletCo(toiletCo)
//				.wtrplCo(wtrplCo)
//				.build();
//	}
}
