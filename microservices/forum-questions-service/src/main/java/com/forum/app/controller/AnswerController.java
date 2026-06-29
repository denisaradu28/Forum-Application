package com.forum.app.controller;

import com.forum.app.entity.Answer;
import com.forum.app.service.AnswerService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/answers")
public class AnswerController {

    private final AnswerService answerService;

    private Long getLoggedUserId(HttpSession session) {
        Object userId = session.getAttribute("userId");

        if (userId == null) {
            throw  new RuntimeException("No user is logged in");
        }
        return (Long) userId;
    }

    @PostMapping("/question/{questionId}")
    public Answer createAnswer(@PathVariable Long questionId,
                               @RequestBody Answer answer,
                               HttpSession session) {
        Long userId = getLoggedUserId(session);
        return answerService.createAnswer(userId,questionId,answer);
    }

    @GetMapping("/question/{questionId}")
    public List<Answer> getAnswerByQuestion(@PathVariable Long questionId){
        return answerService.getAnswersByQuestion(questionId);
    }

    @PutMapping("/{answerId}")
    public Answer updateAnswer(@PathVariable Long answerId,
                               @RequestBody Answer answer,
                               HttpSession session) {
        Long userId = getLoggedUserId(session);
        return answerService.updateAnswer(userId,answerId,answer);
    }

    @DeleteMapping("/{answerId}")
    public ResponseEntity<?> deleteAnswer(@PathVariable Long answerId,
                                          HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401).body("User not logged in");
        }

        try {
            answerService.deleteAnswer(userId, answerId);
            return ResponseEntity.ok("Answer deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @PutMapping("/{answerId}/accept")
    public ResponseEntity<?> acceptAnswer(@PathVariable Long answerId, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            return  ResponseEntity.status(401).body("User not logged in");
        }

        try {
            return ResponseEntity.ok(answerService.acceptAnswer(userId,answerId));
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
