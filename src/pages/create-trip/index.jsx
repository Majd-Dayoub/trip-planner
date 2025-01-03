import { SelectBudgetOptions, SelectTravelsList } from "@/constants/options";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {Button} from '../../components/ui/button'

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const OnGenerateTrip = () => {
    if(formData?.duration > 7) {
      alert('Duration should 7 days or less');
      return ;
    }
  }


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
          <GooglePlacesAutocomplete
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

        {/* Duration of Trip Input */}
        <div className="">
          <h2 className="text-xl my-3 font-medium">
            How many days is your trip?
          </h2>
          <input
            placeholder="Ex.3"
            onChange={(e) => handleInputChange("duration", e.target.value)}
            type="number"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Budget Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.budget == item.title&&'shadow-lg border-blue-500'
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
                  formData?.travelList == item.people&&'shadow-lg border-blue-500'
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
          <Button onClick={OnGenerateTrip}>
            Create Trip
          </Button>
        </div>

      </div>

    </div>
  );
}

export default CreateTrip;
