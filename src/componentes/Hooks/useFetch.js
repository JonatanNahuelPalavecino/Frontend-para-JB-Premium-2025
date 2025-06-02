import { useState, useCallback, useContext } from "react";
import {Context} from "../Context/Context"

const useFetch = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const {loading, setLoading} = useContext(Context);

  const fetchData = useCallback(async (url, options = {}) => {
    setLoading(true);
    try {
      const response = await fetch(url, options);
      const dato = await response.json();
      setData(dato);
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        setError("Error de conexión con el servidor. Intente más tarde.");
      }
      console.error("Error en useFetch", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  return {
    data,
    error,
    loading,
    fetchData,
  };
};

export default useFetch;
