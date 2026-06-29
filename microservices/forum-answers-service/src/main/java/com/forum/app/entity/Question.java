package com.forum.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name= "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max=150)
    private String title;

    @NotBlank
    private String text;
    private LocalDateTime creationDateTime;
    private String picture;
    private String status;

    @ManyToOne
    @JoinColumn(name ="user_id",nullable = false)
    private User author;

    @ManyToMany
    @JoinTable(name ="question_tags" ,joinColumns = @JoinColumn(name ="question_id") , inverseJoinColumns = @JoinColumn(name ="tag_id"))
    private List<Tag> tags;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"question"})
    private List<Answer> answers;

    public Question() {
    }

    public Question(String title, String text, String picture, LocalDateTime creationDateTime, String status, User author, List<Tag> tags) {
        this.title = title;
        this.text = text;
        this.picture = picture;
        this.creationDateTime = creationDateTime;
        this.status = status;
        this.author = author;
        this.tags = tags;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public LocalDateTime getCreationDateTime() {
        return creationDateTime;
    }

    public String getText() {
        return text;
    }

    public String getPicture() {
        return picture;
    }

    public String getStatus() {
        return status;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public User getAuthor() {
        return author;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setCreationDateTime(LocalDateTime creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public List<Answer> getAnswers(){
        return answers;
    }

    public void setAnswers(List<Answer> answers){
        this.answers = answers;
    }
}
