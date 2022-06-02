
import {Dispatch} from 'redux';
import {setAppLoading, setErrorAC, SetErrorActionType, setInitializedAC} from "./Login/appReducer";
import {authApi, LoginDataType} from "./Login/authApi";






export type LoginState = {
    error: string
    redirectToLogin: boolean
};

export const loginInitialState: LoginState = {
    error: '',
    redirectToLogin: false,
};

export const loginReducer = (
    state: LoginState = loginInitialState,
    action: LoginActions
) => {
    switch (action.type) {
        case 'LOGIN/ERROR': {
            return {...state, error: action.error};
        }
        case 'LOGIN/REDIRECT-TO-LOGIN': {
            return {...state, redirectToLogin: action.value};
        }
        default: {
            return state;
        }
    }
};

export const loginError = (error: string) => ({type: 'LOGIN/ERROR', error} as const);
export const redirectToLogin = (value: boolean) => ({type: 'LOGIN/REDIRECT-TO-LOGIN', value} as const);


export type LoginActions =
    | ReturnType<typeof loginError>
    | ReturnType<typeof redirectToLogin>
    | SetErrorActionType


export const signIn = (payload: LoginDataType) => (dispatch: Dispatch) => {
    dispatch(setAppLoading("loading"))
    authApi
        .login(payload)
        .then((res) => {
            // dispatch(loginSuccess());

            dispatch(loginError(''));
            dispatch(setErrorAC(null))
        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error
                : err.message + ', more details in the console';
            console.log('Error: ', {...err});
            dispatch(loginError(error));
            // dispatch(setErrorAC(error))
        })
        .finally(() => dispatch(setAppLoading("succeeded")))
};


export const checkAuthMe = () => (dispatch: Dispatch) => {
    dispatch(setAppLoading("loading"))
    authApi.me()
        .then((res) => {
            //dispatch(setAppLoading(false))
            dispatch(setInitializedAC(true));
            dispatch(redirectToLogin(false))
            dispatch(setErrorAC(null))
        })
        .catch((err) => {
            console.log(err.response.data.error)
            dispatch(redirectToLogin(true))
        })
        .finally(() => dispatch(setAppLoading("idle")))
}


export const logOut = () => (dispatch: Dispatch) => {
    dispatch(setAppLoading("loading"))
    authApi
        .logOut()
        .then((res) => {
            dispatch(setInitializedAC(false))

           //  dispatch(setSortPacksValueAC(""))
        })
        .catch((err) => {
            const error = err.response
                ? err.response.data.error
                : err.message + ', more details in the console';
            console.log('Error: ', {...err});
            dispatch(loginError(error));
            dispatch(setErrorAC(error))
        })
        .finally(() => dispatch(setAppLoading("idle")))
};

