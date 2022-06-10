import {instance} from "../../../../base-url";
import {AxiosResponse} from "axios";

export const CardsAPI = {
    getCardsData(params: CardsParamsType) {
        return instance.get<CardsParamsType, AxiosResponse<AllCardsData>>(`/cards/card`, {params})
    },
    sendNewCardData (card: SendNewCardType) {
        return instance.post<SendNewCardType, AxiosResponse<newCardType>>(`/cards/card`, {card})
    }
};

export type newCardType = {
    newCard: {}
}

export type SendNewCardType = {
    cardsPack_id: string
    answer?: string
    question?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type CardsParamsType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number
    max: number
    sortCards: number
    page: number
    pageCount: number
}

export type AllCardsData = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}