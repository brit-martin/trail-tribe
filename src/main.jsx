import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/About.jsx";
import Newsfeed from "./components/Newsfeed.jsx";
import Explore from "./components/Explore.jsx";
import { ThemeProvider } from "@mui/material/styles";
import themes from "./components/Theme.jsx";
import EditInfo from "./components/EditInfo.jsx";

// 1: Router Imports:
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Redux 1: import redux & store
import { Provider } from "react-redux";
import configureStore from "./redux/store.js";

// 2: Create Router Object
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/newsfeed" element={<Newsfeed />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/edit-info" element={<EditInfo/>} />
    </Route>
  )
);



// 3: set the Route Provider
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={configureStore}>
      <ThemeProvider theme={themes}>
      <RouterProvider router={router} />
  </ThemeProvider>
    </Provider>
);
