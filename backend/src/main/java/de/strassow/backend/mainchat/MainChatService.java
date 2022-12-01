package de.strassow.backend.mainchat;

import de.strassow.backend.security.ChratUserToken;
import de.strassow.backend.security.ChratUserTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class MainChatService {

    private final MainChatRepository mainChatRepository;
    private final MainChatUtils mainChatUtils;
    public final ChratUserTokenRepository chratUserTokenRepository;

    public void deleteUserTokenAfterSessionAdd(String id) {
        chratUserTokenRepository.findById(id);
        chratUserTokenRepository.deleteById(id);
    }

    public String tokenToCompare(String id) {
        return chratUserTokenRepository.findById(id).map(ChratUserToken::username)
                .orElseThrow(() -> new NoSuchElementException("No value present"));
    }

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
