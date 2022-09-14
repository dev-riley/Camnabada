package com.gateway.route.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Session {
	
	@Id
	@Column(name = "access_token")
	String accessToken;
	
	@Column(name = "refresh_token")
	String refreshToken;
}
