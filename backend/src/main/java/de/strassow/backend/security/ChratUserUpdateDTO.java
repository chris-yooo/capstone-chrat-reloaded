package de.strassow.backend.security;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public record ChratUserUpdateDTO(
        @NotBlank String id,
        @NotBlank String username,
        @NotBlank String firstName,
        @NotBlank String lastName,
        @Email String email
) {
}
