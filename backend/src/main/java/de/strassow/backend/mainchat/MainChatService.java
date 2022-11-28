package de.strassow.backend.mainchat;

import de.strassow.backend.auth.ChratUserToken;
import de.strassow.backend.auth.ChratUserTokenRepository;
import de.strassow.backend.security.ChratUserUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MainChatService {

    private final MainChatRepository mainChatRepository;
    private final MainChatUtils mainChatUtils;
    public final ChratUserTokenRepository chratUserTokenRepository;
    public final ChratUserUtils chratUserUtils;

    String test;

    public String sendUsernameToService(String username) {
        if (Objects.equals(username, "anonymousUser")) {
            return null;
        }
        if (chratUserTokenRepository.findByUsername(username).isPresent()) {
            chratUserTokenRepository.deleteAllByUsername(username);
        }
        final ChratUserToken chratUserToken = new ChratUserToken(chratUserUtils.addUUIDasString(), username);
        chratUserTokenRepository.save(chratUserToken);
        test = chratUserToken.username();
        return username;
    }

    public MainChatMessage addMessage(String textMessage) {
        String now = mainChatUtils.addLocalDateTimeFormatted();
        String dateTimeMessage = now + ": " + textMessage;
        String usernameDateTimeMessage = dateTimeMessage + " " + test;
        MainChatMessage mainChatMessage = new MainChatMessage(usernameDateTimeMessage);
        mainChatRepository.save(mainChatMessage);
        return mainChatMessage;
    }

    public List<MainChatMessage> getMessages() {
        return mainChatRepository.findAll();
    }


}
