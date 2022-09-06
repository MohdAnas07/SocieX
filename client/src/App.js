import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register'
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Login />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to='/' /> : <Register />} />
        <Route path='/profile/:username' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}





export default App;
