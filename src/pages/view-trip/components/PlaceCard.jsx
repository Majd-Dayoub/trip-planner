import React from 'react'
import loadingImg from "/public/loading.jpg";
import { Link } from 'react-router-dom';

 const PlaceCard = ({place, tripData}) => {
  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${place.placeName+','+tripData?.userSelection?.location?.label}`} target='_blank'>
    
    
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
      <img className="w-[130px] h-[130px] rounded-xl" src={loadingImg}></img>
      <div>
        <h2 className='font-bold text-lg'>{place.placeName}</h2>
        <p className='text-sm text-gray-400'>{place.placeDetails}</p>
        <p className='font-normal text-md'>💰 {place.ticketPricing}</p>
      </div>
    </div>
    </Link>
  )
}

export default PlaceCard;
