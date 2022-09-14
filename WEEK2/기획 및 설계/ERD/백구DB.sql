CREATE TABLE `USER` (
	`user_id`	varchar(20)	NOT NULL,
	`user_name`	varchar(20)	NULL,
	`user_nickname`	varchar(20)	NULL,
	`user_pwd`	varchar(20)	NULL,
	`user_email`	varchar(50)	NULL,
	`user_intro`	varchar(50)	NULL,
	`user_photo`	mediumtext	NULL
);

CREATE TABLE `CHATLOG` (
	`message_id`	int	NOT NULL,
	`chatroom_id`	int	NOT NULL,
	`message`	varchar(100)	NULL,
	`sender`	varchar(20)	NULL,
	`date`	date	NULL,
	`is_over`	boolean	NULL
);

CREATE TABLE `CHATROOM` (
	`chatroom_id`	int	NOT NULL,
	`user1`	varchar(20)	NULL,
	`user2`	varchar(20)	NULL
);

CREATE TABLE `BOARD` (
	`board_id`	int	NOT NULL,
	`camp_id`	int	NOT NULL,
	`tag`	varchar(20)	NULL,
	`title`	varchar(100)	NULL,
	`content`	longtext	NULL,
	`author_id`	varchar(20)	NULL,
	`date`	date	NULL,
	`photo`	mediumtext	NULL,
	`like`	int	NULL
);

CREATE TABLE `COMMENT` (
	`comment_id`	int	NOT NULL,
	`board_id`	int	NOT NULL,
	`content`	text	NULL,
	`author_id`	varchar(20)	NULL,
	`date`	date	NULL,
	`like`	int	NULL
);

CREATE TABLE `CAMPING_BASIC` (
	`camp_id`	int	NOT NULL,
	`do_nm`	varchar(10)	NULL,
	`sigungu_nm`	varchar(20)	NULL,
	`faclt_nm`	varchar(20)	NULL,
	`first_image_url`	mediumtext	NULL,
	`line_Intro`	varchar(200)	NULL,
	`address`	varchar(30)	NULL	COMMENT 'addr1+addr2',
	`manage_sttus`	varchar(30)	NULL,
	`map_x`	double	NULL,
	`map_y`	double	NULL,
	`like`	int	NULL
);

CREATE TABLE `COCOMMENT` (
	`co_coment_id`	int	NOT NULL,
	`comment_id`	int	NOT NULL,
	`content`	text	NULL,
	`author_id`	varchar(20)	NULL,
	`date`	date	NULL,
	`like`	int	NULL
);

CREATE TABLE `SESSION` (
	`user_id`	varchar(20)	NOT NULL,
	`refresh_token`	varchar(200)	NULL,
	`refresh_token_exp`	varchar(200)	NULL
);

CREATE TABLE `OAUTHUSER` (
	`o_user_id`	varchar(20)	NOT NULL,
	`o_user_name`	varchar(20)	NULL,
	`o_user_nickname`	varchar(20)	NULL,
	`o_user_email`	varchar(50)	NULL,
	`o_user_intro`	varchar(50)	NULL,
	`o_user_photo`	mediumtext	NULL
);

CREATE TABLE `CAMPLIKE` (
	`camp_id`	int	NOT NULL,
	`user_id`	varchar(20)	NULL
);

CREATE TABLE `COMMENTLIKE` (
	`comment_id`	int	NOT NULL,
	`user_id`	varchar(20)	NULL
);

CREATE TABLE `COCOMENTLIKE` (
	`co_coment_id`	int	NOT NULL,
	`user_id`	varchar(20)	NULL
);

CREATE TABLE `BOARDLIKE` (
	`board_id`	int	NOT NULL,
	`user_id`	varchar(20)	NULL
);

CREATE TABLE `FOLLOWING` (
	`user_id`	varchar(20)	NOT NULL,
	`f_user_id`	varchar(20)	NULL
);

CREATE TABLE `FOLLOWER` (
	`user_id`	varchar(20)	NOT NULL,
	`f_user_id`	varchar(20)	NULL
);

CREATE TABLE `OAUTHFOLLOWER` (
	`o_user_id`	varchar(20)	NOT NULL,
	`o_f_user_id`	varchar(20)	NULL
);

CREATE TABLE `OAUTHFOLLOWING` (
	`o_user_id`	varchar(20)	NOT NULL,
	`o_f_user_id`	varchar(20)	NULL
);

CREATE TABLE `OVERMESSAGE` (
	`message_id`	int	NOT NULL,
	`over_message`	text	NULL,
	`photo`	mediumtext	NULL
);

CREATE TABLE `CAMPING_DETAIL` (
	`camp_id`	int	NOT NULL,
	`intro`	text	NULL,
	`induty`	varchar(20)	NULL,
	`homepage`	varchar(30)	NULL,
	`allar`	float	NULL,
	`lct_cl`	varchar(10)	NULL,
	`animal_cmg_cl`	boolean	NULL,
	`auto_site_co`	int	NULL,
	`carav_site_co`	int	NULL,
	`glamp_site_co`	int	NULL,
	`gnrl_site_co`	int	NULL,
	`indvdl_carav_site_co`	int	NULL,
	`carav_acmpny_at`	boolean	NULL,
	`trler_acmpny_at`	boolean	NULL,
	`eqpmn_lend_cl`	varchar(100)	NULL,
	`brazier_cl`	varhcar(20)	NULL,
	`oper_de_cl`	varchar(30)	NULL,
	`oper_pd_cl`	varchar(50)	NULL,
	`posbl_fclty_cl`	varchar(300)	NULL,
	`resve_cl`	varchar(100)	NULL,
	`resve_url`	varchar(100)	NULL,
	`sbrs_cl`	varchar(250)	NULL,
	`site_bottom_cl1`	int	NULL,
	`site_bottom_cl2`	int	NULL,
	`site_bottom_cl3`	int	NULL,
	`site_bottom_cl4`	int	NULL,
	`site_bottom_cl5`	int	NULL,
	`tel`	varchar(30)	NULL,
	`thema_envrn_cl`	varchar(300)	NULL,
	`swrm_co`	int	NULL,
	`toilet_co`	int	NULL,
	`wtrpl_co`	int	NULL
);

ALTER TABLE `USER` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `CHATLOG` ADD CONSTRAINT `PK_CHATLOG` PRIMARY KEY (
	`message_id`
);

ALTER TABLE `CHATROOM` ADD CONSTRAINT `PK_CHATROOM` PRIMARY KEY (
	`chatroom_id`
);

ALTER TABLE `BOARD` ADD CONSTRAINT `PK_BOARD` PRIMARY KEY (
	`board_id`
);

ALTER TABLE `COMMENT` ADD CONSTRAINT `PK_COMMENT` PRIMARY KEY (
	`comment_id`
);

ALTER TABLE `CAMPING_BASIC` ADD CONSTRAINT `PK_CAMPING_BASIC` PRIMARY KEY (
	`camp_id`
);

ALTER TABLE `COCOMMENT` ADD CONSTRAINT `PK_COCOMMENT` PRIMARY KEY (
	`co_coment_id`
);

ALTER TABLE `SESSION` ADD CONSTRAINT `PK_SESSION` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `OAUTHUSER` ADD CONSTRAINT `PK_OAUTHUSER` PRIMARY KEY (
	`o_user_id`
);

ALTER TABLE `CAMPING_DETAIL` ADD CONSTRAINT `PK_CAMPING_DETAIL` PRIMARY KEY (
	`camp_id`
);

ALTER TABLE `CAMPING_DETAIL` ADD CONSTRAINT `FK_CAMPING_BASIC_TO_CAMPING_DETAIL_1` FOREIGN KEY (
	`camp_id`
)
REFERENCES `CAMPING_BASIC` (
	`camp_id`
);

