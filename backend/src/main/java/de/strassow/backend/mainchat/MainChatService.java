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
        String now = mainChatUtils.addLocalDateTimeFormatted();
        String message = now + ": " + textMessage;
        MainChatMessage mainChatMessage = new MainChatMessage(message);
        mainChatRepository.save(mainChatMessage);
    }

    public List<MainChatMessage> getMessages() {
        return mainChatRepository.findAll();
    }
}
