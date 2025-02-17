import React from 'react'

import HotelCard from './HotelCard';
function Hotels({tripData}) {
  return (
    <div>
      <h2 className='font-bold text-2xl mt-10'>Hotel Recommendations</h2>
      {/* Hotel Card Group */}
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-2'>  
        {/* Hotel Card */}
        {tripData?.tripData?.hotels?.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel} />
          
        ))}

      </div>
    </div>
  )
}

export default Hotels