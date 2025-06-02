export const postRecoveredPass = async (form, type, setLoading, token) => {
  setLoading(true);
  const url = import.meta.env.VITE_SERVER;
  const endpoint =
    type === "restablecer-password" ? "recover-pass" : "change-pass";

  const body =
    type === "restablecer-password" ? { ...form } : { ...form, token };
    
  const options = {
    method: `${type === "restablecer-password" ? "POST" : "PATCH"}`,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${url}/user/${endpoint}`, options);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    setLoading(false);
  }
};
