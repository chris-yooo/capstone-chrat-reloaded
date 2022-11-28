package de.strassow.backend.mainchat;

import de.strassow.backend.security.ChratUserController;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MainChatService {

    private final MainChatRepository mainChatRepository;

    private final ChratUserController chratUserController;

    private final MainChatUtils mainChatUtils;

    public MainChatMessage addMessage(String textMessage) {
        String now = mainChatUtils.addLocalDateTimeFormatted();
        String dateTimeMessage = now + ": " + textMessage;
        String username = chratUserController.me();
        String usernameDateTimeMessage = username + ": " + dateTimeMessage;
        MainChatMessage mainChatMessage = new MainChatMessage(usernameDateTimeMessage);
        mainChatRepository.save(mainChatMessage);
        return mainChatMessage;
    }

    public List<MainChatMessage> getMessages() {
        return mainChatRepository.findAll();
    }
}
