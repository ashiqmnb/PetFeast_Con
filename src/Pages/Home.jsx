import React,{useContext, useEffect, useState} from 'react'
import '../App.css'
import HomeMainView from '../Components/HomeMainView'
import ToLogin from '../Components/ToLogin'
import TopRatedProducts from '../Components/TopRatedProducts'
import ItemDetails2 from '../Components/ItemDetails2'
import Cart from '../Components/Cart'
import Registration from './Registration'
import Footer from '../Components/Footer'
import { MyContext }from '../Components/MyContext';
import ProfilePage from '../Components/ProfilePage'
import axios from 'axios'

const Home = () => {
  // const {userId, setUserId} = useContext(MyContext)
  const {userData, setUserData} = useContext(MyContext)
  const [userId, setUserId] = useState(localStorage.getItem('id'))



  return (
    <div>
        <HomeMainView />
        { userId ? <h1>{null}</h1> : <ToLogin />}
        <TopRatedProducts />
        {/* <Footer /> */}
    </div>
  )
}

export default Home
