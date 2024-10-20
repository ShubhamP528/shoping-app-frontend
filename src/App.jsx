import React, { useEffect } from "react";
import Navbar from "./Components/NavBar";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { retrieveAuth } from "./features/auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveAuth());
  }, []);

  return (
    <>
      <div className="mb-20">
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
