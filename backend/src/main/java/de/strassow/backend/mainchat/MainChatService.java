package de.strassow.backend.mainchat;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MainChatService {

    private final MainChatRepository mainChatRepository;

    private final MainChatUtils mainChatUtils;

    public void addMessage(String textMessage) {
        String now = mainChatUtils.addLocalDateTime();
        String message = now + " " + textMessage;
        ChatMessage chatMessage = new ChatMessage(message);
        mainChatRepository.save(chatMessage);
    }

    public List<ChatMessage> getMessages() {
        List<ChatMessage> allMessages = mainChatRepository.findAll();
        Collections.reverse(allMessages);
        return allMessages;
    }
}
