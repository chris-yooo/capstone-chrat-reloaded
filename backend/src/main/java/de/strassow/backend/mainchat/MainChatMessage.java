package de.strassow.backend.mainchat;

import javax.validation.constraints.NotBlank;

public record MainChatMessage(


        @NotBlank String username,
        @NotBlank String datetime,
        @NotBlank String message



) {
    @Override
    public String toString() {
        return '{' + "'username':" + "'" + this.username + "'" + "," + "'datetime':" + "'" + this.datetime + "'" + "," + "'message':" + "'" + this.message + "'" + '}';
    }
}
