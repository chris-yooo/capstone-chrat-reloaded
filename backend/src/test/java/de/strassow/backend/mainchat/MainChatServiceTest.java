package de.strassow.backend.mainchat;

import de.strassow.backend.utils.MainChatUtils;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class MainChatServiceTest {

    MainChatRepository mainChatRepository = mock(MainChatRepository.class);
    MainChatUtils mainChatUtils = mock(MainChatUtils.class);
    MainChatService mainChatService = new MainChatService(mainChatRepository, mainChatUtils);


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
