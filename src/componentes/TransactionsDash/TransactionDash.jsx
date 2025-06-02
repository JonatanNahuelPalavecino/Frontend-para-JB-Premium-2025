import { useEffect, useState } from "react";
import { getTransactions } from "../utils/peticiones/getTransactions";
import "./TransactionDash.scss";
import { Transaction } from "../Transaction/Transaction";
import useForm from "../Hooks/useForm";
import { estadoDePago } from "../utils/datos/pay";

export const TransactionDash = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [filters, setFilters] = useState({});
  const [uniqueState, setUniqueState] = useState([]);

  const initialState = {
    orderId: "",
    estado: "",
    transaccionId: ""
  }

  const { state, onInputChange, onResetForm } = useForm(initialState);
  const { orderId, estado, transaccionId } = state;

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const res = await getTransactions();
      setAllTransactions(res);

      const unique = Array.from(
        new Set(res.map((tx) => tx.estado))
      ).map((estado) => ({ estado }));
      setUniqueState(unique);

      applyFilters(res, filters);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyFilters = (transactionsList, filters) => {
    let filtered = transactionsList;

    // Agrupar por orden y obtener la última transacción
    const lastTxByOrder = Object.values(
      filtered.reduce((acc, tx) => {
        if (!acc[tx.orderId] || new Date(tx.createdAt) > new Date(acc[tx.orderId].createdAt)) {
          acc[tx.orderId] = tx;
        }
        return acc;
      }, {})
    );

    // Si el filtro es por orderId, filtramos todas las transacciones de esa orden
    if (filters.orderId) {
      filtered = transactionsList.filter(tx =>
        tx.orderId.toLowerCase().includes(filters.orderId.toLowerCase())
      );
    } else {
      // Filtrado por estado o transaccionId usando solo la última transacción
      if (filters.estado) {
        filtered = lastTxByOrder.filter(tx => tx.estado === filters.estado);
      }

      if (filters.transaccionId) {
        filtered = lastTxByOrder.filter(tx => tx.transaccionId == filters.transaccionId);
      }

      // Obtener las transacciones completas de las órdenes filtradas
      const orderIds = new Set(filtered.map(tx => tx.orderId));
      filtered = transactionsList.filter(tx => orderIds.has(tx.orderId));
    }

    setTransactions(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFilters = {};
    for (const key in state) {
      const value = state[key].trim();

      if (key === "estado" && value !== "") {
        newFilters[key] = value;
      } else if (key === "transaccionId" && value !== "") {
        newFilters[key] = parseInt(value);
      } else if (key === "orderId" && value !== "") {
        newFilters[key] = value;
      }
    }

    setFilters(newFilters);
    applyFilters(allTransactions, newFilters);
  };

  const deleteFilters = () => {
    onResetForm();
    setFilters({});
    setTransactions(allTransactions);
  };

  const OrderWithTransactions = transactions.reduce((acc, tx) => {
    acc[tx.orderId] = acc[tx.orderId] || [];
    acc[tx.orderId].push(tx);
    return acc;
  }, {});

  return (
    <section className="transactionDash">
      <h2 className="transactionDash-title">Total de Transacciones</h2>
      <div className="transactionDash-content">
        <div className="transactionDash-box">
          <span className="transactionDash-boxTitulo">Total de Transacciones</span>
          <span className="transactionDash-boxNumero">{allTransactions.length}</span>
        </div>
        <div className="transactionDash-box transactionDash-boxOtherColor">
          <span className="transactionDash-boxTitulo">Total de Transacciones Acreditadas</span>
          <span className="transactionDash-boxNumero">
            {allTransactions.filter((tx) => tx.estado === "approved").length}
          </span>
        </div>
        <div className="transactionDash-box">
          <span className="transactionDash-boxTitulo">Total de Transacciones Rechazadas</span>
          <span className="transactionDash-boxNumero">
            {allTransactions.filter((tx) => tx.estado === "rejected").length}
          </span>
        </div>
        <div className="transactionDash-box transactionDash-boxOtherColor">
          <span className="transactionDash-boxTitulo">Total de Transacciones Pendientes de Pago</span>
          <span className="transactionDash-boxNumero">
            {allTransactions.filter(
              (tx) => tx.estado === "in_process" || tx.estado === "pending"
            ).length}
          </span>
        </div>
        <div className="transactionDash-box">
          <span className="transactionDash-boxTitulo">Total de Ingresos Brutos</span>
          <span className="transactionDash-boxNumero">
            ${allTransactions
              .reduce((acc, t) => (t.pagoRecibido > 0 ? acc + t.pagoBruto : acc), 0)
              .toLocaleString("es-ES")}
          </span>
        </div>
        <div className="transactionDash-box transactionDash-boxOtherColor">
          <span className="transactionDash-boxTitulo">Total de Ingresos Netos</span>
          <span className="transactionDash-boxNumero">
            {allTransactions
              .reduce((acc, t) => acc + t.pagoRecibido, 0)
              .toLocaleString("es-ES")}
          </span>
        </div>
      </div>

      <form className="transactionDash-form" onSubmit={handleSubmit}>
        <div className="transactionDash-formBox">
          <label className="transactionDash-label" htmlFor="orderId">N° de orden</label>
          <input
            className="transactionDash-input"
            type="text"
            name="orderId"
            id="orderId"
            value={orderId}
            onChange={onInputChange}
          />
        </div>

        <div className="transactionDash-formBox">
          <label className="transactionDash-label" htmlFor="estado">Estado</label>
          <select name="estado" id="estado" className="transactionDash-input" value={estado} onChange={onInputChange}>
            <option className="transactionDash-label" value="">Elige una opción</option>
            {
              uniqueState.map((tx, index) => (
                <option className="transactionDash-label" key={index} value={tx.estado}>
                  {estadoDePago(tx.estado)}
                </option>
              ))
            }
          </select>
        </div>

        <div className="transactionDash-formBox">
          <label className="transactionDash-label" htmlFor="transaccionId">ID Transacción</label>
          <input
            className="transactionDash-input"
            type="number"
            name="transaccionId"
            id="transaccionId"
            value={transaccionId}
            onChange={onInputChange}
          />
        </div>
        <div className="transactionDash-formBtns">
          <button className="transactionDash-btn" type="submit">Buscar</button>
          <button className="transactionDash-btn transactionDash-btnOtherColor" type="button" onClick={deleteFilters}>Borrar Filtros</button>
        </div>
      </form>

      <ul className="transactionDash-container">
        <Transaction
          isLoading={isLoading}
          error={error}
          transactions={OrderWithTransactions}
        />
      </ul>
    </section>
  );
};
