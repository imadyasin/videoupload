package com.example.videoupload.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="videos")
public class Video {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String title;
	    private String videoPath;
	    @Column(name = "file_path")
	    private String filePath;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}

		public String getTitle() {
			return title;
		}
		public void setTitle(String title) {
			this.title = title;
		}
		public String getVideoPath() {
			return videoPath;
		}
		public void setVideoPath(String videoPath) {
			this.videoPath = videoPath;
		}
		
		
		public String getFilePath() {
			return filePath;
		}
		public void setFilePath(String filePath) {
			this.filePath = filePath;
		}
		public Video(String title, String videoPath) {
	        this.title = title;
	        this.videoPath = videoPath;
	    }
		
		public Video(Long id, String title, String videoPath, String filePath) {
			super();
			this.id = id;
			this.title = title;
			this.videoPath = videoPath;
			this.filePath = filePath;
		}
		public Video(Long id, String title, String videoPath) {
			super();
			this.id = id;
			this.title = title;
			this.videoPath = videoPath;
		}
		public Video() {
			super();
		}
		@Override
		public String toString() {
			return "Video [id=" + id + ", videoUrl=" + ", title=" + title + ", videoPath=" + videoPath + "]";
		} 
	    
	    

}
