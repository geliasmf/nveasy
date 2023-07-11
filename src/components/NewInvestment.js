import React, { useState, useEffect } from "react";
import axios from "axios";
import BootstrapToggle from "react-bootstrap-toggle";
import "react-bootstrap-toggle/dist/bootstrap2-toggle.css";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import config from "../AppConfig.json";
import "../css/NewInvestment.css";

const NewInvestment = () => {
  const [company, setCompany] = useState("");
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [maturityDate, setMaturityDate] = useState("");
  const [monthlyReturn, setMonthlyReturn] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito

  const navigate = useNavigate();

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  const handleMaturityDateChange = (event) => {
    setMaturityDate(event.target.value);
  };

  const handleMonthlyReturnChange = () => {
    setMonthlyReturn(!monthlyReturn);
  };

  const handleSubmit = async (event) => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios.defaults.transformRequest = [(data) => qs.stringify(data)];
    
    event.preventDefault();

    try {
      const response = await axios.post(
        config.apiUrl + "/investments/create",
        {
          company: company,
          amount: amount,
          term: term,
          maturityDate: maturityDate,
          monthlyReturn: monthlyReturn,
        }
      );

      console.log(response.data);

      // Redireccionar a la página de inicio después de un inicio de sesión exitoso
      setSuccessMessage("¡El formulario se envió con éxito!"); // Establecer el mensaje de éxito
      setTimeout(resetForm, 3000);
      //navigate("/new");
    } catch (error) {
      // Ocurrió un error durante el inicio de sesión
      console.error(error);
    }
  };

  const resetForm = () => {
    setCompany("");
    setAmount("");
    setTerm("");
    setMaturityDate("");
    setMonthlyReturn(false);
    setSuccessMessage("");
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        resetForm();
        navigate("/view");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [successMessage, navigate]);

  const handleCancel = () => {
    // Lógica para cancelar el formulario
  };

  return (
    <div>
      <h1>New Investment</h1>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="company">Empresa</label>
          <select
            className="form-control"
            id="company"
            value={company}
            onChange={handleCompanyChange}
          >
            <option value="">Seleccione una opción</option>
            <option value="Supertasas">Supertasas</option>
            <option value="Kubo">Kubo</option>
            <option value="Finsus">Finsus</option>
            <option value="Klar">Klar</option>
            <option value="Cetes">Cetes</option>
            <option value="Finamex">Finamex</option>
            <option value="Nu">Nu</option>
            <option value="Mercado Pago">Mercado Pago</option>
          </select>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="amount">Monto</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="term">Plazo</label>
          <input
            type="number"
            className="form-control"
            id="term"
            value={term}
            onChange={handleTermChange}
          />
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="fecha-rendimiento">Fecha de Rendimiento</label>
              <input
                type="date"
                className="form-control"
                id="fecha-rendimiento"
                value={maturityDate}
                onChange={handleMaturityDateChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label>Rendimiento</label>
              <div className="form-check">
                <BootstrapToggle
                  id="rendimiento-mensual"
                  onstyle="primary"
                  offstyle="secondary"
                  size="xs"
                  active={monthlyReturn}
                  onClick={handleMonthlyReturnChange}
                  on="Mensual"
                  off="Anual"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewInvestment;
