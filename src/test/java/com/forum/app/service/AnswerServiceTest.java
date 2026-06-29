package com.forum.app.service;

import com.forum.app.entity.Answer;
import com.forum.app.entity.Question;
import com.forum.app.entity.User;
import com.forum.app.repository.AnswerRepository;
import com.forum.app.repository.QuestionRepository;
import com.forum.app.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AnswerServiceTest {

    @Mock
    private AnswerRepository answerRepository;

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AnswerService answerService;

    @Test
    void createAnswer_whenFirstAnswer_setsStatusInProgress() {
        User user = new User();
        user.setId(1L);
        user.setUsername("test");
        user.setEmail("test@test.com");
        user.setPassword("encodedPassword");

        Question question = new Question();
        question.setId(1L);
        question.setTitle("Test question");
        question.setText("Question text");
        question.setStatus("RECEIVED");

        Answer inputAnswer = new Answer();
        inputAnswer.setText("Test answer");
        inputAnswer.setPicture("img.png");

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(questionRepository.findById(1L)).thenReturn(Optional.of(question));
        when(answerRepository.countByQuestionId(1L)).thenReturn(0L);

        Answer savedAnswer = new Answer();
        savedAnswer.setId(100L);
        savedAnswer.setText("Test answer");
        savedAnswer.setPicture("img.png");
        savedAnswer.setAuthor(user);
        savedAnswer.setQuestion(question);
        savedAnswer.setCreationDateTime(LocalDateTime.now());

        when(answerRepository.save(org.mockito.ArgumentMatchers.<Answer>any()))
                .thenReturn(savedAnswer);

        Answer result = answerService.createAnswer(1L, 1L, inputAnswer);

        assertNotNull(result);
        assertEquals(100L, result.getId());
        assertEquals("Test answer", result.getText());
        assertEquals("img.png", result.getPicture());
        assertEquals(user, result.getAuthor());
        assertEquals(question, result.getQuestion());
        assertNotNull(result.getCreationDateTime());

        assertEquals("IN_PROGRESS", question.getStatus());
    }

    @Test
    void getAnswersByQuestion_returnsAnswersList(){
        Question question = new Question();
        question.setId(1L);

        Answer answer1 = new Answer();
        answer1.setId(1L);
        answer1 .setText("First answer");

        Answer answer2 = new Answer();
        answer2.setId(2L);
        answer2.setText("Second answer");

        when(questionRepository.findById(1L)).thenReturn(Optional.of(question));
        when(answerRepository.findByQuestionId(1L)).thenReturn(List.of(answer1,answer2));

        List<Answer> result = answerService.getAnswersByQuestion(1L);

        assertNotNull(result);
        assertEquals(2,result.size());
        assertEquals("First answer", result.getFirst().getText());
        assertEquals("Second answer", result.get(1).getText());
    }

    @Test
    void updateAnswer_whenUserIsAuthor_updatesAnswer(){
        User author = new User();
        author.setId(1L);

        Answer existingAnswer = new Answer();
        existingAnswer.setId(1L);
        existingAnswer.setText("Old text");
        existingAnswer.setPicture("old.png");
        existingAnswer.setAuthor(author);

        Answer updatedAnswer = new Answer();
        updatedAnswer.setText("New text");
        updatedAnswer.setPicture("new.png");

        when(answerRepository.findById(1L)).thenReturn(Optional.of(existingAnswer));
        when(answerRepository.save(org.mockito.ArgumentMatchers.<Answer>any()))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Answer result = answerService.updateAnswer(1L, 1L, updatedAnswer);

        assertEquals("New text", result.getText());
        assertEquals("new.png", result.getPicture());
    }

    @Test
    void updateAnswer_whenUserIsNotAuthor_throwsException(){
        User author = new User();
        author.setId(1L);

        Answer existingAnswer = new Answer();
        existingAnswer.setId(1L);
        existingAnswer.setAuthor(author);

        Answer updatedAnswer = new Answer();
        updatedAnswer.setText("New text");

        when(answerRepository.findById(1L)).thenReturn(Optional.of(existingAnswer));

        RuntimeException exception = assertThrows(
                RuntimeException.class, () -> answerService.updateAnswer(2L, 1L, updatedAnswer));

        assertEquals("User not authorized to update this answer", exception.getMessage());
    }

    @Test
    void deleteAnswer_whenUserIsAuthor_deleteAnswer(){
        User author = new User();
        author.setId(1L);

        Answer existingAnswer = new Answer();
        existingAnswer.setId(1L);
        existingAnswer.setAuthor(author);

        when(answerRepository.findById(1L)).thenReturn(Optional.of(existingAnswer));

        answerService.deleteAnswer(1L, 1L);
    }

    @Test
    void deleteAnswer_whenUserIsNotAuthor_throwsException(){
        User author = new User();
        author.setId(1L);

        Answer existingAnswer = new Answer();
        existingAnswer.setId(1L);
        existingAnswer.setAuthor(author);

        when(answerRepository.findById(1L)).thenReturn(Optional.of(existingAnswer));

        RuntimeException exception = assertThrows(
                RuntimeException.class, () -> answerService.deleteAnswer(2L,1L)
        );

        assertEquals("User not authorized to delete this answer",exception.getMessage());
    }
}
