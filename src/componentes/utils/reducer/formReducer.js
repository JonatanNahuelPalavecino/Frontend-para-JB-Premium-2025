export const formReducer = (initialState, action) => {
    switch(action.type) {
        case "update":
            return {
                ...initialState,
                [action.payload.key]: action.payload.value
            }
        case "upload image":
            return {
                ...initialState,
                [action.payload.key]: action.payload.file
            }
        case "reset":
            return action.payload
        default:
            return initialState
    }
}