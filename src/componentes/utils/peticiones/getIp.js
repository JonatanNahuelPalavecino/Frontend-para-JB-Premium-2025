export const getIp = async () => {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        return data.ip;
      } catch (error) {
        console.error("Error obteniendo la IP:", error);
        return null;
      }
}