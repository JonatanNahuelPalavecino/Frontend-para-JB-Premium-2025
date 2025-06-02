import { getOrdersById } from "./getOrders";
import { getUsers } from "./getUsers";
import { getAllVisits } from "./postVisit";

export const getProductMostSell = async () => {
  try {
    const orders = await getOrdersById();
    const ordersAbonadas = orders?.filter(
      (order) => order?.estado === "approved"
    );
    const productosMasVendidos = [];

    ordersAbonadas.forEach((order) => {
      order?.items.forEach((item) => {
        const nombre = item.nombre;
        const cantidad = item.cantidad;

        //verificar si el producto existe en el array para agregar la cantidad
        if (productosMasVendidos[nombre]) {
          productosMasVendidos[nombre] += cantidad;
        } else {
          productosMasVendidos[nombre] = cantidad;
        }
      });
    });

    // console.log(productosMasVendidos);

    return Object.entries(productosMasVendidos).map(([nombre, cantidad]) => ({
      nombre,
      cantidad,
    })).sort((a, b) => b.cantidad - a.cantidad);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getLocalWithMostSell = async () => {
  try {
    const orders = await getOrdersById();
    const ordersAbonadas = orders?.filter(
      (order) => order?.estado === "approved"
    );
    const localidadConMasCompras = [];

    ordersAbonadas.forEach((order) => {
      const localidad = order.provincia;

      //verificar si la localidad existe en el array para agregar la cantidad
      if (localidadConMasCompras[localidad]) {
        localidadConMasCompras[localidad]++;
      } else {
        localidadConMasCompras[localidad] = 1;
      }
    });

    // console.log(localidadConMasCompras);

    return Object.entries(localidadConMasCompras).map(
      ([localidad, cantidad]) => ({ localidad, cantidad })
    ).sort((a, b) => b.cantidad - a.cantidad)
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAgeForUsers = async () => {
    try {
        const users = await getUsers()
        const totalUsers = []

        users?.users.forEach(user => {
            const edad = user.edad
            if (totalUsers[edad]) {
                totalUsers[edad] ++
            } else {
                totalUsers[edad] = 1
            }
        })

        return Object.entries(totalUsers).map(([edad, total]) => ({edad, total})).sort((a, b) => b.total - a.total)
    } catch (error) {
        console.log(error)
        return []
    }
}

export const getSeccionWithMoreVisit = async () => {
    try {
        const data = await getAllVisits()
        const seccionesConVisitas = []

        // console.log(data?.visits)

        data?.visits.forEach(visit => {
            const ruta = visit.ruta
            if (seccionesConVisitas[ruta]) {
                seccionesConVisitas[ruta] ++
            } else {
                seccionesConVisitas[ruta] = 1
            }
        })

        return Object.entries(seccionesConVisitas).map(([seccion, total]) => ({seccion, total})).sort((a, b) => b.total - a.total)
    } catch (error) {
        console.log(error)
        return []
    }
}