import {SetIsAuthActionType} from "../../../s-1-main/m-2-bll/app-reducer";


const initStateApp = {

}

export const appReducer = (state: InitStateTypeApp = initStateApp, action: PacksAction): InitStateTypeApp => {
    switch (action.type) {
        case "app/SET_IS_AUTH":
            return {...state}

        default:
            return state

    }
}

// ACTION CREATOR
export const setIsAuthAC = (isAuthAction: boolean) => ({type: "app/SET_IS_AUTH", isAuthAction} as const)


// THUNKa


// TYPES
// export type ChangeIsLoading = ReturnType<typeof changeIsLoadingAC>


export type InitStateTypeApp = typeof initStateApp

export type PacksAction =
    SetIsAuthActionType
    // | ChangeIsLoading
    // | SetAppErrorActionType
