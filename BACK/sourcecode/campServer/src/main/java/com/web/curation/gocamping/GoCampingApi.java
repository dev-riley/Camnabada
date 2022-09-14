package com.web.curation.gocamping;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.curation.model.dto.CampingBasicDTO;
import com.web.curation.model.dto.CampingDetailDTO;
import com.web.curation.model.service.CampingBasicService;
import com.web.curation.model.service.CampingDetailService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api")
public class GoCampingApi {

	private final Connection connection;

	@Autowired
	public GoCampingApi(Connection connection) {
		this.connection = connection;
	}

	@Autowired
	private CampingBasicService campingBasicService;

	@Autowired
	private CampingDetailService campingDetailService;

	private ObjectMapper mapper = new ObjectMapper();
	private JsonNode jsonNode;
	
	@ApiOperation(value = "전체 캠핑장 기본 데이터 입력", notes = "공공API를 불러와 전체 캠핑장 기본 데이터를 입력한다.")
	@GetMapping("/gocamping/basic")
	public void campingBasic() {
		String json = connection.goCampingConnect();
		
		try {
			if(json != null) {
				jsonNode = mapper.readTree(json).get("response").get("body").get("items").get("item");
				
				CampingBasicDTO campingBasicDTO = new CampingBasicDTO();
				
				JsonNode jObj;
				System.out.println(jsonNode.size());
				for(int i=0; i<jsonNode.size(); i++) {
					jObj = jsonNode.get(i);
					
					campingBasicDTO.setCampId(null);
					
					if(jObj.get("doNm") != null)
						campingBasicDTO.setDoNm(jObj.get("doNm").toString().replaceAll("\"", ""));
					else
						campingBasicDTO.setDoNm(null);

					if(jObj.get("sigunguNm") != null)
						campingBasicDTO.setSigunguNm(jObj.get("sigunguNm").toString().replaceAll("\"", ""));
					else
						campingBasicDTO.setSigunguNm(null);
					
					if(jObj.get("facltNm") != null)
						campingBasicDTO.setFacltNm(jObj.get("facltNm").toString().replaceAll("\"", ""));
					else
						campingBasicDTO.setFacltNm(null);

					if(jObj.get("firstImageUrl") != null)
						campingBasicDTO.setFirstImageUrl(jObj.get("firstImageUrl").toString().replaceAll("\"", ""));
					else
						campingBasicDTO.setFirstImageUrl(null);

					if(jObj.get("lineIntro") != null)
						campingBasicDTO.setLineIntro(jObj.get("lineIntro").toString().replaceAll("\"", ""));
					else
						campingBasicDTO.setLineIntro(null);
					
					String str, str2;
					if(jObj.get("addr2") != null) {
						str = jObj.get("addr1").toString().replaceAll("\"", "");
//						str = str.substring(0, str.length()-1);
						str2 = jObj.get("addr2").toString().replaceAll("\"", "");
//						str2 = str2.substring(1, str2.length());
						campingBasicDTO.setAddress(str + str2);
					} else {
						campingBasicDTO.setAddress(jObj.get("addr1").toString().replaceAll("\"", ""));
					}

					if(jObj.get("manageSttus") != null)
						campingBasicDTO.setManageSttus(jObj.get("manageSttus").toString().replaceAll("\"", ""));
					else
						campingBasicDTO.setManageSttus(null);

					if(jObj.get("mapX") != null && isStringDouble(jObj.get("mapX").toString().replaceAll("\"", ""))) {
						campingBasicDTO.setMapX(Double.parseDouble(jObj.get("mapX").toString().replaceAll("\"", "")));
					} else
						campingBasicDTO.setMapX(0.0);

					if(jObj.get("mapY") != null && isStringDouble(jObj.get("mapY").toString().replaceAll("\"", ""))) {
						campingBasicDTO.setMapY(Double.parseDouble(jObj.get("mapY").toString().replaceAll("\"", "")));
					} else
						campingBasicDTO.setMapY(0.0);
					
					campingBasicDTO.setLikes(0);
					
					if(jObj.get("doNm").toString().replaceAll("\"", "").equals("서울시")) {
						campingBasicDTO.setDoNmCode(1);
					} else if(jObj.get("doNm").toString().replaceAll("\"", "").equals("부산시")) {
						campingBasicDTO.setDoNmCode(2);
					} else if(jObj.get("doNm").toString().replaceAll("\"", "").equals("대구시")) {
						campingBasicDTO.setDoNmCode(3);
					} else if(jObj.get("doNm").toString().replaceAll("\"", "").equals("인천시")) {
						campingBasicDTO.setDoNmCode(4);
					} else if(jObj.get("doNm").toString().replaceAll("\"", "").equals("광주시")) {
						campingBasicDTO.setDoNmCode(5);
					} else if(jObj.get("doNm").toString().replaceAll("\"", "").equals("대전시")) {
						campingBasicDTO.setDoNmCode(6);
					} else if(jObj.get("doNm").toString().replaceAll("\"", "").equals("울산시")) {
						campingBasicDTO.setDoNmCode(7);
					} else if(jObj.get("doNm").toString().replaceAll("\"", "").equals("세종시")) {
						campingBasicDTO.setDoNmCode(8);
					} else if(jObj.get("doNm").toString().replaceAll("\"", "").equals("경기도")) {
						campingBasicDTO.setDoNmCode(9);
					} else if(jObj.get("doNm").toString().replaceAll("\"", "").equals("강원도")) {
						campingBasicDTO.setDoNmCode(10);
					} else if(jObj.get("doNm").toString().replaceAll("\"", "").equals("충청북도")) {
						campingBasicDTO.setDoNmCode(11);
					} else if(jObj.get("doNm").toString().replaceAll("\"", "").equals("충청남도")) {
						campingBasicDTO.setDoNmCode(12);
					} else if(jObj.get("doNm").toString().replaceAll("\"", "").equals("전라북도")) {
						campingBasicDTO.setDoNmCode(13);
					} else if(jObj.get("doNm").toString().replaceAll("\"", "").equals("전라남도")) {
						campingBasicDTO.setDoNmCode(14);
					} else if(jObj.get("doNm").toString().replaceAll("\"", "").equals("경상북도")) {
						campingBasicDTO.setDoNmCode(15);
					} else if(jObj.get("doNm").toString().replaceAll("\"", "").equals("경상남도")) {
						campingBasicDTO.setDoNmCode(16);
					} else if(jObj.get("doNm").toString().replaceAll("\"", "").equals("제주도")) {
						campingBasicDTO.setDoNmCode(17);
					} else {
						campingBasicDTO.setDoNmCode(18);
					}

					campingBasicService.saveOneCampingBasic(campingBasicDTO);
				}
			}
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@ApiOperation(value = "전체 캠핑장 상세 데이터 입력", notes = "공공API를 불러와 전체 캠핑장 상세 데이터를 입력한다.")
	@GetMapping("/gocamping/detail")
	public void campingDetail() {
		String json = connection.goCampingConnect();
		
		try {
			if(json != null) {
				jsonNode = mapper.readTree(json).get("response").get("body").get("items").get("item");
				
				CampingDetailDTO campingDetailDTO = new CampingDetailDTO();
				
				JsonNode jObj;
				System.out.println(jsonNode.size());
				
				Integer campId = 1;
				
				for(int i=0; i<jsonNode.size(); i++) {
					jObj = jsonNode.get(i);
					campingDetailDTO.setCampId(campId);
					campId++;

					campingDetailDTO.setCampDetailId(null);
					
					if(jObj.get("intro") != null)
						campingDetailDTO.setIntro(jObj.get("intro").toString().replaceAll("\"", ""));
					else
						campingDetailDTO.setIntro(null);

					if(jObj.get("induty") != null)
						campingDetailDTO.setInduty(jObj.get("induty").toString().replaceAll("\"", ""));
					else
						campingDetailDTO.setInduty(null);
					
					if(jObj.get("homepage") != null)
						campingDetailDTO.setHomepage(jObj.get("homepage").toString().replaceAll("\"", ""));
					else
						campingDetailDTO.setHomepage(null);

					if(jObj.get("allar") != null && isStringDouble(jObj.get("allar").toString().replaceAll("\"", ""))) {
						campingDetailDTO.setAllar(Double.parseDouble(jObj.get("allar").toString().replaceAll("\"", "")));
					} else
						campingDetailDTO.setAllar(0.0);

					if(jObj.get("lctCl") != null)
						campingDetailDTO.setLctCl(jObj.get("lctCl").toString().replaceAll("\"", ""));
					else
						campingDetailDTO.setLctCl(null);
					
					if(jObj.get("animalCmgCl") != null) {
						if(jObj.get("animalCmgCl").toString().equals("N"))
							campingDetailDTO.setAnimalCmgCl(false);
						else
							campingDetailDTO.setAnimalCmgCl(true);
					} else
						campingDetailDTO.setAnimalCmgCl(false);
					
					if(jObj.get("autoSiteCo") != null)
						campingDetailDTO.setAutoSiteCo(Integer.parseInt(jObj.get("autoSiteCo").toString().replaceAll("\"", "")));
					else
						campingDetailDTO.setAutoSiteCo(0);
					
					if(jObj.get("caravSiteCo") != null)
						campingDetailDTO.setCaravSiteCo(Integer.parseInt(jObj.get("caravSiteCo").toString().replaceAll("\"", "")));
					else
						campingDetailDTO.setCaravSiteCo(0);
					
					if(jObj.get("glampSiteCo") != null)
						campingDetailDTO.setGlampSiteCo(Integer.parseInt(jObj.get("glampSiteCo").toString().replaceAll("\"", "")));
					else
						campingDetailDTO.setGlampSiteCo(0);
					
					if(jObj.get("gnrlSiteCo") != null)
						campingDetailDTO.setGnrlSiteCo(Integer.parseInt(jObj.get("gnrlSiteCo").toString().replaceAll("\"", "")));
					else
						campingDetailDTO.setGnrlSiteCo(0);
					
					if(jObj.get("indvdlCaravSiteCo") != null)
						campingDetailDTO.setIndvdlCaravSiteCo(Integer.parseInt(jObj.get("indvdlCaravSiteCo").toString().replaceAll("\"", "")));
					else
						campingDetailDTO.setIndvdlCaravSiteCo(0);
					
					if(jObj.get("caravAcmpnyAt") != null) {
						if(jObj.get("caravAcmpnyAt").toString().equals("N"))
							campingDetailDTO.setCaravAcmpnyAt(false);
						else
							campingDetailDTO.setCaravAcmpnyAt(true);
					} else
						campingDetailDTO.setCaravAcmpnyAt(false);
					
					if(jObj.get("trlerAcmpnyAt") != null) {
						if(jObj.get("trlerAcmpnyAt").toString().equals("N"))
							campingDetailDTO.setTrlerAcmpnyAt(false);
						else
							campingDetailDTO.setTrlerAcmpnyAt(true);
					} else
						campingDetailDTO.setTrlerAcmpnyAt(false);
					
					if(jObj.get("eqpmnLendCl") != null)
						campingDetailDTO.setEqpmnLendCl(jObj.get("eqpmnLendCl").toString().replaceAll("\"", ""));
					else
						campingDetailDTO.setEqpmnLendCl(null);
					
					if(jObj.get("brazierCl") != null)
						campingDetailDTO.setBrazierCl(jObj.get("brazierCl").toString().replaceAll("\"", ""));
					else
						campingDetailDTO.setBrazierCl(null);
					
					if(jObj.get("operDeCl") != null)
						campingDetailDTO.setOperDeCl(jObj.get("operDeCl").toString().replaceAll("\"", ""));
					else
						campingDetailDTO.setOperDeCl(null);
					
					if(jObj.get("operPdCl") != null)
						campingDetailDTO.setOperPdCl(jObj.get("operPdCl").toString().replaceAll("\"", ""));
					else
						campingDetailDTO.setOperPdCl(null);
					
					if(jObj.get("posblFcltyCl") != null)
						campingDetailDTO.setPosblFcltyCl(jObj.get("posblFcltyCl").toString().replaceAll("\"", ""));
					else
						campingDetailDTO.setPosblFcltyCl(null);
					
					if(jObj.get("resveCl") != null)
						campingDetailDTO.setResveCl(jObj.get("resveCl").toString().replaceAll("\"", ""));
					else
						campingDetailDTO.setResveCl(null);
					
					if(jObj.get("resveUrl") != null)
						campingDetailDTO.setResveUrl(jObj.get("resveUrl").toString().replaceAll("\"", ""));
					else
						campingDetailDTO.setResveUrl(null);
					
					if(jObj.get("sbrsCl") != null)
						campingDetailDTO.setSbrsCl(jObj.get("sbrsCl").toString().replaceAll("\"", ""));
					else
						campingDetailDTO.setSbrsCl(null);
					
					if(jObj.get("siteBottomCl1") != null)
						campingDetailDTO.setSiteBottomCl1(Integer.parseInt(jObj.get("siteBottomCl1").toString().replaceAll("\"", "")));
					else
						campingDetailDTO.setSiteBottomCl1(0);

					if(jObj.get("siteBottomCl2") != null)
						campingDetailDTO.setSiteBottomCl2(Integer.parseInt(jObj.get("siteBottomCl2").toString().replaceAll("\"", "")));
					else
						campingDetailDTO.setSiteBottomCl2(0);
					
					if(jObj.get("siteBottomCl3") != null)
						campingDetailDTO.setSiteBottomCl3(Integer.parseInt(jObj.get("siteBottomCl3").toString().replaceAll("\"", "")));
					else
						campingDetailDTO.setSiteBottomCl3(0);

					if(jObj.get("siteBottomCl4") != null)
						campingDetailDTO.setSiteBottomCl4(Integer.parseInt(jObj.get("siteBottomCl4").toString().replaceAll("\"", "")));
					else
						campingDetailDTO.setSiteBottomCl4(0);
					
					if(jObj.get("siteBottomCl5") != null)
						campingDetailDTO.setSiteBottomCl5(Integer.parseInt(jObj.get("siteBottomCl5").toString().replaceAll("\"", "")));
					else
						campingDetailDTO.setSiteBottomCl5(0);
					
					if(jObj.get("tel") != null)
						campingDetailDTO.setTel(jObj.get("tel").toString().replaceAll("\"", ""));
					else
						campingDetailDTO.setTel(null);
					
					if(jObj.get("themaEnvrnCl") != null)
						campingDetailDTO.setThemaEnvrnCl(jObj.get("themaEnvrnCl").toString().replaceAll("\"", ""));
					else
						campingDetailDTO.setThemaEnvrnCl(null);
					
					if(jObj.get("swrmCo") != null)
						campingDetailDTO.setSwrmCo(Integer.parseInt(jObj.get("swrmCo").toString().replaceAll("\"", "")));
					else
						campingDetailDTO.setSwrmCo(0);
					
					if(jObj.get("toiletCo") != null)
						campingDetailDTO.setToiletCo(Integer.parseInt(jObj.get("toiletCo").toString().replaceAll("\"", "")));
					else
						campingDetailDTO.setToiletCo(0);
					
					if(jObj.get("wtrplCo") != null)
						campingDetailDTO.setWtrplCo(Integer.parseInt(jObj.get("wtrplCo").toString().replaceAll("\"", "")));
					else
						campingDetailDTO.setWtrplCo(0);

					campingDetailService.saveOneCampingDetail(campingDetailDTO);
				}
			}
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block																
			e.printStackTrace();
		}
	}
	

	public static boolean isStringDouble(String s) {
		try {
			Double.parseDouble(s);
			return true;
		} catch (NumberFormatException e) {
			return false;
		}
	}
}
