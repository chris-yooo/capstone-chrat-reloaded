package de.strassow.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tomcat.util.codec.binary.Base64;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ChratUserControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    String base64ClientCredentials = new String(Base64.encodeBase64("user:SuperSecret344$$".getBytes()));

    @DirtiesContext
    @Test
    void addAppUser() throws Exception {

        mvc.perform(MockMvcRequestBuilders.post("/api/chrat-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "user",
                                "firstName": "det",
                                "lastName": "lev",
                                "email": "test@gmail.com",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk());
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void loginWithTestUser() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/chrat-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "user",
                                "firstName": "det",
                                "lastName": "lev",
                                "email": "test@gmail.com",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/login")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().string("OK"));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void loginWithTestUserAndLogout() throws Exception {

        mvc.perform(MockMvcRequestBuilders.post("/api/chrat-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "user",
                                "firstName": "det",
                                "lastName": "lev",
                                "email": "test@gmail.com",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/login")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().string("OK"));

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/logout")
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk());
        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/me")).andExpect(status().isOk());
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void createUserAndCheckLoginMe() throws Exception {

        mvc.perform(MockMvcRequestBuilders.post("/api/chrat-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "user",
                                "firstName": "det",
                                "lastName": "lev",
                                "email": "test@gmail.com",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/login")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().string("OK"));

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/me")
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk());
    }


    @DirtiesContext
    @Test
    @WithMockUser
    void getChratUser() throws Exception {

      String content = mvc.perform(MockMvcRequestBuilders.post("/api/chrat-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "user",
                                "firstName": "det",
                                "lastName": "lev",
                                "email": "test@gmail.com",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk())
              .andReturn().getResponse().getContentAsString();

        ChratUser chratUser = objectMapper.readValue(content, ChratUser.class);

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/login")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().string("OK"));

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/user")
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().json("""
                                                    {
                                                    "id": "<id>",
                                                    "username": "user",
                                                    "firstName": "det",
                                                    "lastName": "lev",
                                                    "email": "test@gmail.com"
                                                    }
                        """.replace("<id>", chratUser.id())));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void updateChratUser() throws Exception {

        String content =  mvc.perform(MockMvcRequestBuilders.post("/api/chrat-users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "user",
                                "firstName": "det",
                                "lastName": "lev",
                                "email": "test@gmail.com",
                                "password": "SuperSecret344$$"}
                                """))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        ChratUser chratUser = objectMapper.readValue(content, ChratUser.class);

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/login")
                        .header("Authorization", "Basic " + base64ClientCredentials)
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().string("OK"));

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/me")
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk());

        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/user")
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().json("""
                                                    {
                                                    "id": "<id>",
                                                    "username": "user",
                                                    "firstName": "det",
                                                    "lastName": "lev",
                                                    "email": "test@gmail.com"
                                                    }
                        """.replace("<id>", chratUser.id())));

        mvc.perform(MockMvcRequestBuilders.put("/api/chrat-users/" + chratUser.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "id": "<id>",
                                "firstName": "det",
                                "lastName": "lev",
                                "email": "test@gmail.de"
                                }
                                """.replace("<id>", chratUser.id())));


        mvc.perform(MockMvcRequestBuilders.get("/api/chrat-users/user")
                        .accept("application/json;charset=UTF-8"))
                .andExpect(status().isOk()).andExpect(content().json("""
                                                    {
                                                    "id": "<id>",
                                                    "username": "user",
                                                    "firstName": "det",
                                                    "lastName": "lev",
                                                    "email": "test@gmail.de"
                                                    }
                        """.replace("<id>", chratUser.id())));
    }
}
