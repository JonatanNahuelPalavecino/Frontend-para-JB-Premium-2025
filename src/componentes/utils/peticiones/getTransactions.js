export const getTransactions = async (filters = {}) => {
    const url = import.meta.env.VITE_SERVER

    try {
        const response = await fetch(`${url}/transactions/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({filters})
        })
        const data = await response.json()

        return data.transactions
    } catch (error) {
        console.error(error)
        return []
    }
}