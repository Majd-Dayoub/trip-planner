import React, { useEffect, useState } from "react";
import loadingImg from "/public/loading.jpg";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { PHOTO_REF_URL } from "@/service/GlobalApi";

  
const InfoSection = ({ tripData }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    tripData && GetPlacePhoto();
  }, [tripData]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: tripData?.userSelection?.location?.label,
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
    <div>
      <img
        src={photoUrl?photoUrl:loadingImg}
        className="h-[340px] w-full object-cover rounded-xl"
      />

      <div className="flex justify-between items-center">
        {/* Trip Main Information */}
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-3xl">
            {tripData?.userSelection?.location?.label}
          </h2>
          {/* Trip Sub Information */}
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-300 rounded-full text-gray-800 text-sm md:text-md">
              📅 {tripData?.userSelection?.duration} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-300 rounded-full text-gray-800 text-sm md:text-md">
              💰 {tripData?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-300 rounded-full text-gray-800 text-sm md:text-md">
              🫂 {tripData?.userSelection?.travelList} Travellers
            </h2>
          </div>
        </div>
        <Button
          className="mt-4 flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-white hover:bg-gray-800"
          onClick={console.log("")}
        >
          Share Trip
          <FontAwesomeIcon icon={faShare} className="text-lg text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
