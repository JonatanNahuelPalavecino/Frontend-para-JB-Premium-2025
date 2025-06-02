export const useConfigBtns = (contador, maximo, minimo, restar, sumar) => {

    const configRestar = {
        disabled: contador === minimo,
        onClick: restar
    }

    const configSumar = {
        disabled: contador === maximo,
        onClick: sumar
    }

    return {
        configRestar,
        configSumar
    }
}