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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Comment")
public class Comment {
	
	@Id  @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id")
	private int id;
	
	@Column(name = "content")
	private String content;
	
	@Column(name = "client_id")
	private String clientId;
	
	@Column(name = "date")
	private LocalDateTime date;
	
	@Column(name = "comment_like")
	private int like;
	
	@ManyToOne
	@JoinColumn(name = "board_id")
	private Board board;
	
	@OneToMany(mappedBy = "comment",cascade = CascadeType.ALL)
	private List<CommentLike> commentlikes = new ArrayList<CommentLike>();
	
	public void setBoard(Board board) {
		this.board = board;
	}
}
