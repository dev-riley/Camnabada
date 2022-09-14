package com.web.curation.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "CAMPING_LiKE")
public class CampingLikeEntity {
	@ManyToOne
	@JoinColumn(name = "camp_id", referencedColumnName = "camp_id")
	private CampingBasicEntity campingBasicEntity;
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "like_id")
	private Integer likeId;
	
	@Column(name = "user_id", length = 50)
	private String userId;
}
