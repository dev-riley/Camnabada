package com.camp.board.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "camping_basic")
public class Camping {

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
	
}
