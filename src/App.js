import './App.css';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import { Routes, Route, useLocation } from 'react-router-dom';
import DogItems from './Pages/DogItems';
import CatsItems from './Pages/CatsItems';
import DogFood from './Components/DogFood';
import DogBeds from './Components/DogBeds';
import DogAll from './Components/DogAll';
import CatAll from './Components/CatAll';
import CatFood from './Components/CatFood';
import CatTrats from './Components/CatTreats';
import Registration from './Pages/Registration';
import LoginPage from './Pages/Login';
import ItemDetails2 from './Components/ItemDetails2';
import ProfilePage from './Components/ProfilePage';
import Cart from './Components/Cart';
import Payment from './Pages/Payment';
import OrderConfirm from './Pages/OrderConfirm';
import Footer from './Components/Footer';
import AdminHome from './Admin/AdminHome';
import SideBar from './Admin/SideBar';
import Categories from './Admin/Categories';
import AddNewProduct from './Admin/AddNewProduct';
import ProductDetails from './Admin/ProductDetails';
import UserDetails from './Admin/UserDetails';
import Dashboard from './Admin/Dashboard';


function App() {

  const location = useLocation()
  const sholudHidden = location.pathname.startsWith("/admin")

  return (
    <div className='App'>
      {!sholudHidden&&<Navbar/>}
      
      <Routes>

        {/* User */}

        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Registration />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='orderConfirm' element={<OrderConfirm />} />
        <Route path='/itemdetails/:id' element={<ItemDetails2 />} />

        <Route path='/dogsitem' element={<DogItems />}/>
        <Route path='/dogsitem/' element={<DogAll />}/>
        <Route path='/dogsitem/food' element={<DogFood />}/>
        <Route path='/dogsitem/bed' element={<DogBeds />}/>

        <Route path='/catsitem' element={<CatsItems />}/>
        <Route path='/catsitem/' element={<CatAll />}/>
        <Route path='/catsitem/food' element={<CatFood />}/>
        <Route path='/catsitem/treats' element={<CatTrats />}/>



        <Route path='/admin/home' element={<AdminHome />} />
        <Route path='/admin/categories' element={<Categories />} />
        <Route path='/admin/addnewproduct' element={<AddNewProduct />} />
        <Route path='/admin/productdetails/:id' element={<ProductDetails />} />
        <Route path='/admin/userdetails/:id' element={<UserDetails />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />



      </Routes>

      {!sholudHidden&&<Footer/>}
    </div>
  );
}

export default App;
