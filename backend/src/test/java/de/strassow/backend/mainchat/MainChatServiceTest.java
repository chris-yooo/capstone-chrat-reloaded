package de.strassow.backend.mainchat;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.mock;

class MainChatServiceTest {

    MainChatRepository mainChatRepository = mock(MainChatRepository.class);
    MainChatService mainChatService = new MainChatService(mainChatRepository);

    @Test
    void addMessage() {
        String messageToTest = "MOIN";
        MainChatMessage messageWithDate = new MainChatMessage("MOIN");
        //when
        when(mainChatRepository.save(messageWithDate)).thenReturn(messageWithDate);
        MainChatMessage actual = mainChatService.addMessage(messageToTest);
        //then
        verify(mainChatRepository).save(messageWithDate);
        assertEquals(messageWithDate, actual);
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
