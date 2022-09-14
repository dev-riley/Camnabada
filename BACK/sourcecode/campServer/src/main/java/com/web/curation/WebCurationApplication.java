package com.web.curation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class WebCurationApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebCurationApplication.class, args);
	}

}
