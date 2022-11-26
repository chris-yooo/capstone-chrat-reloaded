package de.strassow.backend.security;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.mock;

class ChratServiceTest {

    ChratUserUtils chratUserUtils = mock(ChratUserUtils.class);
    ChratRepository chratRepository = mock(ChratRepository.class);
    ChratService chratService = new ChratService(chratRepository, chratUserUtils);

    @Test
    void getChratUser() {

        //GIVEN
        ChratUser chratUser = new ChratUser("1", "chris_yooo", "Yoo", "Chris", "Yoo", "fsagfg@gmail.com");
        //WHEN
        when(chratRepository.findByUsername("chris_yooo")).thenReturn(chratUser);
        ChratUser actual = chratRepository.findByUsername(chratUser.username());

        //THEN
        assertEquals(chratUser, actual);
    }

    @Test
    void addChratUser() {
        //given
        String id = "1";
        ChratUser chratUserWithId = new ChratUser("1", "chris_yooo", "pw", "Chris", "Yoo", "fsagfg@gmail.com");
        ChratUserDTO chratUserDTOWithoutId = new ChratUserDTO("chris_yooo", "pw", "Chris", "Yoo", "fsagfg@gmail.com");
        //when
        when(chratUserUtils.addUUIDasString()).thenReturn(id);
        when(chratUserUtils.addPasswordBcrypt("pw")).thenReturn("pw");
        when(chratRepository.save(chratUserWithId)).thenReturn(chratUserWithId);
        ChratUser actual = chratService.save(chratUserDTOWithoutId);
        //then
        verify(chratUserUtils).addPasswordBcrypt(chratUserWithId.passwordBcrypt());
        verify(chratUserUtils).addUUIDasString();
        verify(chratRepository).save(chratUserWithId);
        assertEquals(chratUserWithId, actual);
    }
}
