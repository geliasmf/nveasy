import { useState, useEffect } from "react";
import axios from "axios";
import BootstrapToggle from "react-bootstrap-toggle";
import "react-bootstrap-toggle/dist/bootstrap2-toggle.css";
import qs from "qs";
import "../css/NewInvestment.css";
import config from "../AppConfig.json";
import { Modal } from "react-bootstrap";

const EditInvestment = ({ investment, onClose, onUpdate }) => {
  const [company, setCompany] = useState("");
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [maturityDate, setMaturityDate] = useState("");
  const [monthlyReturn, setMonthlyReturn] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito

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
      await axios.put(config.apiUrl + "/investments/update", {
        id: investment.id,
        company: company,
        amount: amount,
        term: term,
        maturityDate: maturityDate,
        monthlyReturn: monthlyReturn,
      });
      setSuccessMessage("¡El formulario se envió con éxito!"); // Establecer el mensaje de éxito
      setTimeout(onClose, 3000);
      setTimeout(onUpdate, 4000);
    } catch (error) {
      // Ocurrió un error durante el inicio de sesión
      console.error(error);
    }
  };

  useEffect(() => {
    setCompany(investment.company);
    setAmount(investment.amount);
    setTerm(investment.term);
    setMaturityDate(investment.maturityDate);
    setMonthlyReturn(investment.monthlyReturn);
  }, [investment]);

  const handleCancel = () => {
    // Lógica para cancelar el formulario
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Inversión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
};

export default EditInvestment;
