package com.forum.app.repository;

import com.forum.app.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    @Query("SELECT a FROM Answer a WHERE a.question.id = :questionId ORDER BY a.creationDateTime ASC")
    List<Answer> findByQuestionId(Long questionId);
    long countByQuestionId(Long questionId);
}
