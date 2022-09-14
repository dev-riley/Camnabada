package com.camp.board.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "Board")
public class Board {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "board_id")
	private Integer boardId;
	
	@Column(name = "tag")
	private String tag;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "content", columnDefinition = "LONGTEXT")
	private String content;
	
	@Column(name = "client_id")
	private String clientId;
	
	@Column(name = "date")
	private LocalDateTime date;
	
	@Column(name = "photo", columnDefinition = "LONGTEXT")
	private String photo;
	
	@Column(name = "board_like")
	private int like;
	
	@OneToMany(mappedBy = "board",cascade = CascadeType.ALL)
	private List<Comment> comments = new ArrayList<Comment>();
	
	@OneToMany(mappedBy = "board",cascade = CascadeType.ALL)
	private List<BoardLike> boardlikes = new ArrayList<BoardLike>();
	
	@OneToOne
	@JoinColumn(name = "camp_id")
	private Camping camp;
}
