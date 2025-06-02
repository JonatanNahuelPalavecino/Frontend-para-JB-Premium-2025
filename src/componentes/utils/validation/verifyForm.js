const validadorForm = {
    nombre: 3,
    apellido: 3,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=(?:.*\d){3,})[a-zA-Z\d$!%*?&@#^+=._-]+$/,
    telefono: /^\d{7,15}$/,
    codigoPostal: /^\d{4,8}$/,
    mayorEdad: 18
}

export const verifyForm = (form, type = null) => {
    const error = {}

    const format = {
        nombre: form.nombre?.trim(),
        apellido: form.apellido?.trim(),
        email: form.email?.trim(),
        password: form.password?.trim(),
        telefono: form.telefono?.trim(),
        localidad: form.localidad?.trim(),
        codigoPostal: form.codigoPostal?.trim(),
        provincia: form.provincia?.trim(),
        direccion: form.direccion?.trim(),
        edad: parseInt(form.edad)
    }

    if (type === "register" || type === "checkout") {
        if (format.nombre?.length < validadorForm.nombre) {
            error["nombre"] = "El nombre debe tener al menos 3 caracteres"
        }

        if (format.apellido?.length < validadorForm.apellido) {
            error["apellido"] = "El apellido debe tener al menos 3 caracteres"
        }

        if (isNaN(format.edad) && type === "register") {
            error["edad"] = "Debes ingresar tu edad para registrarte"
        } else if (format.edad < validadorForm.mayorEdad && type === "register"){
            error["edad"] = "Debes ser mayor de edad para registrarte en nuestra página"
        }
    }

    if (type === "restablecer-password" || type === "auth" || type === "register" || type === "checkout") {
        if (!validadorForm.email.test(format.email)) {
            error["email"] = "Ingresa un e-mail válido"
        }
    }

    if (type === "cambiar-password") {
        if (!validadorForm.password.test(format.password)) {
            error["password"] = "La contraseña debe tener al menos 4 letras y 3 números"
        }
    }

    if (type === "checkout") {
        if (!validadorForm.telefono.test(format.telefono)) {
            error["telefono"] = "Ingresa un teléfono válido (solo números)"
        }

        if (!format.localidad) {
            error["localidad"] = "La localidad es obligatoria"
        }

        if (!validadorForm.codigoPostal.test(format.codigoPostal)) {
            error["codigoPostal"] = "Código postal inválido"
        }

        if (!format.provincia || format.provincia === "") {
            error["provincia"] = "La provincia es obligatoria"
        }

        if (!format.direccion) {
            error["direccion"] = "La dirección es obligatoria"
        }
    }

    if (Object.keys(error).length !== 0) {
        return {
            estado: "error",
            error: error
        }
    }

    switch (type) {
        case "auth":
            return {
                estado: "success",
                values: {
                    email: format.email,
                    password: format.password
                }
            }
        case "register":
            return {
                estado: "success",
                values: {
                    nombre: format.nombre,
                    apellido: format.apellido,
                    email: format.email,
                    password: format.password,
                    edad: format.edad
                }
            }
        case "cambiar-password":
            return {
                estado: "success",
                values: {
                    password: format.password,
                }
            }
        case "restablecer-password":
            return {
                estado: "success",
                values: {
                    email: format.email,
                }
            }
        case "checkout":
            return {
                estado: "success",
                values: {
                    nombre: format.nombre,
                    apellido: format.apellido,
                    telefono: format.telefono,
                    localidad: format.localidad,
                    codigoPostal: format.codigoPostal,
                    provincia: format.provincia,
                    email: format.email,
                    direccion: format.direccion,
                }
            }
        default:
            return {
                estado: "success",
                values: {}
            }
    }
}
