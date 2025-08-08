import { useEffect, useState } from "react";
import { getTransactions } from "../utils/peticiones/getTransactions";
import "./TransactionDash.scss";
import { Transaction } from "../Transaction/Transaction";
import useForm from "../Hooks/useForm";
import { estadoDePago } from "../utils/datos/pay";
import { SkeletonComponent } from "../SkeletonComponent/SkeletonComponent";

export const TransactionDash = () => {
  const [filters, setFilters] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [uniqueState, setUniqueState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initialState = {
    orderId: "",
    estado: "",
    transaccionId: "",
  };

  const { state, onInputChange, onResetForm } = useForm(initialState);
  const { orderId, estado, transaccionId } = state;

  const fetchTransactions = async (
    filters = {},
    setTx,
    setUniqueState = undefined
  ) => {
    setIsLoading(true);
    try {
      const res = await getTransactions(filters);
      setTx(res);

      if (setUniqueState) {
        const estados = [...new Set(res.map((tx) => tx.estado))];
        setUniqueState(estados);
      }
    } catch (err) {
      setError(err.message || "Error al traer transacciones");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title =
      "Gestión de Transacciones - JB Premium - Vinos Españoles - Distribuidor Oficial";

    fetchTransactions(filters, setTransactions, setUniqueState);
    fetchTransactions({}, setAllTransactions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const groupedByOrder = transactions.reduce((acc, tx) => {
    if (!acc[tx.orderId]) acc[tx.orderId] = [];
    acc[tx.orderId].push(tx);
    return acc;
  }, {});

  const handleSubmit = (e) => {
    e.preventDefault();

    setFilters(state);
  };

  const deleteFilters = () => {
    onResetForm();
    setFilters({});
  };

  return (
    <section className="transactionDash">
      <h2 className="transactionDash-title">Total de Transacciones</h2>
      <div className="transactionDash-content">
        <div className="transactionDash-box">
          <span className="transactionDash-boxTitulo">
            Total de Transacciones
          </span>
          {isLoading ? (
            <SkeletonComponent width={"100%"} height={"38px"} />
          ) : (
            <span className="transactionDash-boxNumero">
              {allTransactions.length}
            </span>
          )}
        </div>
        <div className="transactionDash-box transactionDash-boxOtherColor">
          <span className="transactionDash-boxTitulo">
            Total de Transacciones Acreditadas
          </span>
          {isLoading ? (
            <SkeletonComponent width={"100%"} height={"38px"} />
          ) : (
            <span className="transactionDash-boxNumero">
              {allTransactions.filter((tx) => tx.estado === "approved").length}
            </span>
          )}
        </div>
        <div className="transactionDash-box">
          <span className="transactionDash-boxTitulo">
            Total de Transacciones Rechazadas
          </span>
          {isLoading ? (
            <SkeletonComponent width={"100%"} height={"38px"} />
          ) : (
            <span className="transactionDash-boxNumero">
              {allTransactions.filter((tx) => tx.estado === "rejected").length}
            </span>
          )}
        </div>
        <div className="transactionDash-box transactionDash-boxOtherColor">
          <span className="transactionDash-boxTitulo">
            Total de Transacciones Pendientes de Pago
          </span>
          {isLoading ? (
            <SkeletonComponent width={"100%"} height={"38px"} />
          ) : (
            <span className="transactionDash-boxNumero">
              {
                allTransactions.filter(
                  (tx) => tx.estado === "in_process" || tx.estado === "pending"
                ).length
              }
            </span>
          )}
        </div>
        <div className="transactionDash-box">
          <span className="transactionDash-boxTitulo">
            Total de Ingresos Brutos en Pesos
          </span>
          {isLoading ? (
            <SkeletonComponent width={"100%"} height={"38px"} />
          ) : (
            <span className="transactionDash-boxNumero">
              AR${" "}
              {allTransactions
                .reduce(
                  (acc, t) =>
                    t.pagoRecibido > 0 && t.moneda === "ARS"
                      ? acc + t.pagoBruto
                      : acc,
                  0
                )
                .toLocaleString("es-ES")}
            </span>
          )}
        </div>
        <div className="transactionDash-box transactionDash-boxOtherColor">
          <span className="transactionDash-boxTitulo">
            Total de Ingresos Netos en Pesos
          </span>
          {isLoading ? (
            <SkeletonComponent width={"100%"} height={"38px"} />
          ) : (
            <span className="transactionDash-boxNumero">
              AR${" "}
              {allTransactions
                .reduce(
                  (acc, t) => (t.moneda === "ARS" ? acc + t.pagoRecibido : acc),
                  0
                )
                .toLocaleString("es-ES")}
            </span>
          )}
        </div>
        <div className="transactionDash-box">
          <span className="transactionDash-boxTitulo">
            Total de Ingresos Brutos en Dolares
          </span>
          {isLoading ? (
            <SkeletonComponent width={"100%"} height={"38px"} />
          ) : (
            <span className="transactionDash-boxNumero">
              U$S{" "}
              {allTransactions
                .reduce(
                  (acc, t) =>
                    t.pagoRecibido > 0 && t.moneda === "USD"
                      ? acc + t.pagoBruto
                      : acc,
                  0
                )
                .toLocaleString("es-ES")}
            </span>
          )}
        </div>
        <div className="transactionDash-box transactionDash-boxOtherColor">
          <span className="transactionDash-boxTitulo">
            Total de Ingresos Netos en Dolares
          </span>
          {isLoading ? (
            <SkeletonComponent width={"100%"} height={"38px"} />
          ) : (
            <span className="transactionDash-boxNumero">
              U$S{" "}
              {allTransactions
                .reduce(
                  (acc, t) => (t.moneda === "USD" ? acc + t.pagoRecibido : acc),
                  0
                )
                .toLocaleString("es-ES")}
            </span>
          )}
        </div>
      </div>

      <form className="transactionDash-form" onSubmit={handleSubmit}>
        <div className="transactionDash-formBox">
          <label className="transactionDash-label" htmlFor="orderId">
            N° de orden
          </label>
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
          <label className="transactionDash-label" htmlFor="estado">
            Estado
          </label>
          <select
            name="estado"
            id="estado"
            className="transactionDash-input"
            value={estado}
            onChange={onInputChange}
          >
            <option className="transactionDash-label" value="">
              Elige una opción
            </option>
            {uniqueState.map((estado) => (
              <option key={estado} value={estado}>
                {estadoDePago(estado)}
              </option>
            ))}
          </select>
        </div>

        <div className="transactionDash-formBox">
          <label className="transactionDash-label" htmlFor="transaccionId">
            ID Transacción
          </label>
          <input
            className="transactionDash-input"
            type="text"
            name="transaccionId"
            id="transaccionId"
            value={transaccionId}
            onChange={onInputChange}
          />
        </div>
        <div className="transactionDash-formBtns">
          <button className="transactionDash-btn" type="submit">
            Buscar
          </button>
          <button
            className="transactionDash-btn transactionDash-btnOtherColor"
            type="button"
            onClick={deleteFilters}
          >
            Borrar Filtros
          </button>
        </div>
      </form>

      <ul className="transactionDash-container">
        <Transaction
          isLoading={isLoading}
          error={error}
          transactions={groupedByOrder}
        />
      </ul>
    </section>
  );
};
