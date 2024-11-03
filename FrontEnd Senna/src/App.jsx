import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Navbar } from './components/NavBar/Navbar';
import { Deposit } from './pages/Deposit/Deposit';
import { Transfer } from './pages/Transfer/Trasnfer';
import { Favorite } from './pages/Favorite/Favorite';
import { HomePageAdmin } from './pages/HomePage/HomePageAdmin';
import { Product } from './pages/Product/Product';
import { History } from './pages/History/History';
import { ProductAdmin } from './pages/Product/ProductAdmin';
import { UpdateProfileForm } from './pages/User/User';
import { UsersHistory } from './pages/UsersHistory/usersHistory';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='Register' element={<Register />} />
        <Route path='Transfer' element={<Transfer />} />
        <Route path='Deposit' element={<Deposit />} />
        <Route path='Home' element={<HomePage />} />
        <Route path='Favorite' element={<Favorite />} />
        <Route path='HomeAdmin' element={<HomePageAdmin />} />
        <Route path='History' element={<History />} />
        <Route path='Product' element={<Product />} />
        <Route path='ProductAdmin' element={<ProductAdmin />} />
        <Route path='UpdateProfile' element={<UpdateProfileForm />} />
        <Route path='AllUsers' element={<UsersHistory/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
