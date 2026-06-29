package com.forum.app.repository;

import com.forum.app.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    Optional<Vote> findByUserAndQuestion(User user, Question question);

    Optional<Vote> findByUserAndAnswer(User user, Answer answer);

    long countByQuestionAndVoteType(Question question, VoteType voteType);

    long countByAnswerAndVoteType(Answer answer, VoteType voteType);

    void deleteByQuestionId(Long questionId);
    void deleteByAnswerQuestionId(Long questionId);
    void deleteByAnswerId(Long answerId);
}
