package com.security.auth.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class FollowUser {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	int id;
	
	@Column(name = "following")
	String following;
	
	@Column(name = "follower")
	String follower;
}
