package com.camp.board.DTO;

import lombok.Data;

@Data
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
}
