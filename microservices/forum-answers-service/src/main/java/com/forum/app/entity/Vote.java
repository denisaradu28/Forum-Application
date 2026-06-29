package com.forum.app.entity;


import jakarta.persistence.*;

@Entity
@Table(name="votes", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "question_id"}),
        @UniqueConstraint(columnNames = {"user_id", "answer_id"})
})
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VoteType voteType;

    @ManyToOne
    @JoinColumn(name= "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name= "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name= "answer_id")
    private Answer answer;

    public Vote(){}

    public Vote(VoteType voteType, User user, Question question, Answer answer) {
        this.voteType = voteType;
        this.user = user;
        this.question = question;
        this.answer = answer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public VoteType getVoteType() {
        return voteType;
    }

    public void setVoteType(VoteType voteType) {
        this.voteType = voteType;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Answer getAnswer() {
        return answer;
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
    }
}
