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
@Table(name = "Comment_like")
public class CommentLike{
	
	@Id 
	@Column(name = "comment_id",nullable = false)
	private Integer commentId; 
	
	@ManyToOne
	@MapsId
	@JoinColumn(name = "comment_id")
	private Comment comment;
	
	@Column(name = "user_id")
	private String id;
}
