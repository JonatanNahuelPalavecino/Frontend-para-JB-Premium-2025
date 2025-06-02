import { Link } from "react-router-dom"
import { useEffect } from "react";

export const PayPending = () => {

    useEffect(() => {
        document.title = "Pago Pendiente - JB Premium - Vinos Españoles - Distribuidor Oficial"
    })

    return (
        <main className="pay">
                <img className='pay-img' alt="pago-pendiente" src='https://res.cloudinary.com/dabgfr6qn/image/upload/v1744660589/flyer/zm0vsoqvpxltrnmvbyun.jpg'/>
                <div className="pay-container pay-pending">
                    <p className="pay-title">COMPRA FINALIZADA</p>
                    <div className="pay-box">
                        <p className="pay-desc">Mercado Pago nos informa que tu pago está pendiente de acreditación. Pero no te preocupes! En breve te llegará un mail con los datos y el estado de tu compra. Recuerda revisar tu SPAM.</p>
                        <p className="pay-desc">Luego, nos comunicaremos con vos para verificar el pago y coordinar la entrega.</p>
                        <p className="pay-desc">Muchas gracias por elegirnos!</p>
                        <div className="pay-btns">
                        <Link className="pay-btn" to="/">VOLVER</Link>
                        <Link className="pay-btn pay-btnOthercolor" to="/mis-ordenes">Mis ordenes</Link>
                        </div>
                    </div>
                </div>
        </main>
    )
}
