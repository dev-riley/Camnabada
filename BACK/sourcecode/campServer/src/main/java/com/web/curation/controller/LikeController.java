package com.web.curation.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.curation.model.dto.CampingLikeDTO;
import com.web.curation.model.service.CampingLikeService;
import com.web.curation.verification.VerificationImpl;

import io.swagger.annotations.ApiOperation;
import springfox.documentation.spring.web.json.Json;

@RestController
@RequestMapping("/camp")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LikeController {

	private final String auth = "Authorization";

	@Autowired
	VerificationImpl verificationImpl;

	@Autowired
	private CampingLikeService campingLikeService;
	
	private ObjectMapper mapper = new ObjectMapper();
	private JsonNode jsonNode;

	@ApiOperation(value = "캠핑장 좋아요", notes = "캠핑장 좋아요 리스트에 유저를 등록한다.", response = Json.class)
	@PostMapping(value = "/like/{campId}")
	public ResponseEntity<String> doLikeCamping(@PathVariable Integer campId, HttpServletRequest request) {
		String token = request.getHeader(auth);
		String userId = verificationImpl.verify(token);
		
		if(userId != null) {
			if (campingLikeService.saveUserId(campId, userId) == null) {
				return new ResponseEntity<String>("좋아요 체크", HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("좋아요 해제", HttpStatus.NO_CONTENT);
			}
		} else {
			return null;
		}
	}

	@ApiOperation(value = "캠핑장 좋아요 취소", notes = "캠핑장 좋아요 리스트에 있는 유저를 삭제한다.", response = Json.class)
	@DeleteMapping(value = "/like/{campId}")
	public CampingLikeDTO undoLikeCamping(@PathVariable Integer campId, HttpServletRequest request) {
		String token = request.getHeader(auth);
		String userId = verificationImpl.verify(token);

		return campingLikeService.deleteUserId(campId, userId);
	}

	@ApiOperation(value = "좋아요한 리스트", notes = "유저가 좋아요한 캠핑장들을 반환한다.", response = Json.class)
	@GetMapping(value = "/like/list/{userNickname}")
	public ResponseEntity<List<Map<String, String>>> campLikeList(@PathVariable String userNickname) {
//		String token = request.getHeader(auth);
//		String userId = verificationImpl.verify(token);

		StringBuffer result = new StringBuffer();
		try {
			String encodeResult = URLEncoder.encode(userNickname, "UTF-8");
			
			String apiUrl = "http://i6c109.p.ssafy.io:8000/user/" + encodeResult;
			URL url = new URL(apiUrl);

			HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
			urlConnection.setRequestMethod("GET");

			BufferedReader bufferedReader = new BufferedReader(
					new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

			String returnLine;
			while ((returnLine = bufferedReader.readLine()) != null) {
				result.append(returnLine);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		String json = result.toString();

		try {
			jsonNode = mapper.readTree(json);
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String userIdFromNick = jsonNode.get(0).get("id").toString();

		List<Map<String, String>> list = new ArrayList<>();
		list = campingLikeService.getListCampingBasicByLikedList(userIdFromNick.replaceAll("\"",""));
		
		return new ResponseEntity<List<Map<String, String>>>(list, HttpStatus.OK);
	}
}


