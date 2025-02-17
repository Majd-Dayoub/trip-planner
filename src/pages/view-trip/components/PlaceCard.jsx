import { React, useState, useEffect } from "react";
import loadingImg from "/public/loading.jpg";
import { Link } from "react-router-dom";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { PHOTO_REF_URL } from "@/service/GlobalApi";

const PlaceCard = ({ place, tripData }) => {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName + "," + tripData?.userSelection?.location?.label,
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
        place.placeName + "," + tripData?.userSelection?.location?.label
      }`}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img className="w-[150px] h-[150px] rounded-xl object-cover" src={photoUrl?photoUrl:loadingImg}></img>
        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-400 mt-2">{place.placeDetails}</p>
          <p className="font-normal text-sm mt-1">💰 {place.ticketPricing}</p>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
