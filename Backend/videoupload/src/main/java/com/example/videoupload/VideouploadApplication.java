package com.example.videoupload;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class VideouploadApplication  implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(VideouploadApplication.class, args);
	}
	
	 @Override
	    public void addResourceHandlers(ResourceHandlerRegistry registry) {
	        registry.addResourceHandler("/videos/**")
	                .addResourceLocations("file:/path/to/your/video/directory/");
	    }

}
