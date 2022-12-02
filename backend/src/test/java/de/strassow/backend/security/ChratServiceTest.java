package de.strassow.backend.security;

import de.strassow.backend.utils.ChratUserUtils;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ChratServiceTest {

    ChratRepository chratRepository = mock(ChratRepository.class);
    ChratUserUtils chratUserUtils = mock(ChratUserUtils.class);
    ChratUserTokenRepository chratUserTokenRepository = mock(ChratUserTokenRepository.class);
    ChratService chratService = new ChratService(chratRepository, chratUserUtils, chratUserTokenRepository);

    @Test
    void getChratUserOK() {
        //GIVEN
        ChratUser chratUser = new ChratUser("1", "chris_yooo", "Yoo", "Chris", "Yoo", "fsagfg@gmail.com");
        //WHEN
        when(chratRepository.findByUsername(chratUser.username())).thenReturn(Optional.of(chratUser));
        Optional<ChratUser> actual = chratRepository.findByUsername(chratUser.username());
        verify(chratRepository).findByUsername(chratUser.username());
        //THEN
        assertEquals(chratUser, actual.get());
    }

    @Test
    void getChratUserException() {
        //GIVEN
        ChratUser chratUser = new ChratUser("1", "chris_yooo", "Yoo", "Chris", "Yoo", "fsagfg@gmail.com");
        //WHEN
        when(chratRepository.findByUsername(chratUser.username())).thenReturn(Optional.empty());
        String message = null;
        try {
            chratService.getChratUser(chratUser.username());
        } catch (ResponseStatusException e) {
            message = e.getReason();
        }
        verify(chratRepository).findByUsername(chratUser.username());
        //THEN
        assertEquals("User not found", message);
    }

    @Test
    void addChratUser() {
        //given
        ChratUser chratUserWithId = new ChratUser("1", "chris_yooo", "pw", "Chris", "Yoo", "fsagfg@gmail.com");
        DtoNewChratUser DtoNewChratUserWithoutId = new DtoNewChratUser("chris_yooo", "pw", "Chris", "Yoo", "fsagfg@gmail.com");
        //when
        when(chratUserUtils.addUUIDasString()).thenReturn(chratUserWithId.id());
        when(chratUserUtils.addPasswordBcrypt("pw")).thenReturn("pw");
        when(chratRepository.save(chratUserWithId)).thenReturn(chratUserWithId);
        ChratUser actual = chratService.addChratUser(DtoNewChratUserWithoutId);
        //then
        verify(chratUserUtils).addPasswordBcrypt(chratUserWithId.passwordBcrypt());
        verify(chratUserUtils).addUUIDasString();
        verify(chratRepository).save(chratUserWithId);
        assertEquals(chratUserWithId, actual);
    }

    @Test
    void getChratUseraddChratUserException() {
        //given
        ChratUser chratUser = new ChratUser("1", "chris_yooo", "pw", "Chris", "Yoo", "fsagfg@gmail.com");
        DtoNewChratUser dtoNewChratUserWithoutId = new DtoNewChratUser("chris_yooo", "pw", "Chris", "Yoo", "fsagfg@gmail.com");
        //when
        when(chratRepository.findByUsername(dtoNewChratUserWithoutId.username())).thenReturn(Optional.of(new ChratUser("1", "chris_yooo", "pw", "Chris", "Yoo", "fsagfg@gmail.com")));
        String message = null;
        try {
            chratService.addChratUser(dtoNewChratUserWithoutId);
        } catch (ResponseStatusException e) {
            message = e.getReason();
        }
        //then
        verify(chratRepository).findByUsername(chratUser.username());
        assertEquals("User not found", message);
    }

    @Test
    void getChratUserDetailsOK() {
        //given
        ChratUser chratUserComplete = new ChratUser("1", "chris_yooo", "pw", "Chris", "Yoo", "fsagfg@gmail.com");
        //when
        when(chratRepository.findByUsername(chratUserComplete.username())).thenReturn(Optional.of(chratUserComplete));
        ChratUser actual = chratService.getChratUserDetails(chratUserComplete.username());
        //then
        verify(chratRepository).findByUsername(chratUserComplete.username());
        assertEquals(chratUserComplete, actual);
    }

    @Test
    void getChratUserDetailsException() {
        //given
        ChratUser chratUser = new ChratUser("1", "chris_yooo", "pw", "Chris", "Yoo", "fsagfg@gmail.com");
        //when
        when(chratRepository.findByUsername(chratUser.username())).thenReturn(Optional.empty());
        String message = null;
        try {
            chratService.getChratUserDetails(chratUser.username());
        } catch (ResponseStatusException e) {
            message = e.getReason();
        }
        //then
        verify(chratRepository).findByUsername(chratUser.username());
        assertEquals("User not found", message);
    }

    @Test
    void updateChratUserOK() {
        ChratUser chratUserOld = new ChratUser("1", "chris_yooo", "pw", "Chris", "Yoo", "fsagfg@gmail.com");
        ChratUser chratUserNew = new ChratUser("1", "chris_yooo", "pw", "Chris", "Yoo", "fsagfg@gmail.com");
        DtoUpdateChratUser chratUserDto = new DtoUpdateChratUser("1", "Chris", "Yoo", "fsagfg@gmail.com");
        //when
        when(chratRepository.findById(chratUserDto.id())).thenReturn(Optional.of(chratUserOld));
        when(chratRepository.save(chratUserNew)).thenReturn(chratUserNew);
        ChratUser actual = chratService.updateUserProfile(chratUserDto);
        //then
        assertEquals(chratUserNew, actual);
    }

    @Test
    void updateChratUserException() {
        String notFound = "User not found";
        String message = null;
        DtoUpdateChratUser chratUserDto = new DtoUpdateChratUser("1", "Chris", "Yoo", "fsagfg@gmail.com");
        //when
        when(chratRepository.findById(chratUserDto.id())).thenReturn(Optional.empty());
        try {
            chratService.updateUserProfile(chratUserDto);
        } catch (RuntimeException e) {
            message = e.getMessage();
        }
        //then
        assertEquals(notFound, message);
    }

    @Test
    void chratUserTokenAnonymousUser() {
        // given
        String username = "anonymousUser";
        // when
        ChratUserToken expected = chratService.chratUserToken(username);
        ChratUserToken actual = new ChratUserToken("", "anonymousUser");
        // then
        assertEquals(expected, actual);
    }

    @Test
    void chratUserTokenSave() {
        // given
        String username = "chris_yooo";
        String id = "123123123123";
        ChratUserToken actual = new ChratUserToken(id, username);
        // when
        when(chratUserUtils.addUUIDasString()).thenReturn(id);
        ChratUserToken expected = chratService.chratUserToken(username);
        when(chratUserTokenRepository.save(expected)).thenReturn(expected);
        // then
        verify(chratUserUtils).addUUIDasString();
        verify(chratUserTokenRepository).save(expected);
        assertEquals(expected, actual);
    }

    @Test
    void deleteUserTokenAfterSessionAdd() {
        // given
        String id = "123123123123";
        String username = "chris_yooo";
        when(chratUserTokenRepository.findById(id)).thenReturn(java.util.Optional.of(new ChratUserToken(id, username)));
        chratService.deleteUserTokenAfterSessionAdd(id);
        assertEquals(0, chratService.chratUserTokenRepository.count());
    }

    @Test
    void tokenToCompare() {
        // given
        String id = "123123123123";
        String username = "chris_yooo";
        // when
        when(chratUserTokenRepository.findById(id)).thenReturn(java.util.Optional.of(new ChratUserToken(id, username)));
        // then
        assertEquals(username, chratService.tokenToCompare(id));
    }
}