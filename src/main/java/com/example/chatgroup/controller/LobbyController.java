package com.example.chatgroup.controller;

import org.springframework.web.bind.annotation.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api")
public class LobbyController {

    private final ConcurrentHashMap<String, LobbyData> lobbies = new ConcurrentHashMap<>();

    @PostMapping("/create-lobby")
    public String createLobby() {
        String lobbyCode = generateLobbyCode();
        lobbies.put(lobbyCode, new LobbyData());
        return lobbyCode; // Return the code only for easier handling on the frontend
    }

    @PostMapping("/verify-lobby")
    public String verifyLobbyCode(@RequestBody LobbyCodeRequest request) {
        return lobbies.containsKey(request.getCode()) ? "Correct code!" : "Invalid code.";
    }

    @GetMapping("/lobby-data/{code}")
    public LobbyData getLobbyData(@PathVariable String code) {
        return lobbies.getOrDefault(code, null); // Return null if lobby doesn't exist
    }

    private String generateLobbyCode() {
        return String.valueOf((int) (Math.random() * 9000) + 1000);
    }

    public static class LobbyCodeRequest {
        private String code;
        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
    }

    public static class LobbyData {
        private String cityName = "";
        private String imageUrl = "";

        public String getCityName() { return cityName; }
        public void setCityName(String cityName) { this.cityName = cityName; }

        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    }
}
