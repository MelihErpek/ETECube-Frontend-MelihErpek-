import React from "react";
import Router from "./Router/Router"
import Header from "./Components/Header"
import { AuthContextProvider } from "./Context/AuthContext";
import './App.css';

function App() {
  
  return (
    <div >
      <AuthContextProvider>
        <Header />
        <Router />
      </AuthContextProvider>
    </div>
  );
}

export default App;
