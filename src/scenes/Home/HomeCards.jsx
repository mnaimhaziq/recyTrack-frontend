import React from 'react'
import Single from '../../assets/single.png'
import Double from '../../assets/double.png'
import Triple from '../../assets/triple.png'
import { AutoGraph, ConnectWithoutContact, MyLocation } from '@mui/icons-material'

const RecyclingTrackingFeatures = () => {
  return (
    <div className='w-full pb-[10rem] px-4 bg-white'>
      <h2 className='text-2xl font-bold text-center my-[5rem] uppercase'>Highlighted Features</h2>

      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
        <div className='w-full shadow-xl flex flex-col p-5 my-4 rounded-lg hover:scale-105 duration-300'>
          <h2 className='text-2xl font-bold text-center py-8'>Track Your Progress</h2>
          <AutoGraph className='w-20 mx-auto ' sx={{fontSize: '5rem'}}/>
          {/* <img className='w-20 mx-auto  bg-white' src={Single} alt="/" /> */}
          <div className='text-center font-medium'>
            <p className='py-2 border-b mx-8 mt-8'>Real-time Progress Tracking</p>
            <p className='py-2 border-b mx-8'>Personalized Recycling Insights</p>
            <p className='py-2 border-b mx-8'>Monitor Your Green Impact</p>
          </div>
        
        </div>
        <div className='w-full shadow-xl bg-gray-100 flex flex-col p-5 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
          <h2 className='text-2xl font-bold text-center py-8'>Find Nearest Location</h2>
          <MyLocation className='w-20 mx-auto ' sx={{fontSize: '5rem'}}/>
                    <div className='text-center font-medium'>
            <p className='py-2 border-b mx-8 mt-8'>Locate Recycling Centers</p>
            <p className='py-2 border-b mx-8'>View Waste Collection Points</p>
            <p className='py-2 border-b mx-8'>Geolocate Nearby Recycling Centers</p>
          </div>
          </div>
        <div className='w-full shadow-xl flex flex-col p-5 my-4 rounded-lg hover:scale-105 duration-300'>
          <h2 className='text-2xl font-bold text-center py-8'>Share to Social Media</h2>
          <ConnectWithoutContact className='w-20 mx-auto ' sx={{fontSize: '5rem'}}/>
             <div className='text-center font-medium'>
            <p className='py-2 border-b mx-8 mt-8'>Celebrate Recycling Milestones</p>
            <p className='py-2 border-b mx-8'>Spread Environmental Awareness</p>
            <p className='py-2 border-b mx-8'>Inspire Friends to Recycle</p>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default RecyclingTrackingFeatures
