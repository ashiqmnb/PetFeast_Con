import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BarChart, CartesianAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar} from 'recharts';

const ProductChart = () => {

    const CustomTooltip = ({ active, payload, label }) => {
        console.log(payload);
        
        if (active && payload && payload.length) {
          return (
            <div style={{
              backgroundColor: 'white', 
              border: '1px solid #052560',
              borderRadius:'10px',
              fontWeight:'500',
              padding: '5px',
              fontSize: '15px'  // Adjust the font size to reduce the tooltip size
            }}>
              {/* <p className='text-black'>{"cat"}</p> */}
              {payload.map((data, index) => (
                <div>
                    <p key={index} style={{color: data.fill}}>{`${data.name}: ${data.value}`}</p>
                </div>
              ))}
            </div>
          );
        }
      
        return null;
      };

    // const [ items, setItems ] = useState([]);
    const [ dogFood,setDogFood] = useState(0)
    const [ dogBed,setDogBed] = useState(0)
    const [ catFood,setCatFood] = useState(0)
    const [ catTreat,setCatTreat] = useState(0)

    useEffect(()=>{
        axios.get("http://localhost:5000/items")
            .then((res)=> {
                // setItems(res.data);
                const items = res.data;
                console.log('from product chart');
                setDogFood(items.filter((item)=> item.catogory === 'dog-food').length)
                setDogBed(items.filter((item)=> item.catogory === 'dog-beds').length)
                setCatFood(items.filter((item)=> item.catogory === 'cat-food').length)
                setCatTreat(items.filter((item)=> item.catogory === 'cat-treat').length)
            })
    },[])


    const data = [
        {
          "name": `Cat (${catFood+catTreat})`,
          "food": catFood,
          "bed or treat": catTreat
        },
        {
          "name": `Dog (${dogBed+dogFood})`,
          "food": dogFood,
          "bed or treat": dogBed
        }
      ]

      const tooltipStyle = {
        backgroundColor: 'white',
        padding: '5px',
        fontSize: '10px'
      }


  return (
    <>
        <BarChart width={300} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis className='font-semibold text-lg text-black ' dataKey="name" />
            <YAxis className='text-black text-sm font-semibold'/>
            <Tooltip content={<CustomTooltip />} />
            <Legend items/>
            <Bar dataKey="food" fill="blue" />
            <Bar dataKey="bed or treat" fill="green" />
        </BarChart>
        <h1 className='text-black text-lg font-semibold'>Total Products : {dogBed+dogFood+catFood+catTreat}</h1>
    </>
  )
}

export default ProductChart