package de.strassow.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ChratUserControllerTest {

    @Autowired
    private MockMvc mvc;

    @DirtiesContext
    @Test
    void addAppUser() throws Exception {

        mvc.perform(MockMvcRequestBuilders.post("/api/chrat-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "detlev",
                                "firstName": "det",
                                "lastName": "lev",
                                "email": "test@gmail.com",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk());
    }

    @DirtiesContext
    @Test
//    void loginWithoutCredentials() throws Exception {
//
//        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/login"))
//                .andExpect(status().isUnauthorized());
//    }

    void loginWithTestUser() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/chrat-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "detlev",
                                "firstName": "det",
                                "lastName": "lev",
                                "email": "test@gmail.com",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/login")
                        .header("Authorization", "detlev:SuperSecret344$$")
                        .session(new MockHttpSession()))
                .andExpect(status().isOk())
                .andExpect(content().string("OK"));
    }

    @DirtiesContext
    @Test
//    void logout() throws Exception {
//        mvc.perform(MockMvcRequestBuilders.post("/api/chrat-users/logout"))
//                .andExpect(status().isUnauthorized());
//    }

    void loginWithTestUserAndLogout() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/chrat-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "detlev",
                                "firstName": "det",
                                "lastName": "lev",
                                "email": "test@gmail.com",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/login")
                        .header("Authorization", "detlev:SuperSecret344$$")
                        .session(new MockHttpSession()))
                .andExpect(status().isOk())
                .andExpect(content().string("ok"));

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/logout"));
    }

    @DirtiesContext
    @Test
    void createUserAndCheckLoginMe() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/chrat-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "detlev",
                                "firstName": "det",
                                "lastName": "lev",
                                "email": "test@gmail.com",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/me")
                        .header("Authorization", "detlev:SuperSecret344$$")
                        .session(new MockHttpSession()))
                .andExpect(status().isOk());
    }
}
