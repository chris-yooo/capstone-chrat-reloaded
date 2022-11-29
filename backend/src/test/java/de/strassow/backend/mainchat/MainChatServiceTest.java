package de.strassow.backend.mainchat;

import de.strassow.backend.security.ChratUserToken;
import de.strassow.backend.security.ChratUserTokenRepository;
import de.strassow.backend.security.ChratUserUtils;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class MainChatServiceTest {

    MainChatRepository mainChatRepository = mock(MainChatRepository.class);
    MainChatUtils mainChatUtils = mock(MainChatUtils.class);
    ChratUserTokenRepository chratUserTokenRepository = mock(ChratUserTokenRepository.class);
    ChratUserUtils chratUserUtils = mock(ChratUserUtils.class);
    MainChatService mainChatService = new MainChatService(mainChatRepository, mainChatUtils, chratUserTokenRepository, chratUserUtils);


    @Test
    void chratUserToken() {
        // given
        String username = "chris_yooo";
        String id = "123123123123";
        ChratUserToken actual = new ChratUserToken(id, username);
        // when
        when(chratUserUtils.addUUIDasString()).thenReturn(id);
        ChratUserToken expected = mainChatService.chratUserToken(username);
        when(chratUserTokenRepository.save(expected)).thenReturn(expected);
        // then
        verify(chratUserUtils).addUUIDasString();
        verify(chratUserTokenRepository).save(expected);
        assertEquals(expected, actual);
    }

    @Test
    void chratUserTokenAnonymousUser() {
        // given
        String username = "anonymousUser";
        // when
        ChratUserToken expected = mainChatService.chratUserToken(username);
        ChratUserToken actual = new ChratUserToken("", "anonymousUser");
        // then
        assertEquals(expected, actual);
    }

    @Test
    void addMessage() {
        String messageWithoutDate = "moin";
        String dateTime = "22.11.2022";
        MainChatMessage usernameDateTimeMessage = new MainChatMessage("chris", "22.11.2022", "moin");
        //when
        when(mainChatUtils.addLocalDateTimeFormatted()).thenReturn(dateTime);
        when(mainChatRepository.save(usernameDateTimeMessage)).thenReturn(usernameDateTimeMessage);
        MainChatMessage actual = mainChatService.addMessage(messageWithoutDate, "chris");
        //then
        verify(mainChatUtils).addLocalDateTimeFormatted();
        verify(mainChatRepository).save(usernameDateTimeMessage);
        assertEquals(usernameDateTimeMessage, actual);
    }

    @Test
    void getMessages() {
        //given
        List<MainChatMessage> testMessages = new ArrayList<>();
        //when
        List<MainChatMessage> actual = mainChatService.getMessages();
        //then
        assertEquals(testMessages, actual);
    }
}
