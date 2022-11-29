package de.strassow.backend.mainchat;

import de.strassow.backend.security.ChratUserToken;
import de.strassow.backend.security.ChratUserTokenRepository;
import de.strassow.backend.security.ChratUserUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MainChatService {

    private final MainChatRepository mainChatRepository;
    private final MainChatUtils mainChatUtils;
    public final ChratUserTokenRepository chratUserTokenRepository;
    public final ChratUserUtils chratUserUtils;

    public ChratUserToken chratUserToken(String username) {
        if (Objects.equals(username, "anonymousUser")) {
            return new ChratUserToken("", "anonymousUser");
        }
        if (chratUserTokenRepository.findByUsername(username).isPresent()) {
            chratUserTokenRepository.deleteAllByUsername(username);
        }
        ChratUserToken chratUserToken = new ChratUserToken(chratUserUtils.addUUIDasString(), username);
        chratUserTokenRepository.save(chratUserToken);
        return chratUserToken;
    }

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
