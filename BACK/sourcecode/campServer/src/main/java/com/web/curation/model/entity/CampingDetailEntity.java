package com.web.curation.model.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "CAMPING_DETAIL")
//@Builder
public class CampingDetailEntity {
	
	@OneToOne
	@JoinColumn(name = "camp_id", referencedColumnName = "camp_id")
	private CampingBasicEntity campingBasicEntity;
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "camp_detail_id")
	private Integer campDetailId;
	
	@Column(name = "intro", columnDefinition = "TEXT")
	private String intro;
	
	@Column(name = "induty", length = 50)
	private String induty;
	
	@Column(name = "hompage", length = 500)
	private String homepage;
	
	@Column(name = "allar")
	private double allar;
	
	@Column(name = "lct_cl", length = 50)
	private String lctCl;
	
	@Column(name = "animal_cmg_cl")
	private boolean animalCmgCl;
	
	@Column(name = "auto_site_co")
	private int autoSiteCo;
	
	@Column(name = "carav_site_co")
	private int caravSiteCo;
	
	@Column(name = "glamp_site_co")
	private int glampSiteCo;
	
	@Column(name = "gnrl_site_co")
	private int gnrlSiteCo;
	
	@Column(name = "indvdl_carav_site_co")
	private int indvdlCaravSiteCo;
	
	@Column(name = "carav_acmpny_at")
	private boolean caravAcmpnyAt;
	
	@Column(name = "trler_acmpny_at")
	private boolean trlerAcmpnyAt;
	
	@Column(name = "eqpmn_lend_cl", length = 200)
	private String eqpmnLendCl;
	
	@Column(name = "brazier_cl", length = 100)
	private String brazierCl;
	
	@Column(name = "oper_de_cl", length = 100)
	private String operDeCl;
	
	@Column(name = "oper_pd_cl", length = 100)
	private String operPdCl;
	
	@Column(name = "posbl_fclty_cl", length = 500)
	private String posblFcltyCl;
	
	@Column(name = "resve_cl", length = 1000)
	private String resveCl;
	
	@Column(name = "resve_url", length = 1000)
	private String resveUrl;
	
	@Column(name = "sbrs_cl", length = 500)
	private String sbrsCl;
	
	@Column(name = "site_bottom_cl1")
	private int siteBottomCl1;
	
	@Column(name = "site_bottom_cl2")
	private int siteBottomCl2;
	
	@Column(name = "site_bottom_cl3")
	private int siteBottomCl3;
	
	@Column(name = "site_bottom_cl4")
	private int siteBottomCl4;
	
	@Column(name = "site_bottom_cl5")
	private int siteBottomCl5;
	
	@Column(name = "tel", length = 50)
	private String tel;
	
	@Column(name = "thema_envrn_cl", length = 500)
	private String themaEnvrnCl;
	
	@Column(name = "swrm_co", length = 500)
	private int swrmCo;
	
	@Column(name = "toilet_co")
	private int toiletCo;
	
	@Column(name = "wtrpl_co")
	private int wtrplCo;
	
//	public CampingDetailDTO toDTO() {
//		return CampingDetailDTO.builder()
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
