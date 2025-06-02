export const postLogOut = async (toast, setLoading) => {
  const url = import.meta.env.VITE_SERVER;
  setLoading(true);

  try {
    const response = await fetch(`${url}/user/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();

    if (data.estado === "error") {
      toast.warning(data.mensaje);
      return;
    }

    toast.success(data.mensaje);

    setTimeout(() => {
      window.location.reload();
      setLoading(false);
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};
