package de.strassow.backend.utils;

import de.strassow.backend.security.ChratSecurityConfig;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ChratUserUtils {

    public String addUUIDasString() {
        return UUID.randomUUID().toString();
    }

    public String addPasswordBcrypt(String password) {
        return ChratSecurityConfig.passwordEncoder.encode(password);
    }
}
