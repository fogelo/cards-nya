export interface IRegisterState {
    success: boolean
    error: string
    loading: boolean
}

export const registerInitialState: IRegisterState = {
    success: false,
    loading: false,
    error: ""
};
