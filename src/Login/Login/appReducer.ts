type InitialAppStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


const initialState: InitialAppStateType = {
    status: 'loading',
    error: null,
    isInitialized: false
};

export const appReducer = (state: InitialAppStateType = initialState, action: ActionsType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-LOADING': {
            return {...state, status: action.value}
        }
        case 'APP/SET-IS_INITIALIZED': {
            return {...state, isInitialized: action.value}
        }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
};


export const setAppLoading = (value: RequestStatusType) => ({
    type: 'APP/SET-LOADING',
    value
} as const);

export const setErrorAC = (error: string | null) => ( {
    type: 'APP/SET-ERROR',
    error
} as const );

export const setInitializedAC = (value: boolean) => ( {
    type: 'APP/SET-IS_INITIALIZED',
    value
} as const );

export type SetErrorActionType = ReturnType<typeof setErrorAC>

type ActionsType = ReturnType<typeof setAppLoading>
    | SetErrorActionType
    | ReturnType<typeof setInitializedAC>