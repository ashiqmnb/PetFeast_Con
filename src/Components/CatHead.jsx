import React from 'react'
import catFood from '../assets/cat_food.png'
import catTreat from '../assets/cat_treats1.png'
import catAll from '../assets/cat_all.png'
import { NavLink } from 'react-router-dom'

const CatHead = () => {
    return(
        <div className='text-center mt-10'>
        <div className='m-10 flex justify-center space-x-8'>
            <NavLink to={'/catsitem/'} >
                <div className='flex-col justify-between'>
                    <div className='flex justify-center rounded-full'>
                        <img style={{height:'95px'}} className='rounded-full' src={catAll} alt="toys" />
                    </div>
                    <span style={{color:'#052560'}} className='text-2xl font-semibold'>All</span>
                </div>
            </NavLink>

            <NavLink to={'/catsitem/food'} >
                <div className='flex-col justify-between'>
                    <div className='flex justify-center rounded-full'>
                        <img style={{height:'95px'}} className='rounded-full' src={catFood} alt="toys" />
                    </div>
                    <span style={{color:'#052560'}} className='text-2xl font-semibold'>Food</span>
                </div>
            </NavLink>

            <NavLink to={'/catsitem/treats'} >
                <div className='flex-col justify-between '>
                    <div className='flex justify-center rounded-full'>
                        <img className='rounded-full h-24 ' src={catTreat} alt="food" />
                    </div>
                    <span style={{color:'#052560'}} className='text-2xl font-semibold'>Treats</span>
                </div>
            </NavLink>
        </div>
    </div>
    )
}

export default CatHead