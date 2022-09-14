package com.web.curation.model.dto;


import com.web.curation.model.entity.CampingBasicEntity;
import com.web.curation.model.entity.CampingDetailEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
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
public class CampingBasicDTO {
	
	private Integer campId;
	private String doNm;
	private String sigunguNm;
	private String facltNm;
	private String firstImageUrl;
	private String lineIntro;
	private String address;
	private String manageSttus;
	private double mapX;
	private double mapY;
	private int likes;
	private int doNmCode;
	
//	public CampingBasicEntity toEntity() {
//		return CampingBasicEntity.builder()
//				.doNm(doNm)
//				.sigunguNm(sigunguNm)
//				.facltNm(facltNm)
//				.firstImageUrl(firstImageUrl)
//				.lineIntro(lineIntro)
//				.address(address)
//				.manageSttus(manageSttus)
//				.mapX(mapX)
//				.mapY(mapY)
//				.likes(likes)
//				.build();
//	}
}
