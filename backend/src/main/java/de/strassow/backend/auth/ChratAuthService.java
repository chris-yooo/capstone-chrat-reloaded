package de.strassow.backend.auth;

import de.strassow.backend.security.ChratUserUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChratAuthService {

    public final ChratUserTokenRepository chratUserTokenRepository;

    public final ChratUserUtils chratUserUtils;

    public void saveAuthTokenToDb(String username) {
        if (chratUserTokenRepository.findByUsername(username).isPresent()) {
            chratUserTokenRepository.deleteAllByUsername(username);
        }
        final ChratUserToken chratUserToken = new ChratUserToken(chratUserUtils.addUUIDasString(), username);
        chratUserTokenRepository.save(chratUserToken);
    }
}
