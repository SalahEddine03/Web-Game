import requests
import json
import os
import time


class UnsplashService:

    def __init__(self):
        self.api_key = "kyaijNyBbHnqnndqTcSHuwa0KXB5jMFVa2YIoM4P4tk"
        self.api_url = "https://api.unsplash.com"

    def get_city_image_data(self):
        # Create the API endpoint with query parameters
        endpoint = f"{self.api_url}/photos/random?query=city&client_id={self.api_key}&count=500"  # Fetch 5 random city images

        try:
            # Send GET request to the Unsplash API
            response = requests.get(endpoint)

            # Check if the request was successful
            if response.status_code == 200:
                # Parse the JSON response
                return response.json()
            else:
                print(f"Error: Unable to fetch data. Status code: {response.status_code}")
                return None
        except Exception as e:
            print(f"Exception occurred: {e}")
            return None


# Example usage of UnsplashService
if __name__ == "__main__":
    service = UnsplashService()
    loop_counter = 0

    while True:
        print(f"Request attempt {loop_counter + 1}...")

        # Fetch city image data
        city_images = service.get_city_image_data()

        if city_images:
            # Prepare a list to store only city names and image URLs
            simplified_data = []

            for image in city_images:
                # Extract the image URL and city name
                image_url = image['urls'].get('regular')
                city_name = image.get('location', {}).get('city', 'Unknown City')

                # If the 'regular' image URL is not found, fall back to another size like 'full'
                if not image_url:
                    image_url = image['urls'].get('full', '')

                # Add the city name and image URL to the simplified_data list
                simplified_data.append({
                    "city_name": city_name,
                    "image_url": image_url
                })

            # Path to the JSON file
            json_file_path = 'city_images.json'

            # Check if the file exists
            if os.path.exists(json_file_path):
                # Load existing data from the JSON file
                with open(json_file_path, 'r') as file:
                    existing_data = json.load(file)
            else:
                # If the file doesn't exist, initialize with an empty list
                existing_data = []

            # Combine the existing data with the new data
            existing_data.extend(simplified_data)

            # Save the combined data back to the JSON file
            with open(json_file_path, 'w') as file:
                json.dump(existing_data, file, indent=4)
                print("Data saved to 'city_images.json'")

            # Add a small delay before making another request
            time.sleep(3)  # Sleep for 3 seconds (adjust as needed)

            # Increment the loop counter
            loop_counter += 1
        else:
            # If the response status code is not 200 or if an exception occurs, stop the loop
            print("Stopping the loop due to error or invalid response.")
            break