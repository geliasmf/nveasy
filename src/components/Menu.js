import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Menu = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Nveasy
        </Link>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <FaBars />
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          {userData && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/new" className="nav-link">
                  Nueva inversión
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/view" className="nav-link">
                  Consultar inversiones
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/configuration" className="nav-link">
                  Configuración
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link">
                  Bienvenido, {userData.username}
                </span>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link">
                  Cerrar sesión
                </Link>
              </li>
            </ul>
          )}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Iniciar sesion
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
