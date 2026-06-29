package com.forum.app.service;

import com.forum.app.entity.Question;
import com.forum.app.entity.Role;
import com.forum.app.entity.Tag;
import com.forum.app.entity.User;
import com.forum.app.repository.QuestionRepository;
import com.forum.app.repository.TagRepository;
import com.forum.app.repository.UserRepository;
import com.forum.app.repository.VoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final TagService tagService;
    private final VoteRepository voteRepository;

    public QuestionService(UserRepository userRepository, QuestionRepository questionRepository, TagRepository tagRepository, TagService tagService, VoteRepository voteRepository) {
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
        this.tagService = tagService;
        this.voteRepository = voteRepository;

    }

    public Question createQuestion(Long userId,Question question) {
        User author =userRepository.findById(userId).
                orElseThrow(()-> new RuntimeException("User not found"));

        if(author.getRole() == Role.BANNED)
            throw new RuntimeException("You account is banned.");

        List<Tag> finalTags= tagService.resolveTags(question.getTags());

        question.setId(null);
        question.setStatus("RECEIVED");
        question.setCreationDateTime(LocalDateTime.now());
        question.setAuthor(author);
        question.setTags(finalTags);
        return questionRepository.save(question);
    }

    public Question readQuestion(Long id) {
        return questionRepository.findById(id).orElseThrow(()-> new RuntimeException("Question not found"));
    }

    public List<Question> readAllQuestions() {
        return questionRepository.findAllByOrderByCreationDateTimeDesc();
    }

    public List<Question> filterQuestionsByTagName(String tagName) {
        return questionRepository.findByTagsNameIgnoreCase(tagName);
    }

    public List<Question> filterQuestionsByTitle(String title) {
        return questionRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<Question> filterQuestionsByUser(Long userId ) {
        return questionRepository.findByAuthorId(userId);
    }

    public List<Question> filterQuestionsByUsername(String username) {
        return questionRepository.findByAuthorUsernameIgnoreCase(username);
    }

    @Transactional
    public void deleteQuestion(Long idUser ,Long idQuestion) {
        Optional<Question> existingQuestion=questionRepository.findById(idQuestion);
        if(!existingQuestion.isPresent()) {
            throw new RuntimeException("Can t update this question because it doesn t exist");
        }

        Optional<User> currentUser = userRepository.findById(idUser);
        if(!currentUser.isPresent()) {
            throw new RuntimeException("User not found");
        }

        if(!existingQuestion.get().getAuthor().getId().equals(idUser) && (currentUser.get().getRole() != Role.MODERATOR)){
            throw new RuntimeException("User not authorized to delete this question");
        }
        voteRepository.deleteByAnswerQuestionId(idQuestion);
        voteRepository.deleteByQuestionId(idQuestion);
        questionRepository.delete(existingQuestion.get());
    }

    public Question updateQuestion(Long idUser ,Long idQuestion,Question updatedQuestion) {
        Optional<Question> existingQuestion =questionRepository.findById(idQuestion);
        if(!existingQuestion.isPresent()) {
            throw new RuntimeException("Can t update this question because it doesn't exist");
        }

        Optional<User> currentUser = userRepository.findById(idUser);
        if(!currentUser.isPresent()) {
            throw new RuntimeException("User not found");
        }

        if(!existingQuestion.get().getAuthor().getId().equals(idUser) && (currentUser.get().getRole() != Role.MODERATOR)){
            throw new RuntimeException("User not authorized to update this question");
        }

        List<Tag> finalTags= tagService.resolveTags(updatedQuestion.getTags());

        existingQuestion.get().setTitle(updatedQuestion.getTitle());
        existingQuestion.get().setText(updatedQuestion.getText());
        existingQuestion.get().setPicture(updatedQuestion.getPicture());
        existingQuestion.get().setTags(finalTags);

        return questionRepository.save(existingQuestion.get());
    }

}
