import {instance} from "../../../base-url";
import {AxiosResponse} from "axios";

export const PacksAPI = {
    getPacksData (params: PackParamsType) {
        return instance.get<PacksType>('/cards/pack', {params})
    },
    postNewPack ( params: AddNewPackType) {
        return instance.post<AddNewPackType, AxiosResponse<PacksType>>('/cards/pack', params)
    }

};

export type AddNewPackType = {
    name: string,
    private: boolean
}

export type PackParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number

    user_id?: string
}

export type PacksType = {
    cardPacks: CardPackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type CardPackType = {
    _id: string
    user_id: string
    user_name: string
    name: string
    cardsCount: number
    created: string
    updated: string
    deckCover: string
}