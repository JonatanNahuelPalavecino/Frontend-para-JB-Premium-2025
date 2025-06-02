import React from 'react';
import './LegalPage.scss';

export const LegalPage = () => {
  return (
    <div className="legalPage">
      <p className="legalPage-title">Términos y Políticas de JB Premium</p>

      <section className="legalPage-box">
        <h2 className="legalPage-boxTitle">Política de Privacidad</h2>
        <p className="legalPage-boxDesc">
          En JB Premium protegemos la privacidad de nuestros usuarios. Recopilamos únicamente los datos necesarios
          para el funcionamiento de la plataforma, tales como nombre, apellido, email y contraseña al momento del
          registro. Estos datos no son compartidos con terceros y son utilizados exclusivamente para vincular las
          órdenes de compra con su respectivo comprador.
        </p>
      </section>

      <section className="legalPage-box">
        <h2 className="legalPage-boxTitle">Política de Cookies</h2>
        <p className="legalPage-boxDesc">
          Utilizamos cookies únicamente para gestionar la sesión de los usuarios mediante un token de autenticación
          generado por el servidor. Este token permite validar y mantener la sesión iniciada, o cerrarla si ha vencido.
          También registramos visitas a cada sección del sitio con fines estadísticos y de mejora del servicio. 
          Si el usuario está logueado, se registra con su ID; si no, con la dirección IP. Esta información no se comparte.
        </p>
      </section>

      <section className="legalPage-box">
        <h2 className="legalPage-boxTitle">Términos y Condiciones</h2>
        <p  className="legalPage-boxDesc">
          El uso de la plataforma implica la aceptación de nuestras políticas y términos. El registro en JB Premium es
          obligatorio para realizar compras. Los datos del usuario no pueden eliminarse ya que están vinculados a
          registros de órdenes de compra.
        </p>
      </section>

      <section className="legalPage-box">
        <h2 className="legalPage-boxTitle">Política de Envíos y Devoluciones</h2>
        <p className="legalPage-boxDesc">
          JB Premium realiza envíos a todo el país. No contamos con un punto de retiro. Todos los pedidos deben incluir
          dirección completa. Envíos a AMBA se entregan en 24 a 72 horas hábiles. Al interior, se envían por encomienda 
          a coordinar, con costos a cargo del comprador. Embalamos todos nuestros productos para evitar roturas. 
          Debido a que nuestros productos son vinos, que son consumibles y requieren almacenamiento adecuado, 
          <strong>no realizamos cambios ni devoluciones bajo ninguna circunstancia</strong>.
        </p>
      </section>

      <section className="legalPage-box">
        <h2 className="legalPage-boxTitle">Verificación de Edad</h2>
        <p className="legalPage-boxDesc">
          JB Premium comercializa productos con alcohol. Por ley, está prohibida su venta a menores de 18 años. 
          Solicitamos la fecha de nacimiento al momento del registro, y se restringe el acceso a la compra 
          si el usuario no cumple con este requisito.
        </p>
      </section>
    </div>
  );
};

