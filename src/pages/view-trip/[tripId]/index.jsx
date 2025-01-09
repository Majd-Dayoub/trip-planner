import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import TripPlan from "../components/TripPlan";


function ViewTrip() {
  const [tripData, setTripData] = useState({});

  const { tripId } = useParams();

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  //FUNCTION: Get Trip Data from Firebase
  const GetTripData = async () => {
    const docRef = doc(db, "AiTrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTripData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
  <div className="p-10 md:px-20 lg:px-44 xl:px-56">
    {/** Information Section */}
    <InfoSection tripData ={tripData}></InfoSection>
    {/** Recommended Hotels Section */}
    <Hotels tripData={tripData}></Hotels>
    {/** Itenirary Section */}
    <TripPlan tripData={tripData}></TripPlan>
    {/** Footer Section */}

  </div>
);
}

export default ViewTrip;
