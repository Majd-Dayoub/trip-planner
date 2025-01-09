import React from 'react'
import loadingImg from "/public/loading.jpg";
import { Link } from 'react-router-dom';
function Hotels({tripData}) {
  return (
    <div>
      <h2 className='font-bold text-2xl mt-10'>Hotel Recommendations</h2>
      {/* Hotel Card Group */}
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-2'>  
        {/* Hotel Card */}
        {tripData?.tripData?.hotels?.map((hotel, index) => (
          <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName+','+tripData?.userSelection?.location?.label}`} target='_blank'>
          
          <div className='hover:scale-105 transition-all cursor-pointer' key={index}>
            
            <img src={loadingImg} className='rounded-xl'/>
            <div className='my-2 flex flex-col gap-2'>
              <h2 className='font-medium'>{hotel.hotelName}</h2>
              <h2 className='text-sm font-medium'>⭐ {hotel.rating}</h2>
              <h2 className='text-sm font-medium'>💵 {hotel.price}</h2>
              <h2 className='text-xs font-medium'>📌 {hotel.hotelAddress}</h2>
              
            </div>
            
          </div>
          </Link>
          
        ))}

      </div>
    </div>
  )
}

export default Hotels