package com.forum.app.repository;

import com.forum.app.entity.Question;
import com.forum.app.entity.Tag;
import com.forum.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository  extends JpaRepository<Question, Long> {
    List<Question> findAllByOrderByCreationDateTimeDesc();
    List<Question> findByTagsNameIgnoreCase(String name);
    List<Question> findByTitleContainingIgnoreCase(String title);
    List<Question> findByAuthorId(Long id);
    List<Question> findByAuthorUsernameIgnoreCase(String username);
}
