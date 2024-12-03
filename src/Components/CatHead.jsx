import React from 'react'
import catFood from '../assets/cat_food.png'
import catTreat from '../assets/cat_treats1.png'
import catAll from '../assets/cat_all.png'
import { NavLink } from 'react-router-dom'

const CatHead = () => {
    return(
        <div className='text-center'>
        <div className='flex justify-center my-8 space-x-5'>

            <NavLink to={'/catsitem/food'} >
                <span style={{color:'#052560'}} 
                    className='text-2xl font-semibold bg-blue-100 px-5 py-1 rounded-md border border-black shadow-md hover:bg-blue-200 active:bg-blue-300'>
                        Food
                </span>
            </NavLink>

            <NavLink to={'/catsitem/treats'} >
                <span style={{color:'#052560'}} 
                    className='text-2xl font-semibold bg-blue-100 px-5 py-1 rounded-md border border-black shadow-md hover:bg-blue-200'>
                        Treats
                </span>
            </NavLink>
        </div>
    </div>
    )
}

export default CatHead