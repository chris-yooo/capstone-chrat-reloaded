package de.strassow.backend.mainchat;

import org.junit.jupiter.api.Test;

import java.time.*;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.*;

class MainChatUtilsTest {
    MainChatUtils mainChatUtils = new MainChatUtils();

    @Test
    void testSomeMethod() {
        //given
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
        //when
        String actual = mainChatUtils.addLocalDateTimeFormatted();
        //then
        assertEquals(now.format(formatter), actual);
    }

}
