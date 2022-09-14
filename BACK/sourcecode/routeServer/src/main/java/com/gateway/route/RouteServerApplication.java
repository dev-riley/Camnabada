package com.gateway.route;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class RouteServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(RouteServerApplication.class, args);
	}

}
