import {CardPackType, PackParamsType, PacksAPI, PacksType} from "./PacksAPI";
import {Dispatch} from "redux";
import {
    ChangeIsLoading,
    changeIsLoadingAC,
    setAppErrorAC,
    SetAppErrorActionType
} from "../../../s-1-main/m-2-bll/app-reducer";

import axios from "axios";
import {IAppStore} from "../../../s-1-main/m-2-bll/store";




const initState = {
    cardPacks: [] as CardPackType[],
    minCardsCount: 0,
    maxCardsCount: 0,
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
        case "packs/SET_PACKS_DATA":
            return {...state, cardPacks: action.cardPacks}

        default:
            return state
    }
}

// ACTION CREATOR
const getAllPacksAC = (cardPacks: CardPackType[]) => {return {type: 'packs/SET_PACKS_DATA',cardPacks } as const}




// THUNKa
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
            if (axios.isAxiosError(error) && data) {
                dispatch(setAppErrorAC(data.error || 'Some error occurred'));
            } else (dispatch(setAppErrorAC(error.message + '. More details in the console')))
            console.log({...error});
        })
        .finally(()=> {
            dispatch(changeIsLoadingAC(false))
        })
}



// TYPES
export type setAllPacksDataACType = ReturnType<typeof getAllPacksAC>


export type PacksInitStateType = typeof initState

export type PacksAllActions =
    setAllPacksDataACType
    | ChangeIsLoading
    | SetAppErrorActionType

