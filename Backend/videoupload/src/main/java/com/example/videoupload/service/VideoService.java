package com.example.videoupload.service;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.videoupload.entity.Video;
import com.example.videoupload.repository.VideoRepository;



@Service
public class VideoService {
	
	@Autowired
	private VideoRepository videoRepository;
	
	 @Value("${spring.servlet.multipart.location}")
	    private String uploadPath;

	    public Video saveVideo(Video video, MultipartFile file) throws IOException {
	        String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
	        Path filePath = Path.of(uploadPath + fileName);
	        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

	        video.setVideoPath(fileName);
	        video.setFilePath(uploadPath + fileName);
	        
	       
	        return videoRepository.save(video);
	    }
	    
	    public List<Video> getAllVideos(String videoPath) {
	        List<Video> allVideos = videoRepository.findAll();
	        return allVideos;
	    }
	    
	    public Video getByFilePath(String filePath) {
	        return videoRepository.findByFilePath(filePath);
	    }
	    
	    
	    
	  
	   
}