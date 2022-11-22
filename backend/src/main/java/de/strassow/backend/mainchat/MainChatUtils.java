package de.strassow.backend.mainchat;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class MainChatUtils {
    public String addLocalDateTime() {
        LocalDateTime now = LocalDateTime.now();
        return now.toString();
    }
}
