package com.camp.board.DTO;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class BoardDTO {
	
	private int boardId;
	private int campId;
	private String tag;
	private String title;
	private String content;
	private String clientId;
	private LocalDateTime date;
	private String photo;
	private int like;
}
