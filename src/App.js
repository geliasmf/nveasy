import "./App.css";
import { React, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Menu from "./components/Menu";
import NewInvestment from "./components/NewInvestment";
import ViewInvestment from "./components/ViewInvestment";
import LandingPage from "./components/LandingPage";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [userData, setUserData] = useState(null); // Estado para guardar los datos del usuario
  const handleLogin = (data) => {
    setUserData(data);
  };
  return (
    <Router>
      <div className="container">
        <Menu userData={userData} />
        <Routes>
          <Route path="/" element={<LandingPage onLogin={handleLogin}/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/new" element={<NewInvestment />} />
          <Route path="/view" element={<ViewInvestment />} />
        </Routes>
        <Outlet />
      </div>
    </Router>
  );
};

export default App;
