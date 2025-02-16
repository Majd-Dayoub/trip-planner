import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Button } from "../../components/ui/button";
import { chatSession } from "@/service/AiModel";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useNavigate();

  // Handle Input Change
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Google Login
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  // Get User Profile
  const GetUserProfile = (tokenInfo) => {
    console.log("GetUserProfile called with token:", tokenInfo);

    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log("User Profile:", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialog(false);
        OnGenerateTrip();
      })
      .catch((error) => {
        console.error(
          "Error fetching user profile:",
          error.response || error.message
        );
      });
  };

  // Generate Trip Function
  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.location ||
      !formData?.duration ||
      !formData?.budget ||
      !formData?.travelList
    ) {
      alert("Please Fill all the fields");
      return;
    }
    setIsLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{duration}", formData?.duration)
      .replace("{budget}", formData?.budget)
      .replace("{travelList}", formData?.travelList);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setIsLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  //DB Functions
  const SaveAiTrip = async (tripData) => {
    setIsLoading(true);
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const cleanedTripData =
        typeof tripData === "string" ? JSON.parse(tripData) : tripData;

      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: formData,
        tripData: cleanedTripData,
        userEmail: user?.email,
        id: docId,
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error saving document:", error);
      setIsLoading(false);
    }
    router(`/view-trip/${docId}`);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    // Container
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      {/* Heading Text*/}
      <h2 className="font-bold text-3xl">
        Share with us your travel prefrences
      </h2>
      <p className="mt-3 text-gray-00 text-xl">
        Provide the information below, and our trip planner will do the rest
      </p>

      {/* Form */}
      <div className="mt-20 flex flex-col gap-10">
        {/* Destination Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination?
          </h2>
          <div>
            <GooglePlacesAutocomplete
              className="cursor-text"
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (value) => {
                  setPlace(value);
                  handleInputChange("location", value);
                },
              }}
            />
          </div>
        </div>

        {/* Duration of Trip Input */}
        <div className="">
          <h2 className="text-xl my-3 font-medium">
            How many days is your trip?
          </h2>
          <select
            onChange={(e) => handleInputChange("duration", e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            defaultValue=""
          >
            <option value="" disabled>
              Select number of days
            </option>
            {[...Array(7)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1} {index + 1 === 1 ? "day" : "days"}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.budget == item.title && "shadow-lg border-blue-500"
                }`}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="text-lg font-bold mt-2">{item.title}</h2>
                <p className="text-sm text-gray-900">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Traveller Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many people are travelling?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.travelList == item.people &&
                  "shadow-lg border-blue-500"
                }`}
                onClick={() => handleInputChange("travelList", item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="text-lg font-bold mt-2">{item.title}</h2>
                <p className="text-sm text-gray-900">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="my-10 justify-end flex">
          <Button disabled={isLoading} onClick={OnGenerateTrip}>
            Create Trip
          </Button>
        </div>

        {/* Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign in with Google</DialogTitle>
              <DialogDescription>
                <img
                  className="w-16 h-auto"
                  src="plane-logo.svg"
                  alt="TripBuddy Logo"
                />
                <Button
                  className="mt-4 flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-white hover:bg-gray-800"
                  onClick={login}
                >
                  <FontAwesomeIcon
                    icon={faGoogle}
                    className="text-lg text-red-500"
                  />
                  Sign in with Google
                </Button>
                Sign in to TripBuddy.ai with Google authentication securely.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
