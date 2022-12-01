package de.strassow.backend.security;

import de.strassow.backend.utils.ChratUserUtils;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertNotEquals;

class ChratUserUtilsTest {

    ChratUserUtils chratUserUtils = new ChratUserUtils();

    @Test
    void addUUIDasString() {
        //given
        String randomString = UUID.randomUUID().toString();
        //when
        String actual = chratUserUtils.addUUIDasString();
        //then
        assertNotEquals(randomString, actual);
    }

    @Test
    void addPasswordBcrypt() {
        //given
        String password = "password";
        String passwordString = ChratSecurityConfig.passwordEncoder.encode(password);
        //when
        String actual = chratUserUtils.addPasswordBcrypt(password);
        //then
        assertNotEquals(passwordString, actual);
    }
}
