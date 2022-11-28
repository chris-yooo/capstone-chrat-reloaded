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
        String randomId = chratUserUtils.addUUIDasString();
        ChratUserToken chratUserToken = new ChratUserToken(randomId, username);
      chratUserTokenRepository.save(chratUserToken);
    }
}
