import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BarChart, CartesianAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar} from 'recharts';

const UserChart = () => {

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
              fontSize: '15px'
            }}>
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

	const [users, setUsers] = useState([]);


    useEffect(()=>{
        axios.get("https://localhost:7109/api/User/GetUsers",
          {
            headers:{
              Authorization:  `Bearer ${localStorage.getItem("token")}`
            }
          })
          .then((res)=>{
            // console.log("user chaert res", res.data.data);
            setUsers(res.data.data)
            // console.log(users)
          })
          .catch((err)=>{
            console.log("user chaert res", err)
          })

    },[])


    const data = [
      {
        "name": `Oct (${7})`,
        "users": 5
      },
      {
        "name": `Nov (${8})`,
        "users": 7
      },
      {
        "name": `Dec (${users.length - 15})`,
        "users": users.length - 15
      }
  ]

  return (
    <>
        <BarChart width={300} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis className='font-semibold text-lg text-black ' dataKey="name" />
            <YAxis className='text-black text-sm font-semibold' />
            <Tooltip content={<CustomTooltip />} />
            <Legend items/>
            <Bar dataKey="users" fill="#052560" />
        </BarChart>
        <h1 className='text-black text-lg font-semibold'>Total Users : {users.length}</h1>
    </>
  )
}

export default UserChart