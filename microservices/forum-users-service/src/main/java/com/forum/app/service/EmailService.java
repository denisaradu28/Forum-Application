package com.forum.app.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender javaMailSender){
        this.javaMailSender = javaMailSender;
    }

    public void sendBanEmail(String toEmail, String username){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Your account has been banned");
        message.setText("Hello" + username + ",\n\n" +
                "Your account has been banned from the Forum Application.\n" +
                "You can no longer use the application as a normal user.\n\n" +
                "Regards,\n" + "Forum Application Team");

        javaMailSender.send(message);
    }

}
