import React from "react";

const TripPlan = ({ tripData }) => {
  return (
    <div>
      <h2 className="font-bold text-2xl mt-10">Places to Visit</h2>
      {/* <div>
        {tripData.tripData?.itinerary ? (
          Object.entries(tripData.tripData.itinerary).map(
            ([key, value], index) => (
              <div key={index}>
                <h2>Day {index + 1}</h2>
                <p>
                  {key}: {JSON.stringify(value)}
                </p>
              </div>
            )
          )
        ) : (
          <p>No itinerary available.</p>
        )}
      </div> */}
    </div>
  );
};

export default TripPlan;
