package de.strassow.backend.mainchat;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class WebSocketServiceTest {

    @Autowired
    private MockMvc mockMvc;

    @DirtiesContext
    @Test
    void handleTextMessage() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.get("/api/mainchat"))
                .andExpect(status().is4xxClientError());
    }

    @Test
    void afterConnectionEstablished() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/mainchat"))
                .andExpect(status().is4xxClientError());
    }

    @Test
    void afterConnectionClosed() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/mainchat"))
                .andExpect(status().is4xxClientError());
    }
}