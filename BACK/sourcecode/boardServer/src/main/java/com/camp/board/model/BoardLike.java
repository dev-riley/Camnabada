package com.camp.board.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Board_like")
public class BoardLike{	
	
	@Id 
	@Column(name = "board_id",nullable = false)
	private Integer boardId; 
	
	@ManyToOne
	@MapsId
	@JoinColumn(name = "board_id")
	private Board board;
	
	@Column(name = "user_id")
	private String id;
}
