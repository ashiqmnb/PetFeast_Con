import React from 'react'
import dogBed from '../assets/dog_bedNew.png'
import dogFood from '../assets/dog_foodNew.png'
import dogAll from '../assets/dog_all.png'
import { NavLink } from 'react-router-dom'

const DogHead = () => {
    return(
        <div className='text-center'>
        <div className='flex justify-center my-8 space-x-8'>
            {/* <NavLink to={'/dogsitem/'}>
                <span style={{color:'#052560'}} 
                    className='text-2xl font-semibold bg-blue-100 px-5 py-1 rounded-md border border-black shadow-md hover:bg-blue-200'>
                        All
                </span>
            </NavLink> */}

            <NavLink to={'/dogsitem/food'}>
                    <span style={{color:'#052560'}} 
                        className='text-2xl font-semibold bg-blue-100 px-5 py-1 rounded-md border border-black shadow-md hover:bg-blue-200'>
                            Food
                    </span>
            </NavLink>

            <NavLink to={'/dogsitem/bed'}>
                    <span style={{color:'#052560'}} 
                        className='text-2xl font-semibold bg-blue-100 px-5 py-1 rounded-md border border-black shadow-md hover:bg-blue-200'>
                            Bed
                    </span>
            </NavLink>
        </div>
    </div>
    )
}

export default DogHead