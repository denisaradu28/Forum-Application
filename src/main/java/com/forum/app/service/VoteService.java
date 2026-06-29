package com.forum.app.service;

import com.forum.app.entity.*;
import com.forum.app.repository.AnswerRepository;
import com.forum.app.repository.QuestionRepository;
import com.forum.app.repository.UserRepository;
import com.forum.app.repository.VoteRepository;
import org.springframework.stereotype.Service;

@Service
public class VoteService {

    private final VoteRepository voteRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;

    public VoteService(VoteRepository voteRepository, QuestionRepository questionRepository, AnswerRepository answerRepository, UserRepository userRepository) {
        this.voteRepository = voteRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;
    }

    public int voteQuestion(Long questionId, Long userId, VoteType voteType) {
        User user = getUser(userId);
        Question question = getQuestion(questionId);

        if (question.getAuthor().getId().equals(user.getId())) {
            throw new RuntimeException("You cannot vote your own question");
        }

        if(user.getRole() == Role.BANNED)
            throw new RuntimeException("You account is banned.");

        if (voteRepository.findByUserAndQuestion(user, question).isPresent()) {
            throw new RuntimeException("You already voted this question");
        }

        Vote vote = new Vote(voteType, user, question, null);

        User author = question.getAuthor();

        if(voteType == VoteType.UPVOTE)
            author.setScore(author.getScore() + 2.5);
        else
            author.setScore(author.getScore() - 1.5);

        userRepository.save(author);

        voteRepository.save(vote);

        return getQuestionVoteCount(questionId);
    }

    public int voteAnswer(Long answerId, Long userId, VoteType voteType) {
        User user = getUser(userId);
        Answer answer = getAnswer(answerId);

        if (answer.getAuthor().getId().equals(user.getId())) {
            throw new RuntimeException("You cannot vote your own answer");
        }

        if(user.getRole() == Role.BANNED)
            throw new RuntimeException("You account is banned.");

        if (voteRepository.findByUserAndAnswer(user, answer).isPresent()) {
            throw new RuntimeException("You already voted this answer");
        }

        Vote vote = new Vote(voteType, user, null, answer);

        User author = answer.getAuthor();

        if(voteType == VoteType.UPVOTE)
            author.setScore(author.getScore() + 5);
        else{
            author.setScore(author.getScore() - 2.5);

            user.setScore(user.getScore() - 1.5);
            userRepository.save(user);
        }

        userRepository.save(author);

        voteRepository.save(vote);

        return getAnswerVoteCount(answerId);
    }

    public int getQuestionVoteCount(Long questionId) {
        Question question = getQuestion(questionId);

        long upvotes = voteRepository.countByQuestionAndVoteType(question, VoteType.UPVOTE);
        long downvotes = voteRepository.countByQuestionAndVoteType(question, VoteType.DOWNVOTE);

        return (int) (upvotes - downvotes);
    }

    public int getAnswerVoteCount(Long answerId) {
        Answer answer = getAnswer(answerId);

        long upvotes = voteRepository.countByAnswerAndVoteType(answer, VoteType.UPVOTE);
        long downvotes = voteRepository.countByAnswerAndVoteType(answer, VoteType.DOWNVOTE);

        return (int) (upvotes - downvotes);
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private Question getQuestion(Long questionId) {
        return questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));
    }

    private Answer getAnswer(Long answerId) {
        return answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));
    }
}