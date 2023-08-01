import { React, useState, useEffect } from "react";
import axios from "axios";
import { useTable, useSortBy, usePagination } from "react-table";
//import BootstrapTable from "react-bootstrap-table-next";
import BootstrapToggle from "react-bootstrap-toggle";
//import paginationFactory from "react-bootstrap-table2-paginator";
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

  /*const actionFormatter = (cell, row) => {
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
  */

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

  const columns = React.useMemo(
    () => [
      {
        Header: "Fecha rendimiento",
        accessor: "maturityDate",
        sortType: "datetime",
        Cell: ({ value }) => maturityDateFormatter(value),
      },
      {
        Header: "Empresa",
        accessor: "company",
      },
      {
        Header: "Monto",
        accessor: "amount",
        sortType: "alphanumeric",
        Cell: ({ value }) => currencyFormatter(value),
      },
      {
        Header: "Rendimiento",
        accessor: "monthlyReturn",
        Cell: ({ value }) => renderToggle(value),
      },
      {
        Header: "Acciones",
        accessor: "id",
        Cell: ({ row }) => (
          <div>
            <button
              className="btn btn-primary"
              onClick={() => handleEdit(row.original)}
            >
              Editar
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleShowConfirmation(row.original.id)}
            >
              Eliminar
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    fetchData();
  }, []);

  /*
  
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
};*/
return (
  <div>
    <table {...getTableProps()} className="table table-striped">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className="sortable-header"
              >
                {column.render("Header")}
                <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <FontAwesomeIcon
                        icon={faSort}
                        className="text-primary rotate-180"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSort}
                        className="text-primary"
                      />
                    )
                  ) : (
                    <FontAwesomeIcon
                      icon={faSort}
                      className="text-secondary"
                    />
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    <div className="pagination">
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {"<<"}
      </button>
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {"<"}
      </button>
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        {">"}
      </button>
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {">>"}
      </button>
      <span>
        Página{" "}
        <strong>
          {pageIndex + 1} de {pageOptions.length}
        </strong>{" "}
      </span>
      <span>
        | Ir a la página:{" "}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value
              ? Number(e.target.value) - 1
              : 0;
            gotoPage(page);
          }}
        />
      </span>{" "}
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Mostrar {pageSize}
          </option>
        ))}
      </select>
    </div>
    <ConfirmationDialog
      show={showConfirmation}
      title="Confirmar Eliminación"
      message="¿Estás seguro de que deseas eliminar este elemento?"
      onConfirm={handleAcceptConfirmation}
      onCancel={handleCloseConfirmation}
    />
    {showEditModal && (
      <EditInvestment
        investment={selectedItem}
        onClose={handleCloseEditModal}
        onUpdate={handleUpdateView}
      />
    )}
  </div>
);
};

export default ViewInvestment;
