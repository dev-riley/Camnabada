package com.security.auth.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class User {
	
	@Id
	@Column(name = "user_id")
    private String id;
	
	@Column(name = "user_name")
    private String username;
	
	@Column(name = "user_nickname")
    private String nickname;
	
	@Column(name = "user_password")
    private String password;
	
	@Column(name = "user_email")
    private String email;
	
	@Column(name = "user_intro")
    private String intro;
	
	@Column(name = "user_photo", columnDefinition = "LONGTEXT")
    private String photo;
    
}
