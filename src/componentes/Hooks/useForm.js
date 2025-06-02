import { useReducer } from "react";
import { formReducer } from "../utils/reducer/formReducer"

const useForm = (initialForm = {}) => {
  const [state, dispatch] = useReducer(formReducer ,initialForm);

  const onInputChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    if (files) {
      return dispatch({
        type: "upload image",
        payload: {key: name, file: files[0]}
      })
    }

    dispatch({
      type: "update",
      payload: {key: name, value: type === "checkbox" ? checked : value},
    });
  };

  const onResetForm = () => {
    dispatch({
        type: "reset",
        payload: initialForm
    })
  }

  const onResetFile = (name) => {
    dispatch({
      type: "upload image",
      payload: {key: name, file: ""}
    })
  }

  return {
    state,
    onInputChange,
    onResetForm,
    onResetFile
  };
};

export default useForm;
