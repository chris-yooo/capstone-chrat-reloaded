package de.strassow.backend.mainchat;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.mock;

class MainChatServiceTest {

    MainChatUtils mainChatUtils = mock(MainChatUtils.class);
    MainChatRepository mainChatRepository = mock(MainChatRepository.class);
    MainChatService mainChatService = new MainChatService(mainChatRepository, mainChatUtils);

    @Test
    void addMessage() {
        String messageWithoutDate = "123";
        String date = "22.11.2022";
        MainChatMessage messageWithDate = new MainChatMessage("22.11.2022: 123");
        //when
        when(mainChatUtils.addLocalDateTimeFormatted()).thenReturn(date);
        when(mainChatRepository.save(messageWithDate)).thenReturn(messageWithDate);
        MainChatMessage actual = mainChatService.addMessage(messageWithoutDate);
        //then
        verify(mainChatUtils).addLocalDateTimeFormatted();
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
