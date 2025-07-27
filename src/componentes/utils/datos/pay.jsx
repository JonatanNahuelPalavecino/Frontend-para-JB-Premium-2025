export const estadoDePago = (tipoDePago) => {
  switch (tipoDePago) {
    case "approved":
      return "Pago Aprobado ✅";
    case "rejected":
      return "Pago Rechazado ❌";
    case "in_process":
      return "Pago Pendiente ⌛";
    case "pending":
      return "Pago No Realizado ❌";
    default:
      return "Estado de Pago Desconocido"
  }
};

export const obtenerDescripcion = (codigoDetalle) => {
  switch (codigoDetalle) {
    case "accredited":
      return "Pago acreditado";
    case "pending_contingency":
      return "Pago pendiente / En proceso";
    case "cc_rejected_bad_filled_card_number":
      return "El numero de la tarjeta de credito/debito es incorrecto.";
    case "cc_rejected_call_for_authorize":
      return "La tarjeta fue rechazada. Debe llamar al banco emisor de su tarjeta para autorizar la compra.";
    case "cc_rejected_card_disabled":
      return "La tarjeta ha sido deshabilitada.";
    case "cc_rejected_duplicated_payment":
      return "Se ha intentado procesar un pago con un monto y una divisa ya utilizados en una transacción anterior.";
    case "cc_rejected_high_risk":
      return "La transacción fue rechazada por ser considerada de alto riesgo.";
    case "cc_rejected_insufficient_amount":
      return "Fondos insuficientes en la tarjeta.";
    case "cc_rejected_invalid_installments":
      return "La cantidad de cuotas seleccionada no es válida.";
    case "cc_rejected_max_attempts":
      return "Se superó el límite de intentos permitidos con la tarjeta.";
    case "cc_rejected_bad_filled_security_code":
      return "El código de seguridad de la tarjeta es inválido.";
    case "cc_rejected_other_reason":
      return "Otro motivo de rechazo no especificado.";
    case "Acreditado":
      return "Pago acreditado";
    case "No Acreditado":
      return "Pago No Acreditado";
    default:
      return "Motivo de rechazo no identificado.";
  }
};

export const obtenerTarjeta = (codigoTarjeta) => {
  switch (codigoTarjeta) {
    case "visa":
      return "Visa";
    case "master":
      return "Master Card";
    case "amex":
      return "American Express";
    default:
      return "Tarjeta no identificada.";
  }
};

export const obtenerTipoDeTarjeta = (tipoTarjeta) => {
  switch (tipoTarjeta) {
    case "credit_card":
      return "Tarjeta de crédito";
    case "debit_card":
      return "Tarjeta de débito";
    default:
      return "Tipo de Tarjeta no identificada.";
  }
};
