import React from 'react';
import Laptop from '../../assets/laptop.jpg';

const HomeAbout = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Laptop} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold '>RECYCLING TRACKING SYSTEM</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Efficiently Manage Your Recycling Process</h1>
          <p>
            With our Recycling Tracking System, you can effortlessly monitor and optimize your recycling efforts. Say goodbye to manual data collection and guesswork. Our system provides real-time data and actionable insights to help you make informed decisions and improve your recycling efficiency.
          </p>
          <br/>
          <p>
            Keep track of the materials being recycled, measure recycling rates, and identify areas for improvement. Whether you're an individual, business, or organization, our Recycling Tracking System is tailored to suit your needs and contribute to a greener, more sustainable future.
          </p>
          <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Get Started</button>
         
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
