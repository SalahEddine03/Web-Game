package com.example.chatgroup.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Random;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    @GetMapping("/api/image")
    public String getRandomImage() {
        try {
            // Load JSON data from file
            ObjectMapper objectMapper = new ObjectMapper();
            File jsonFile = new File("city_images.json");

            // Deserialize JSON into a list of City objects
            List<City> cityData = objectMapper.readValue(jsonFile, objectMapper.getTypeFactory().constructCollectionType(List.class, City.class));

            // Generate a random index
            Random random = new Random();
            int randomIndex = random.nextInt(cityData.size()); // Select a random index

            // Get the random city
            City randomCity = cityData.get(randomIndex);


            // Return the image URL of the random city
            return randomCity.getImageUrl();
        } catch (IOException e) {
            e.printStackTrace();
            return "Error reading the JSON file";
        }
    }



    public static class City {

        @JsonProperty("city_name") // Maps JSON "city_name" to the "cityName" Java field
        private String cityName;

        @JsonProperty("image_url") // Maps JSON "image_url" to the "imageUrl" Java field
        private String imageUrl;

        // Getter and Setter for cityName
        public String getCityName() {
            return cityName;
        }

        public void setCityName(String cityName) {
            this.cityName = cityName;
        }

        // Getter and Setter for imageUrl
        public String getImageUrl() {
            return imageUrl;
        }

        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }
    }

}
