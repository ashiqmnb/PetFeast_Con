import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import { Routes, Route } from 'react-router-dom';
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
import UserDetails from './Admin/UserDetails';
import ProductDetails from './Admin/ProductDetails';
import ProductCategory from './Admin/ProductCategory';
import AddNewProduct from './Admin/AddNewProduct';

function App() {
  return (
    <div className='App'>
      {/* <Navbar/> */}
      
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Registration />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='orderConfirm' element={<OrderConfirm />} />

        <Route path='/dogsitem' element={<DogItems />}/>
        <Route path='/dogsitem/' element={<DogAll />}/>
        <Route path='/dogsitem/food' element={<DogFood />}/>
        <Route path='/dogsitem/bed' element={<DogBeds />}/>

        <Route path='/catsitem' element={<CatsItems />}/>
        <Route path='/catsitem/' element={<CatAll />}/>
        <Route path='/catsitem/food' element={<CatFood />}/>
        <Route path='/catsitem/treats' element={<CatTrats />}/>

        <Route path='/itemdetails/:id' element={<ItemDetails2 />} />

        {/* ____________________________________________________ */}

        <Route path='/adminhome' element={<AdminHome />} />
        <Route path='/userdetails/:id' element={<UserDetails />} />
        <Route path='/productdetails/:id' element={<ProductDetails />} />
        <Route path='/productcategory' element={<ProductCategory />} />
        <Route path='/addnewproduct' element={<AddNewProduct />} />
      </Routes>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
