import React from "react";
import Login from "./Login";

const LandingPage = ({ onLogin }) => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="jumbotron">
            <h1 className="display-6">¡Bienvenido a Nveasy!</h1>
            <p className="lead">
              La plataforma para gestionar tus inversiones de manera fácil y
              segura.
            </p>
            <hr className="my-4" />
            <p>
              Regístrate o inicia sesión para comenzar a administrar tus
              inversiones.
            </p>
            <div className="d-flex">
              <Login onLogin={onLogin} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img
              src="https://impulsapopular.com/wp-content/uploads/2019/06/4493-5-inversiones-que-debes-hacer-en-tu-negocio.jpg"
              className="card-img-top"
              alt="Investment"
            />
            <div className="card-body">
              <h5 className="card-title">Inversión Segura</h5>
              <p className="card-text">
                Descubre las mejores oportunidades de inversión con altos
                rendimientos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
