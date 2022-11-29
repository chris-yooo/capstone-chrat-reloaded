package de.strassow.backend.security;

import de.strassow.backend.auth.ChratUserToken;
import de.strassow.backend.mainchat.MainChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/chrat-users")
@RequiredArgsConstructor
public class ChratUserController {

    private final ChratService chratService;
    private final MainChatService mainChatService;

    @PostMapping
    public void createAppUser(@Valid @RequestBody ChratUserDTO chratUserDTO) {
        chratService.save(chratUserDTO);
    }

    @GetMapping("/login")
    public String login() {
        return "OK";
    }

    @GetMapping("/logout")
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
    }

    @GetMapping("/me")
    public ChratUserToken me() {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        return mainChatService.sendUsernameToService(username);
    }
}
