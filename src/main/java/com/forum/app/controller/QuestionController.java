package com.forum.app.controller;

import com.forum.app.entity.Question;
import com.forum.app.service.QuestionService;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    private Long getLoggedUserId(HttpSession session) {
        Object userId = session.getAttribute("userId");

        if (userId == null) {
            throw  new RuntimeException("No user is logged in");
        }
        return (Long) userId;
    }

    @PostMapping
    public Question createQuestion(HttpSession session, @RequestBody Question question) {
        Long userId = getLoggedUserId(session);
        return questionService.createQuestion(userId, question);
    }


    @GetMapping("/{questionId}")
    public Question getQuestion(@PathVariable Long questionId) {
        return questionService.readQuestion(questionId);
    }

    @GetMapping
    public List<Question> getAllQuestions(){
        return questionService.readAllQuestions();
    }

    @GetMapping("/tagName")
    public List<Question> getQuestionsByTagName(@RequestParam String tagName){
        return questionService.filterQuestionsByTagName(tagName);
    }

    @GetMapping("/title")
    public List<Question> getQuestionsByTitle(@RequestParam String title){
        return questionService.filterQuestionsByTitle(title);
    }

    @GetMapping("/me")
    public List<Question> getMyQuestions(HttpSession session) {
        Long userId = getLoggedUserId(session);
        return questionService.filterQuestionsByUser(userId);
    }

    @GetMapping("/user/{userId}")
    public List<Question> getQuestionsByUser(@PathVariable Long userId) {
        return questionService.filterQuestionsByUser(userId);
    }

    @GetMapping("/user")
    public List<Question> getQuestionsByUsername(@RequestParam String username){
        return questionService.filterQuestionsByUsername(username);
    }

    @DeleteMapping("/{questionId}")
    public void deleteQuestion(@PathVariable Long questionId, HttpSession session) {
        Long userId = getLoggedUserId(session);
        questionService.deleteQuestion(userId, questionId);
    }

    @PutMapping("/{questionId}")
    public Question updateQuestion(@PathVariable Long questionId,
                                   @RequestBody Question question,
                                   HttpSession session) {
        Long userId = getLoggedUserId(session);
        return questionService.updateQuestion(userId, questionId, question);
    }
}
