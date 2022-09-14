package com.web.curation.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

	private String version = "1.0.0";
	private String title = "CamNaBaDa CAMP API ver" + version;
	
    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
				.groupName("ssafy CamNaBaDa API")
				.apiInfo(apiInfo())
        		.select()
                .apis(RequestHandlerSelectors
                		.basePackage("com.web.curation"))
                .paths(PathSelectors.any())
                .build();
    }
    
	private ApiInfo apiInfo() {
		return new ApiInfoBuilder()
				.title(title)
				.description("CamNaBaDa CAMP API for Developers \n\n"
						+ "This page : http://i6c109.p.ssafy.io:8092/swagger-ui.html")
//				.license("SSAFY License")
//				.licenseUrl("ssafy@ssafy.com")
				.version(version)
				.build();
	}
}
