package de.strassow.backend.mainchat;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.mock;

class MainChatUtilsTest {
    MainChatUtils mainChatUtils = mock(MainChatUtils.class);

    @Test
    void addLocalDateTimeFormatted() {
        //given
        String testDate = "22.11.2022 12:12:12";
        //when
        when(mainChatUtils.addLocalDateTimeFormatted()).thenReturn(testDate);
        String actual = mainChatUtils.addLocalDateTimeFormatted();
        //then
        verify(mainChatUtils).addLocalDateTimeFormatted();
        assertEquals(testDate, actual);
    }
}
