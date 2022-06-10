import {AddNewPackType, CardPackType, EditPackType, PackParamsType, PacksAPI} from "./PacksAPI";
import {Dispatch} from "redux";
import {
    ChangeIsLoading,
    changeIsLoadingAC,
    setAppErrorAC,
    SetAppErrorActionType
} from "../../../s-1-main/m-2-bll/app-reducer";

import axios from "axios";
import {AppThunkType, IAppStore} from "../../../s-1-main/m-2-bll/store";
import {setIsLoggedInAC, SetIsLoggedInType} from "../../f-1-authorization/a-1-sign-in/s-2-bll/b-2-redux/signIn-reducer";


const initState = {
    cardPacks: [] as CardPackType[],
    minCardsCount: 0,
    maxCardsCount: 10,
    cardPacksTotalCount: 0,
    params: {
        packName: '',
        min: 0,
        max: 0,
        sortPacks: '',
        page: 1,
        pageCount: 10,
        user_id: ''
    } as PackParamsType,
}

export const packsReducer = (state: PacksInitStateType = initState, action: PacksAllActions): PacksInitStateType => {
    switch (action.type) {
        case "packs/SET_PACKS_DATA": return {...state, cardPacks: action.cardPacks}
        case "packs/SET_SEARCH_PARAM": return {...state, params: {...state.params, packName: action.packName}}
        case "packs/RANGE_SET_CARDS_PACKS_COUNT":return {...state, params: {...state.params, min: action.min, max:action.max} }


        default:
            return {...state}
    }
}

// ACTION CREATORS
//TODO исправить get на set по всему проекту
export const getAllPacksAC = (cardPacks: CardPackType[]) => {
    return {type: 'packs/SET_PACKS_DATA', cardPacks} as const
}
export const setCardsPacksCountFromRangeAC = (numbers: Array<number>) =>  // min and max cardsPacks
    ({type: 'packs/RANGE_SET_CARDS_PACKS_COUNT', min: numbers[0], max: numbers[1]} as const)


export const ParamAC_SetSearch = (packName: string) => {
    return {type: 'packs/SET_SEARCH_PARAM', packName} as const
}
export const ParamAC_SetMin = (min: number) => {
    return {type: 'packs/SET_MIN_PARAM', min: 0
    } as const
}
export const ParamAC_SetMax = (max: number) => {
    return {type: 'packs/SET_MAX_PARAM'} as const
}
export const ParamAC_SetSortPacks = () => {
    return {type: 'packs/SET_SORT_PARAM'} as const
}
export const ParamAC_SetPage = (pageNum: number) => {
    return {type: 'packs/SET_PAGE_PARAM'} as const
}
export const ParamAC_SetPageCount = (pageCount: number) => {
    return {type: 'packs/SET_PAGE_COUNT_PARAM'} as const
}
export const ParamAC_SetUserId = (userId: string) => {
    return {type: 'packs/SET_USERID_PARAM'} as const
}


// THUNKS
export const GetAllPacksThunk = () => async (dispatch: Dispatch<PacksAllActions>, getState: () => IAppStore) => {
    dispatch(changeIsLoadingAC(true))
    const params = getState().packs.params
    PacksAPI.getPacksData(params)
        .then((res) => {
            dispatch(getAllPacksAC(res.data.cardPacks))
            console.log("You are get packs data successfully")
        })
        .catch((error) => {
            const data = error?.response?.data;
            // При запросе колод если сервер сказал что куки нет, то разлогиниваемся в редаксе.
            // if (error.error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\') {
            //     dispatch(setIsLoggedInAC(false))
            // }
            if (axios.isAxiosError(error) && data) {
                dispatch(setAppErrorAC(data.error || "Some error occurred"));
            } else (dispatch(setAppErrorAC(error.message + ". More details in the console")))
            console.log({...error});
        })
        .finally(() => {
            dispatch(changeIsLoadingAC(false))
        })
}
export const GetMyPacksThunk = () => async (dispatch: Dispatch<PacksAllActions>, getState: () => IAppStore) => {
    dispatch(changeIsLoadingAC(true))
    const params = getState().packs.params
    const userId = getState().profile.userData._id
    PacksAPI.getPacksData({...params, user_id: userId})
        .then((res) => {
            dispatch(getAllPacksAC(res.data.cardPacks))
            console.log("You are get packs data successfully")
        })
        .catch((error) => {
            const data = error?.response?.data;
            // При запросе колод если сервер сказал что куки нет, то разлогиниваемся в редаксе.
            if (error.error === `you are not authorized /ᐠ-ꞈ-ᐟ\\`) {
                dispatch(setIsLoggedInAC(false))
            }
            if (axios.isAxiosError(error) && data) {
                dispatch(setAppErrorAC(data.error || "Some error occurred"));
            } else (dispatch(setAppErrorAC(error.message + ". More details in the console")))
            console.log({...error});
        })
        .finally(() => {
            dispatch(changeIsLoadingAC(false))
        })
}


export const AddNewPackThunk = (params: AddNewPackType) => async (dispatch: AppThunkType) => {
    dispatch(changeIsLoadingAC(true))
    PacksAPI.postNewPack(params)
        .then((res) => {
            if (res.data.newCardsPack) {
                console.log("You are added new pack successfully")
            }
            dispatch(GetAllPacksThunk())
        })
        .catch((error) => {
            const data = error?.response?.data;
            if (axios.isAxiosError(error) && data) {
                dispatch(setAppErrorAC(data.error || "Some error occurred"));
            } else (dispatch(setAppErrorAC(error.message + ". More details in the console")))
            console.log({...error});
        })
        .finally(() => {
            dispatch(changeIsLoadingAC(false))
        })
}
export const DeletePackThunk = (_id: string) => async (dispatch: AppThunkType) => {
    dispatch(changeIsLoadingAC(true))
    PacksAPI.deletePack(_id)
        .then((res) => {
            if (res.data.deletedCardsPack) {
                // сюда добавить success SnackBar надо потом.
                console.log("Pack deleted successfully")
            }
            dispatch(GetAllPacksThunk())
        })
        .catch((error) => {
            const data = error?.response?.data;
            if (axios.isAxiosError(error) && data) {
                dispatch(setAppErrorAC(data.error || "Some error occurred"));
            } else (dispatch(setAppErrorAC(error.message + ". More details in the console")))
            console.log({...error});
        })
        .finally(() => {
            dispatch(changeIsLoadingAC(false))
        })
}
export const EditPackThunk = (editPack: EditPackType) => async (dispatch: AppThunkType) => {
    dispatch(changeIsLoadingAC(true))
    PacksAPI.editPackName(editPack)
        .then((res) => {
            if (res.data.newCardsPack) {
                console.log("You are added new pack successfully")
            }
            dispatch(GetAllPacksThunk())
        })
        .catch((error) => {
            const data = error?.response?.data;
            if (axios.isAxiosError(error) && data) {
                dispatch(setAppErrorAC(data.error || 'Some error occurred'));
            } else (dispatch(setAppErrorAC(error.message + '. More details in the console')))
            console.log({...error});
        })
        .finally(() => {
            dispatch(changeIsLoadingAC(false))
        })
}

// TYPES
export type PacksInitStateType = typeof initState

export type SetAllPacksDataACType = ReturnType<typeof getAllPacksAC>
export type setCardPacksCurrentPageType = ReturnType<typeof setCardsPacksCountFromRangeAC>
export type ParamAC_SetSearchType = ReturnType<typeof ParamAC_SetSearch>
export type ParamAC_SetMinType = ReturnType<typeof ParamAC_SetMin>
export type ParamAC_SetMaxType = ReturnType<typeof ParamAC_SetMax>
export type ParamAC_SetSortPacksType = ReturnType<typeof ParamAC_SetSortPacks>
export type ParamAC_SetPageType = ReturnType<typeof ParamAC_SetPage>
export type ParamAC_SetPageCountType = ReturnType<typeof ParamAC_SetPageCount>
export type ParamAC_SetUserIdType = ReturnType<typeof ParamAC_SetUserId>


export type PacksAllActions =
    SetAllPacksDataACType
    | ChangeIsLoading
    | SetAppErrorActionType
    | SetIsLoggedInType
|setCardPacksCurrentPageType
    | ParamAC_SetSearchType
    | ParamAC_SetMinType
    | ParamAC_SetMaxType
    | ParamAC_SetSortPacksType
    | ParamAC_SetPageType
    | ParamAC_SetPageCountType
    | ParamAC_SetUserIdType



