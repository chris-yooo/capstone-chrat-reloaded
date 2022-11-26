package de.strassow.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/chrat-users")
@RequiredArgsConstructor
public class ChratUserController {

    private final ChratService chratService;

    @GetMapping("/login")
    public String login() {
        return "OK";
    }

    @GetMapping("/logout")
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
    }

    @GetMapping("/me")
    public String me() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @PostMapping
    public void createAppUser(@RequestBody ChratUserDTO chratUserDTO) {
        chratService.save(chratUserDTO);
    }
}