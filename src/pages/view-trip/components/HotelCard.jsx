import {React, useState, useEffect} from "react";
import loadingImg from "/public/loading.jpg";
import { Link } from 'react-router-dom';
import { GetPlaceDetails } from "@/service/GlobalApi";
import { PHOTO_REF_URL } from "@/service/GlobalApi";
function HotelCard({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
      hotel && GetPlacePhoto();
    }, [hotel]);
  
    const GetPlacePhoto = async () => {
      const data = {
        textQuery: hotel.hotelName,
      };
  
      try {
        const res = await GetPlaceDetails(data);
  
        console.log("Full API Response:", res); // Debug full response
  
        if (!res || !res.places || res.places.length === 0) {
          console.error("No places found in API response.");
          return;
        }
  
        const place = res.places[0];
  
        if (!place.photos || place.photos.length === 0) {
          console.error("No photos found for this place.");
          return;
        }
  
        const photoIndex = 3; // 4th photo
        if (!place.photos[photoIndex]) {
          console.error(`Photo at index ${photoIndex} does not exist.`);
          return;
        }
  
        const PhotoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          place.photos[photoIndex].name
        );
        console.log("Photo URL:", PhotoUrl);
        setPhotoUrl(PhotoUrl);
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
      }
    };
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${
        hotel.hotelName 
      }`}
      target="_blank"
    >
      <div
        className="hover:scale-105 transition-all cursor-pointer"
      >
        <img src={photoUrl?photoUrl:loadingImg} className="rounded-xl h-[180px] w-[300px] object-cover" />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel.hotelName}</h2>
          <h2 className="text-sm font-medium">⭐ {hotel.rating}</h2>
          <h2 className="text-sm font-medium">💵 {hotel.price}</h2>
          <h2 className="text-xs font-medium">📌 {hotel.hotelAddress}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCard;
