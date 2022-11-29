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
    MainChatService mainChatService = new MainChatService(mainChatRepository, mainChatUtils, null, null);

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
