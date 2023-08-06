import React from 'react'
import { Facebook, Instagram, Twitter, GitHub} from '@mui/icons-material'
const HomeFooter = () => {
  return (
    <div className='bg-black'>
    <div className='max-w-[1240px] mx-auto py-8 px-4 grid lg:grid-cols-1 gap-8 text-gray-300'>
    <div>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>RecyTrack</h1>
      <p className='py-4'>  RecyTrack is a smart recycling tracking system that empowers individuals and businesses
            to monitor their recycling efforts and make a positive impact on the environment. Join us
            on this eco-friendly journey and let's create a sustainable future together.
     </p>
      <div className='flex  md:w-[75%] my-3'>
          <Facebook size={30} className='mx-3' />
          <Instagram size={30} className='mx-3' />
          <Twitter size={30} className='mx-3' />
          <GitHub size={30} className='mx-3' />
      </div>
    </div>
    {/* <div className='lg:col-span-2 flex justify-between mt-6'>
  <div>
      <h6 className='font-medium text-gray-400'>Solutions</h6>
      <ul>
          <li className='py-2 text-sm'>Analytics</li>
          <li className='py-2 text-sm'>Marketing</li>
          <li className='py-2 text-sm'>Commerce</li>
          <li className='py-2 text-sm'>Insights</li>
      </ul>
  </div>
  <div>
      <h6 className='font-medium text-gray-400'>Support</h6>
      <ul>
          <li className='py-2 text-sm'>Pricing</li>
          <li className='py-2 text-sm'>Documentation</li>
          <li className='py-2 text-sm'>Guides</li>
          <li className='py-2 text-sm'>API Status</li>
      </ul>
  </div>
  <div>
      <h6 className='font-medium text-gray-400'>Company</h6>
      <ul>
          <li className='py-2 text-sm'>About</li>
          <li className='py-2 text-sm'>Blog</li>
          <li className='py-2 text-sm'>Jobs</li>
          <li className='py-2 text-sm'>Press</li>
          <li className='py-2 text-sm'>Careers</li>
      </ul>
  </div>
  <div>
      <h6 className='font-medium text-gray-400'>Legal</h6>
      <ul>
          <li className='py-2 text-sm'>Claim</li>
          <li className='py-2 text-sm'>Policy</li>
          <li className='py-2 text-sm'>Terms</li>
      </ul>
  </div>
    </div> */}
  </div>
  </div>
  )
}

export default HomeFooter