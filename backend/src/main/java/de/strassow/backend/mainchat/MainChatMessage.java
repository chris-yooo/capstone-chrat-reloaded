package de.strassow.backend.mainchat;

import javax.validation.constraints.NotBlank;

public record MainChatMessage(
        @NotBlank String username,
        @NotBlank String datetime,
        @NotBlank String message) {
}
