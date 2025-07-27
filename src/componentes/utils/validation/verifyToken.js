
export const verifyToken = async (setUser) => {
  const url = import.meta.env.VITE_SERVER;

  try {
    const response = await fetch(`${url}/user/protected`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();
    
    if (data.estado === "success") {
      setUser(data.user[0]);
    } else {
      setUser({ auth: false });
    }
  } catch (error) {
    console.error("Error verificando el token:", error);
    setUser({ auth: false });
  }
};
