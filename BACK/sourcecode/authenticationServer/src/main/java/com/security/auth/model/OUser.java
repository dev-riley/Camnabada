package com.security.auth.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class OUser {
	
	@Id
	@Column(name = "o_id")
    private String id;
	
	@Column(name = "o_name")
    private String name;
	
	@Column(name = "o_nickname")
    private String nickname;
	
	@Column(name = "o_intro")
    private String intro;
	
	@Column(name = "o_photo", columnDefinition = "LONGTEXT")
    private String photo;
}
