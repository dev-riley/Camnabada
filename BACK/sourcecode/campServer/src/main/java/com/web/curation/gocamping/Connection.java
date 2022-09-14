package com.web.curation.gocamping;

//import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.stereotype.Component;

@Component
public class Connection {
	public String goCampingConnect() {
		StringBuffer result = new StringBuffer();

//      XML로 불러온 것을 JSON으로 바꿀 때 사용
//      String jsonPrintString = null;
      try {
          String apiUrl = Global.GO_CAMPING_URL;
//          String apiUrl = "";
          URL url = new URL(apiUrl);
          
          HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
          urlConnection.setRequestMethod("GET");

          BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));
//          아래의 코드를 위처럼 한줄로 풀어쓴 것
//          BufferedInputStream bufferedInputStream = new BufferedInputStream(urlConnection.getInputStream());
//          BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(bufferedInputStream, "UTF-8"));
          
          String returnLine;
          while((returnLine = bufferedReader.readLine()) != null) {
              result.append(returnLine);
          }

//          XML로 불러온 것을 JSON으로 바꿀때 사용
//          JSONObject jsonObject = XML.toJSONObject(result.toString());
//          jsonPrintString = jsonObject.toString();
      } catch (Exception e) {
          e.printStackTrace();
      }

      return result.toString();
//      XML로 불러온 것을 JSON으로 바꿀 때 사용
//      return jsonPrintString;
	}
}
