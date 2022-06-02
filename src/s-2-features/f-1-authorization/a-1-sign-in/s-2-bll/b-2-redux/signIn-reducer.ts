import {Dispatch} from "redux";
import {
    ChangeIsLoading,
    changeIsLoadingAC,
    setAppErrorAC,
    SetAppErrorActionType
} from "../../../../../s-1-main/m-2-bll/app-reducer";
import {SignInAPI} from "../../s-3-dal/SignInAPI";
import axios from "axios";
import {setUserDataAC, SetUserDataType} from "../../../../f-3-profile/p-2-bll/b-2-redux/profile-reducer";


const initStateIsLoggedIn = {
    isLoggedIn: false
}

export const signInReducer = (state: InitStateTypeLogin = initStateIsLoggedIn, action: LoginReducerAction): InitStateTypeLogin => {
    switch (action.type) {
        case "login/SET_IS_LOGGED_IN":
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

//ACTION CREATOR
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: "login/SET_IS_LOGGED_IN", isLoggedIn} as const)


// THUNKa
export const LoginThunk = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch<LoginReducerAction>) => {
    dispatch(changeIsLoadingAC(true))
    SignInAPI.login({email, password, rememberMe})
        .then(res => {
            if (res.data._id) {
                dispatch(setUserDataAC(res.data))
                dispatch(setIsLoggedInAC(true))
                console.log('Logged in successfully!')
            }
        })
        .catch((error) => {
            const data = error?.response?.data;
            if (axios.isAxiosError(error) && data) {
                dispatch(setAppErrorAC(data.error || 'Some error occurred'));
            } else (dispatch(setAppErrorAC(error.message + '. More details in the console')))
            console.log({...error});
        })
        .finally(()=> {
            dispatch(changeIsLoadingAC(false))
        })
}

export const LogOutThunk = () => async (dispatch: Dispatch<LoginReducerAction>) => {
    dispatch(changeIsLoadingAC(true))
    SignInAPI.logout()
        .then(res => {
            if (res.data.info) {
                // тут будет диспачится SIGNIn LOG IN
                dispatch(setIsLoggedInAC(false))
            }
        })
        .catch((error) => {
            const data = error?.response?.data;
            if (axios.isAxiosError(error) && data) {
                dispatch(setAppErrorAC(data.error || 'Some error occurred'));
            } else (dispatch(setAppErrorAC(error.message + '. More details in the console')))
            console.log({...error});
        })
        .finally(()=> {
            dispatch(changeIsLoadingAC(false))
        })
}

//TYPES
export type SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>

export type InitStateTypeLogin = typeof initStateIsLoggedIn

export type LoginReducerAction =
    SetIsLoggedInType
    | ChangeIsLoading
    | SetAppErrorActionType
    | SetUserDataType