import axios from "axios";

const BASE_URL = `https://places.googleapis.com/v1/places:searchText`;

const config = {
  headers: {
    "Content-Type": "application/json",
    'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask": "places.photos,places.displayName,places.id", // Must be a string
  },
};

export const GetPlaceDetails = async (data) => {
  try {
    const response = await axios.post(BASE_URL, data, config);
    console.log("GLOBAL API RESPONSE:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
  }
};


export const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=800&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY