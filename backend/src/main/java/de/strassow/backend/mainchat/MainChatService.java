package de.strassow.backend.mainchat;

import de.strassow.backend.utils.MainChatUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MainChatService {

    private final MainChatRepository mainChatRepository;
    private final MainChatUtils mainChatUtils;

    public MainChatMessage addMessage(String textMessage, String username) {
        String dateTime = mainChatUtils.addLocalDateTimeFormatted();
        MainChatMessage mainChatMessage = new MainChatMessage(username, dateTime, textMessage);
        mainChatRepository.save(mainChatMessage);
        return mainChatMessage;
    }

    public List<MainChatMessage> getMessages() {
        return mainChatRepository.findAll();
    }
}
