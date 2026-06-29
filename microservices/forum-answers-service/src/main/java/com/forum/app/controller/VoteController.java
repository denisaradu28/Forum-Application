package com.forum.app.controller;


import com.forum.app.entity.VoteType;
import com.forum.app.service.VoteService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/votes")
public class VoteController {

    private final VoteService voteService;

    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    @PostMapping("/question/{questionId}")
    public ResponseEntity<?> voteQuestion(@PathVariable Long questionId, @RequestParam VoteType voteType, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");

        if(userId == null)
            return ResponseEntity.status(401).body("User not logged in");

        try{
            int voteCount = voteService.voteQuestion(questionId, userId, voteType);
            return ResponseEntity.ok(voteCount);
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/answer/{answerId}")
    public ResponseEntity<?> voteAnswer(@PathVariable Long answerId, @RequestParam VoteType voteType, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");

        if(userId == null)
            return ResponseEntity.status(401).body("User not logged in");

        try{
            int voteCount = voteService.voteAnswer(answerId, userId, voteType);
            return ResponseEntity.ok(voteCount);
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/question/{questionId}/count")
    public ResponseEntity<?> getQuestionVoteCount(@PathVariable Long questionId) {
        return ResponseEntity.ok(voteService.getQuestionVoteCount(questionId));
    }

    @GetMapping("/answer/{answerId}/count")
    public ResponseEntity<?> getAnswerVoteCount(@PathVariable Long answerId) {
        return ResponseEntity.ok(voteService.getAnswerVoteCount(answerId));
    }
}