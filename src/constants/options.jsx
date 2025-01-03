import {
  faUser,
  faUserGroup,
  faPeopleGroup,
  faDollarSign,
  faMoneyBillWave,
  faGem,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Traveller Options
export const SelectTravelsList = [
  {
    id: 1,
    title: "Solo",
    description: "Perfect for solo travelers seeking new adventures.",
    icon: <FontAwesomeIcon icon={faUser} />, // FontAwesome icon for a single person
    people: "1",
  },
  {
    id: 2,
    title: "Couple",
    description: "Ideal for couples looking for romantic getaways.",
    icon: <FontAwesomeIcon icon={faUserGroup} />, // FontAwesome icon for a couple
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    description: "Designed for family style vacations.",
    icon: <FontAwesomeIcon icon={faPeopleGroup} />, // FontAwesome icon for a group of people
    people: "3 to 5 people",
  },
];

// Budget Options
export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    description: "Affordable trips for budget-conscious travelers.",
    icon: <FontAwesomeIcon icon={faDollarSign} />, // FontAwesome icon for a single dollar sign
  },
  {
    id: 2,
    title: "Moderate",
    description: "Balanced travel experiences without breaking the bank.",
    icon: <FontAwesomeIcon icon={faMoneyBillWave} />, // FontAwesome icon for a wave of money
  },
  {
    id: 3,
    title: "Expensive",
    description: "Luxurious trips for those seeking premium experiences.",
    icon: <FontAwesomeIcon icon={faGem} />, // FontAwesome icon for a gem
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location: {location}, for {duration} days for {travelList} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days with each day plan with best time to visit in JSON format.";
