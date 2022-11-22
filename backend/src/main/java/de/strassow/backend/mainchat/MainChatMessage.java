package de.strassow.backend.mainchat;

import javax.validation.constraints.NotBlank;

public record MainChatMessage(@NotBlank String message) {
}
