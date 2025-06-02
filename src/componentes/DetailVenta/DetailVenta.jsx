import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsFillQuestionCircleFill } from "react-icons/bs"
import "./DetailVenta.scss"

export const DetailVenta = () => {

    useEffect(() => {
        document.title = "Detalle de Ventas - JB Premium - Vinos Españoles - Distribuidor Oficial"
    }, [])

    return (
        <>
            <main className="detail-venta">
                <h3 className='detail-venta-title'>VENTA MINORISTA, MAYORISTA Y COMERCIAL</h3>
                <hr/>
                <div className="detail-venta-container">
                    <div className="detail-venta-box">
                        <img className="detail-venta-img" src="https://res.cloudinary.com/dabgfr6qn/image/upload/v1745278173/flyer/obhxh0lkhvyj366sqtt9.jpg" alt="foto"/>
                    </div>
                    <div className="detail-venta-box">
                        <p className='detail-ventaTitle'>COMPRA MINORISTA</p>
                        <p className='detail-ventaDesc'>A traves de nuestra pagina podes adquirir nuestros productos. Clickeando en "VER MAS" en cada item, podras acceder a todas su caracteristicas, agregar al carrito y finalizar la compra. Una vez tengas tu N° de pedido, JB Premium se contactará al numero que registraste para coordinar el envío tal como explicamos en <Link className="detail-ventaLink" to="/detalle-envio">detalle de envíos<BsFillQuestionCircleFill className='icon-question'/></Link>.</p>
                        <p className='detail-ventaTitle'>COMPRA MAYORISTA</p>
                        <p className='detail-ventaDesc'>Para compras mayorista o Comercialas, ofrecemos precios diferenciales, promociones que podran acceder contactandose con nuestro equipo de Ventas, clickeando el boton de whatsapp dentro de esta pagina.</p>
                    </div>
                </div>
                <div className='detail-venta-btns'>
                    <Link to="/" className="detail-venta-btn">
                        VOLVER
                    </Link>
                </div>
            </main>
        </>
    )
}