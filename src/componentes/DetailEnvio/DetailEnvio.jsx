import { useEffect } from "react"
import { Link } from "react-router-dom"
import "./DetailEnvio.scss"

export const DetailEnvio = () => {


    useEffect(() => {
        document.title = "Detalle de Envíos - JB Premium - Vinos Españoles - Distribuidor Oficial"
    }, [])

    return (
        <main className="detail-envio">
            <h3 className='detail-envio-title'>DETALLE DE ENVÍO</h3>
            <hr/>
            <div className="detail-envio-container">
                <div className="detail-envio-box">
                    <p className="detail-envioTitle">¿Mi envío es gratuito?</p>
                    <p className="detail-envioDesc">Si la dirección de envío se encuentra dentro de la Capital Federal, y el total de tu compra es de AR$20.000 o más, tu envío será gratuito y te llegará entre 24/72hs de haber realizado tu pedido.</p>
                    <p className="detail-envioDesc">Si la dirección de envío es dentro del AMBA, la entrega tiene un costo que se te comunicará una vez recibido tu pedido. El costo del mismo se abonará al momento de la entrega de su compra.</p>
                    <p className="detail-envioDesc">Para envíos al interior despachamos por encomiendas (a coordinar) a cualquier punto de la Republica Argentina a cargo del comprador, y los tiempos de entrega dependen del lugar de destino. Para su seguimiento, JB Premium le enviará un N° de guía con el que podrá ver el status de su envío. Sus productos son despachados de manera segura y discreta.</p>
                </div>
                <div className="detail-envio-box">
                    <img className="detail-envio-img" src="https://res.cloudinary.com/dabgfr6qn/image/upload/v1745278174/flyer/m4yo6kpmndysxxardiwd.png" alt="mapa"/>
                </div>
            </div>
            <div className="detail-envio-btns">
                <Link to="/" className="detail-envio-btn">
                   VOLVER
                </Link>
            </div>
        </main>
    )
}