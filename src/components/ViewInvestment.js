import { React, useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import BootstrapToggle from "react-bootstrap-toggle";
import paginationFactory from "react-bootstrap-table2-paginator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import ConfirmationDialog from "../components/utils/ConfirmationDialog"; // Ruta al componente ConfirmationDialog
import EditInvestment from "./EditInvestment";
import config from "../AppConfig.json";
const ViewInvestment = () => {
  const [data, setData] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        config.apiUrl+"/investments/findAll"
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.apiUrl}/investments/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowConfirmation = (id) => {
    setSelectedItemId(id);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setSelectedItemId(null);
    setShowConfirmation(false);
  };

  const handleAcceptConfirmation = () => {
    if (selectedItemId) {
      handleDelete(selectedItemId);
    }
    handleCloseConfirmation();
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedItem(null);
    setShowEditModal(false);
  };

  const handleUpdateView = () => {
    fetchData();
  };

  const currencyFormatter = (cell) => {
    const formatter = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    });
    return formatter.format(cell);
  };

  const maturityDateFormatter = (cell) => {
    const date = new Date(cell);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("es-MX", options);
  };

  const actionFormatter = (cell, row) => {
    return (
      <div>
        <button className="btn btn-primary" onClick={() => handleEdit(row)}>
          Editar
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleShowConfirmation(row.id)}
        >
          Eliminar
        </button>
      </div>
    );
  };

  const renderToggle = (cell, row) => {
    const handleToggleChange = () => {
      // Manejar el cambio de estado del toggle aquí si es necesario
    };

    return (
      <BootstrapToggle
        id={`toggle-${row.id}`}
        onstyle="primary"
        offstyle="secondary"
        size="xs"
        active={cell}
        onChange={handleToggleChange}
        on="Mensual"
        off="Anual"
      />
    );
  };

  const columns = [
    {
      dataField: "maturityDate",
      text: "Fecha rendimiento",
      sort: true,
      sortCaret: (order) => {
        if (!order)
          return <FontAwesomeIcon icon={faSort} className="text-secondary" />;
        if (order === "asc")
          return <FontAwesomeIcon icon={faSort} className="text-primary" />;
        if (order === "desc")
          return (
            <FontAwesomeIcon
              icon={faSort}
              className="text-primary rotate-180"
            />
          );
        return null;
      },
      formatter: maturityDateFormatter,
    },
    {
      dataField: "company",
      text: "Empresa",
      sort: true,
      sortCaret: (order) => {
        if (!order)
          return <FontAwesomeIcon icon={faSort} className="text-secondary" />;
        if (order === "asc")
          return <FontAwesomeIcon icon={faSort} className="text-primary" />;
        if (order === "desc")
          return (
            <FontAwesomeIcon
              icon={faSort}
              className="text-primary rotate-180"
            />
          );
        return null;
      },
    },
    {
      dataField: "amount",
      text: "Monto",
      sort: true,
      sortCaret: (order) => {
        if (!order)
          return <FontAwesomeIcon icon={faSort} className="text-secondary" />;
        if (order === "asc")
          return <FontAwesomeIcon icon={faSort} className="text-primary" />;
        if (order === "desc")
          return (
            <FontAwesomeIcon
              icon={faSort}
              className="text-primary rotate-180"
            />
          );
        return null;
      },
      formatter: currencyFormatter,
    },
    {
      dataField: "monthlyReturn",
      text: "Rendimiento",
      formatter: renderToggle,
    },
    {
      dataField: "id",
      text: "Acciones",
      formatter: actionFormatter,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
        pagination={paginationFactory()}
      />
      <ConfirmationDialog
        show={showConfirmation}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar este elemento?"
        onConfirm={handleAcceptConfirmation}
        onCancel={handleCloseConfirmation}
      />
      {showEditModal && (
        <EditInvestment investment={selectedItem} onClose={handleCloseEditModal } onUpdate={handleUpdateView}  />
      )}
    </div>
  );
};

export default ViewInvestment;
