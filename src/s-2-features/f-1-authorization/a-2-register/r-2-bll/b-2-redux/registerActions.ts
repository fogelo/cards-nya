export const setErrorRegister = (error: string) => ({type:  "REGISTER/ERROR", error} as const);
export const setSuccessRegister = (isSuccess: boolean) => ({type: "REGISTER/SUCCESS", isSuccess} as const)
export const setLoadingRegister = (isLoading: boolean) => ({type: "REGISTER/LOADING", isLoading} as const)

// types
export type IRegisterActions =
    ReturnType<typeof setErrorRegister>
    | ReturnType<typeof setSuccessRegister>
    | ReturnType<typeof setLoadingRegister>