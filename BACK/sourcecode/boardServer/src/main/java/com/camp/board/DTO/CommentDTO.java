package com.camp.board.DTO;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class CommentDTO {
	
	private int commentId;
	private int boardId;
	private String content;
	private String clientId;
	private LocalDateTime date;
	private int like;
}
