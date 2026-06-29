package com.forum.app.service;

import com.forum.app.entity.Answer;
import com.forum.app.entity.Question;
import com.forum.app.entity.Role;
import com.forum.app.entity.User;
import com.forum.app.repository.VoteRepository;
import com.forum.app.repository.AnswerRepository;
import com.forum.app.repository.QuestionRepository;
import com.forum.app.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final VoteService voteService;
    private final VoteRepository voteRepository;

    public Answer createAnswer(Long userId, Long questionId, Answer answer){
        User author = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(author.getRole() == Role.BANNED)
            throw new RuntimeException("You account is banned.");

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        if("SOLVED".equals(question.getStatus())){
            throw new RuntimeException("This question is already solved. No more answers can be added.");
        }

        long answersBeforeCreate = answerRepository.countByQuestionId(questionId);

        answer.setId(null);
        answer.setAuthor(author);
        answer.setQuestion(question);
        answer.setCreationDateTime(LocalDateTime.now());

        Answer savedAnswer = answerRepository.save(answer);

        if(answersBeforeCreate == 0 && "RECEIVED".equals(question.getStatus())){
            question.setStatus("IN_PROGRESS");
            questionRepository.save(question);
        }

        return savedAnswer;
    }

    public List<Answer> getAnswersByQuestion(Long questionId){
        questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        List<Answer> answers = answerRepository.findByQuestionId(questionId);

        answers.sort(Comparator.comparingInt((Answer answer) -> voteService.getAnswerVoteCount(answer.getId())).reversed());

        return answers;
    }

    public Answer updateAnswer(Long userId, Long answerId, Answer updatedAnswer){
        Answer existingAnswer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));

        User currentUser = userRepository.findById(userId)
                .orElseThrow(()-> new RuntimeException("User not found"));

        boolean isAuthor = existingAnswer.getAuthor().getId().equals(userId);
        boolean isModerator = currentUser.getRole() == Role.MODERATOR;

        if(!isAuthor && !isModerator){
            throw new RuntimeException("User not authorized to update this answer");
        }

        if("SOLVED".equals(existingAnswer.getQuestion().getStatus()) && !isModerator){
            throw new RuntimeException("This question is already solved. Answers can no longer be edited.");
        }

        existingAnswer.setText(updatedAnswer.getText());
        existingAnswer.setPicture(updatedAnswer.getPicture());

        return answerRepository.save(existingAnswer);
    }

    @Transactional
    public void deleteAnswer(Long userId, Long answerId){
        Answer existingAnswer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));

        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean isAuthor = existingAnswer.getAuthor().getId().equals(userId);
        boolean isModerator = currentUser.getRole() == Role.MODERATOR;

        if(!isAuthor && !isModerator){
            throw new RuntimeException("User not authorized to delete this answer");
        }

        if("SOLVED".equals(existingAnswer.getQuestion().getStatus()) && !isModerator){
            throw new RuntimeException("This question is already solved. Answers can no longer be deleted.");
        }

        voteRepository.deleteByAnswerId(answerId);
        answerRepository.delete(existingAnswer);
    }

    public String acceptAnswer(Long userId, Long answerId){
        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new RuntimeException("Answer not found"));

        Question question = answer.getQuestion();

        if(!question.getAuthor().getId().equals(userId)){
            throw new RuntimeException("Only the question author can accept an answer");
        }

        if("SOLVED".equals(question.getStatus())){
            throw new RuntimeException("This question is already solved.");
        }

        answer.setAccepted(true);
        answerRepository.save(answer);

        User answerAuthor = answer.getAuthor();
        answerAuthor.setScore(answerAuthor.getScore() + 15);
        userRepository.save(answerAuthor);

        question.setStatus("SOLVED");
        questionRepository.save(question);

        return "Answer accepted. Question marked as solved.";
    }
}
