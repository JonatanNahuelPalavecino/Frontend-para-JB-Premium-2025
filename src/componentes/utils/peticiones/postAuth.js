export const postAuth = async (form, type, setLoading) => {
  setLoading(true);
  const url = import.meta.env.VITE_SERVER;
  const endpoint = type === "auth" ? "login" : "register";

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ ...form }),
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
