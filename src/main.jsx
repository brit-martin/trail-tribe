import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Faq from './components/Faq.jsx';
import Contact from './components/Contact.jsx';
import About from './components/About.jsx';
import Newsfeed from './components/Newsfeed.jsx';
import Explore from './components/Explore.jsx';
// 1: Router Imports:
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

// 2: Create Router Object
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/faq' element={<Faq />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/about' element={<About />} />
      <Route path='/newsfeed' element={<Newsfeed />} />
      <Route path='/explore' element={<Explore />} />
    </Route>
  )
);

// 3: set the Route Provider
ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
