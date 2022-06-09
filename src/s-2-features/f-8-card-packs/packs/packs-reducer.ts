import {AddNewPackType, CardPackType, PackParamsType, PacksAPI, PacksType} from "./PacksAPI";
import {Dispatch} from "redux";
import {
    AppAction,
    ChangeIsLoading,
    changeIsLoadingAC,
    setAppErrorAC,
    SetAppErrorActionType
} from "../../../s-1-main/m-2-bll/app-reducer";

import axios from "axios";
import {AppThunkType, IAppStore} from "../../../s-1-main/m-2-bll/store";




const initState = {
    cardPacks: [] as CardPackType[],
    minCardsCount: 0,
    maxCardsCount: 11,
    cardPacksTotalCount: 0,
    params: {
        packName: '',
        min: 0,
        max: 11,
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

 // const setWithMyIdAC = (withMyId: boolean) =>
 //    ({type: 'PACKS/SET-WITH-MY-ID', withMyId} as const)

export const setCardsPacksCountFromRangeAC = (numbers: Array<number>) =>  // min and max cardsPacks
    ({type: 'PACKS/RANGE-SET-CARDS-PACKS-COUNT', min: numbers[0], max: numbers[1]} as const)

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

// export const AddNewPackThunk = (params: AddNewPackType): AppThunkType  => {
//     dispatch(changeIsLoadingAC(true))
//     PacksAPI.postNewPack(params)
//         .then((res) => {
//             dispatch(GetAllPacksThunk())
//             console.log("You are get packs data successfully")
//
//         })
//         .catch((error) => {
//             const data = error?.response?.data;
//             if (axios.isAxiosError(error) && data) {
//                 dispatch(setAppErrorAC(data.error || 'Some error occurred'));
//             } else (dispatch(setAppErrorAC(error.message + '. More details in the console')))
//             console.log({...error});
//         })
//         .finally(()=> {
//             dispatch(changeIsLoadingAC(false))
//         })
// }



// TYPES
export type SetAllPacksDataACType = ReturnType<typeof getAllPacksAC>



export type PacksInitStateType = typeof initState

export type PacksAllActions =
    SetAllPacksDataACType
    | ChangeIsLoading
    | SetAppErrorActionType




