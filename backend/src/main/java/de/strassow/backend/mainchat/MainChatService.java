package de.strassow.backend.mainchat;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MainChatService {

    private final MainChatRepository mainChatRepository;

    private final MainChatUtils mainChatUtils;

    public MainChatMessage addMessage(String textMessage, String username) {
        String now = mainChatUtils.addLocalDateTimeFormatted();
        String dateTimeMessage = now + ": " + textMessage;
        String usernameDateTimeMessage = username + ": " + dateTimeMessage;
        MainChatMessage mainChatMessage = new MainChatMessage(usernameDateTimeMessage);
        mainChatRepository.save(mainChatMessage);
        return mainChatMessage;
    }

    public List<MainChatMessage> getMessages() {
        return mainChatRepository.findAll();
    }
}
