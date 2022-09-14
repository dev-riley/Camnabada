package com.web.curation.model.entity;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
@Table(name = "CAMPING_BASIC")
//@Builder
public class CampingBasicEntity {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "camp_id")
	private Integer campId;

	@Column(name = "do_nm", length = 30)
	private String doNm;
	
	@Column(name = "sigungu_nm", length = 30)
	private String sigunguNm;
	
	@Column(name = "faclt_nm", length = 100)
	private String facltNm;
	
	@Column(name = "first_image_url", columnDefinition = "MEDIUMTEXT")
	private String firstImageUrl;
	
	@Column(name = "line_intro", length = 200)
	private String lineIntro;
	
	@Column(name = "address", length = 100)
	private String address;
	
	@Column(name = "manage_sttus", length = 50)
	private String manageSttus;
	
	@Column(name = "map_x")
	private double mapX;
	
	@Column(name = "map_y")
	private double mapY;
	
	@Column(name = "likes")
	private int likes;
	
	@Column(name = "do_nm_code")
	private int doNmCode;
	
//	@OneToMany(mappedBy = "campId")
//	private List<CampingLikeEntity> campingLikes = new ArrayList<CampingLikeEntity>();
	
	
//	public CampingBasicDTO toDTO() {
//		return CampingBasicDTO.builder()
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
