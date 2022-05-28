import {registerInitialState} from "./registerInitialState";
import {IRegisterActions} from "./registerActions";

export const registerReducer = (state = registerInitialState, action: IRegisterActions) => {
    switch (action.type) {
        case "REGISTER/LOADING":
            return {...state, loading: action.isLoading}
        case "REGISTER/SUCCESS":
            return {...state, success: action.isSuccess}
        case "REGISTER/ERROR":
            return {...state, error: action.error}
        default:
            return state;
    }
};
