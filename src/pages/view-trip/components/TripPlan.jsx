import React from "react";
import PlaceCard from "./PlaceCard";

const TripPlan = ({ tripData }) => {
  return (
    console.log(tripData.tripData),
    (
      <div>
        <h2 className="font-bold text-2xl mt-10">Places to Visit</h2>

        {tripData?.tripData?.itinerary ? (
          Object.keys(tripData.tripData.itinerary)
            .sort((a, b) => {
              // Extract numbers from "day1", "day4", etc.
              const numA = parseInt(a.replace(/\D/g, ""), 10);
              const numB = parseInt(b.replace(/\D/g, ""), 10);
              return numA - numB;
            })
            .map((day, index) => (
              <div className="mt-3" key={day}>
                <h2 className="font-bold text-xl">Day {index + 1}</h2>
                <h2 className="font-medium text-xl">{tripData.tripData.itinerary[day].theme}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {tripData.tripData.itinerary[day].places.map(
                    (place, index) => (
                      <div className="my-3" key={index}>
                        <PlaceCard place={place} tripData={tripData}/>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))
        ) : (
          <p>Loading itinerary...</p>
        )}
      </div>
    )
  );
};

export default TripPlan;
