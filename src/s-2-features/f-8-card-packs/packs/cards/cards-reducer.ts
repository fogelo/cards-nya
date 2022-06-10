import {
    CardsAPI,
    CardsParamsType,
    CardType, SendNewCardType
} from "./CardsAPI";
import {Dispatch} from "redux";
import {
    ChangeIsLoading,
    changeIsLoadingAC,
    setAppErrorAC,
    SetAppErrorActionType
} from "../../../../s-1-main/m-2-bll/app-reducer";

import axios from "axios";
import {AppThunkType, IAppStore} from "../../../../s-1-main/m-2-bll/store";
import {
    setIsLoggedInAC,
    SetIsLoggedInType
} from "../../../f-1-authorization/a-1-sign-in/s-2-bll/b-2-redux/signIn-reducer";


const initState = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packUserId: '',
    params: {
        min: 0,
        max: 0,
        sortCards: 0,
        page: 1,
        pageCount:10,
        cardAnswer:'',
        cardQuestion:'',
        cardsPack_id:''
    } as CardsParamsType
}

export const cardsReducer = (state: CardsInitStateType = initState, action: CardsAllActions): CardsInitStateType => {
    switch (action.type) {
        // case "packs/SET_PACKS_DATA": return {...state, cardPacks: action.cardPacks}
        // case "packs/SET_SEARCH_PARAM": return {...state, params: {...state.params, packName: action.packName}}
        case "cards/SET_CARDS_DATA":
            return {...state, cards: action.cards}
        case "cards/SET_PACK_USERID":
            return {...state, packUserId: action.packUserId}
        case "cards/SET_PACK_ID":
            return {...state, params: {...state.params, cardsPack_id: action.packId }}
        default:
            return state
    }
}

// ACTION CREATORS
const getAllCardsAC = (cards: CardType[]) => {
    return {type: 'cards/SET_CARDS_DATA', cards} as const
}
export const setPackUserIdAC = (packUserId: string) => { return {type: 'cards/SET_PACK_USERID', packUserId} as const}
export const setPackIdAC = (packId: string) => { return {type: 'cards/SET_PACK_ID', packId} as const}


// THUNKS
export const GetCardsThunk = () => async (dispatch: Dispatch<CardsAllActions>, getState: () => IAppStore) => {
    dispatch(changeIsLoadingAC(true))
    const params = getState().cards.params
    CardsAPI.getCardsData(params)
        .then((res) => {
            dispatch(getAllCardsAC(res.data.cards))
            console.log("You are get CARDS data successfully")

        })
        .catch((error) => {
            const data = error?.response?.data;
            // При запросе колод если сервер сказал что куки нет, то разлогиниваемся в редаксе.
            // if (error.error === `you are not authorized /ᐠ-ꞈ-ᐟ\\`) {
            //     dispatch(setIsLoggedInAC(false))
            // }
            if (axios.isAxiosError(error) && data) {
                dispatch(setAppErrorAC(data.error || 'Some error occurred'));
            } else (dispatch(setAppErrorAC(error.message + '. More details in the console')))
            console.log({...error});
        })
        .finally(() => {
            dispatch(changeIsLoadingAC(false))
        })
}

export const AddNewCardThunk = (params: SendNewCardType) => async (dispatch: AppThunkType) => {
    dispatch(changeIsLoadingAC(true))

    CardsAPI.sendNewCardData(params)
        .then((res) => {
            if (res.data.newCard) {
                console.log("You are ADD NEW CARD successfully")
            }
            dispatch(GetCardsThunk())
        })
        .catch((error) => {
            const data = error?.response?.data;
            // При запросе колод если сервер сказал что куки нет, то разлогиниваемся в редаксе.
            // if (error.error === `you are not authorized /ᐠ-ꞈ-ᐟ\\`) {
            //     dispatch(setIsLoggedInAC(false))
            // }
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
export type CardsInitStateType = typeof initState

export type SetAllCardsDataACType = ReturnType<typeof getAllCardsAC>
export type SetPackUserIdACType = ReturnType<typeof setPackUserIdAC>
export type SetPackIdACIdACType = ReturnType<typeof setPackIdAC>


export type CardsAllActions =
    SetAllCardsDataACType

    | ChangeIsLoading
    | SetAppErrorActionType
    | SetIsLoggedInType

    | SetPackUserIdACType
    | SetPackIdACIdACType







