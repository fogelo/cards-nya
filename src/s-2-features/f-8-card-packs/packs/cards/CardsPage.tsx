import React, {ChangeEvent, useEffect, useState} from 'react';

import s from './CardsPage.module.css'
import {useSelector} from "react-redux";

import {CardsParamsType, CardType} from "./CardsAPI";
import {
    AddNewCardThunk,
    DeleteCardThunk, getAllCardsAC,
    GetCardsThunk,
    setPackIdAC,
    setPackNameAC,
    setPackUserNameAC, UpdateCardQuestThunk
} from "./cards-reducer";

import {Navigate, useNavigate} from "react-router-dom";
import {IAppStore, useAppDispatch} from "../../../../s-1-main/m-2-bll/store";
import {PACKS_PATH, SIGN_IN_PATH} from "../../../../s-1-main/m-1-ui/Routing";
import {ErrorSnackbar} from "../../../../s-3-components/ErrorSnackBar/ErrorSnackbar";
import LinearIndeterminate from "../../../../s-3-components/c8-ProgressBarLinear/ProgressBarLinear";
import SuperButton from "../../../../s-3-components/c2-SuperButton/SuperButton";
import PikachuLoading from "../../../../s-3-components/PikachuLoading";


const CardsPage = () => {

    //react-router v6
    let navigate = useNavigate();
    const routeChange = (newPath: string) => {
        navigate(newPath)
    }

    //react-redux:
    const dispatch = useAppDispatch();
    const appError = useSelector<IAppStore, string | null>(state => state.app.appError)
    const isLoading = useSelector<IAppStore, boolean>((state) => state.app.isLoading);
    const isLoggedIn = useSelector<IAppStore, boolean>((state) => state.login.isLoggedIn);
    const loggedUserId = useSelector<IAppStore, string>((state) => state.profile.userData._id);


    const cardsData = useSelector<IAppStore, CardType[]>(state => state.cards.cards)
    const cardsParams = useSelector<IAppStore, CardsParamsType>((state) => state.cards.params);
    const createdBy = useSelector<IAppStore, string>((state) => state.cards.createdBy);
    const packNameInMap = useSelector<IAppStore, string>((state) => state.cards.packNameInMap);

    //хуки сюда:
    const [newCardValue, setNewCardValue] = useState<string>('');
    const [editCardMode, setEditCardMode] = useState<boolean>(false)
    const [editedQuest, setEditedQuest] = useState<string>('');
    const [cardIdToEdit, setCardIdToEdit] = useState<string>('');

    // коллбэки тут:
    const addCardInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewCardValue(e.currentTarget.value)
    }

    const sendNewCardInputHandler = () => {
        dispatch(AddNewCardThunk({
            cardsPack_id: cardsParams.cardsPack_id,
            question: newCardValue,
            answer: 'Какой-то ответ...',
        }))
        setNewCardValue('')
    }

    const backToPackPageHandler = () => {
        routeChange(PACKS_PATH)
        dispatch(setPackIdAC(''))
        dispatch(setPackUserNameAC(''))
        dispatch(setPackNameAC(''))
        dispatch(getAllCardsAC([]))
        setEditCardMode(false)
    }

    // коллбэки для кнопок внутри таблицы:
    const deleteCardHandler = (cardId: string) => {
        dispatch(DeleteCardThunk(cardId))
    }

    const changeEditModeHandler = (cardIdFromMap: string) => {
        if (!editCardMode) {
            setEditedQuest('')
        }
        setCardIdToEdit(cardIdFromMap)
        setEditCardMode(true)
    }
    const editCardQuestInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEditedQuest(e.currentTarget.value)
    }
    const sendEditCardHandler =(cardId: string, oldQuest: string) => {
        if (oldQuest !== editedQuest) {
            dispatch(UpdateCardQuestThunk({_id: cardId, question: editedQuest, comments: '' }))
        }
        setEditedQuest('')
        setEditCardMode(false)
    }


    useEffect(() => {
        dispatch(GetCardsThunk());
    }, [
        dispatch,
        cardsParams.cardsPack_id,
        cardsParams.sortCards,
        cardsParams.page,
        cardsParams.cardAnswer,
        cardsParams.cardQuestion
    ]);


    // редирект на логин тут:
    if (!isLoggedIn) {
        return <Navigate to={SIGN_IN_PATH}/>
    }

    // редирект на КОЛОДЫ если нет cardPACK_Id
    if (cardsParams.cardsPack_id === '' || !cardsParams.cardsPack_id ) {
        return (
            <div>
                <Navigate to={PACKS_PATH}/>
            </div>
        )
    }

    return (
        <div className={s.mainContainer}>
            {appError && <ErrorSnackbar/>}

            <div className={s.rightContainer}>
                <div>
                    <div className={s.findContainer}>
                        <SuperButton
                            className={s.button1}
                            onClick={backToPackPageHandler}
                        >BACK TO PACKS</SuperButton>
                        <div>
                            <input
                                value={newCardValue}
                                onChange={addCardInputHandler}
                                placeholder={'New card question'}
                                className={s.input}
                            />
                            <SuperButton
                                onClick={sendNewCardInputHandler}
                            >
                                Add card
                            </SuperButton>
                        </div>
                    </div>
                    <div className={s.spanCreatedBy}>
                        <span>
                            <h2>{packNameInMap}</h2>
                        </span>
                        Pack created by&nbsp;{createdBy}
                    </div>

                    <div className={s.tableBox}>
                        <table className={s.table}>
                            <thead className={s.thead}>
                            <tr className={s.trHead}>
                                <th className={s.th}>Question</th>
                                <th className={s.th}>Answer</th>
                                <th className={s.th}>Last updated</th>
                                <th className={s.th}>Grade</th>
                                <th className={s.th}>Actions</th>
                            </tr>
                            </thead>

                            <tbody className={s.trBody}>
                            {!(cardsData.length > 0) || !cardsData
                                ? <tr>{!isLoading && <ErrorSnackbar vertical={"top"} severity={"warning"} text={'Карты в колоде не найдены'}/>}</tr>
                                : cardsData.map((t) =>
                                    <tr key={t._id}
                                        className={s.trItem}
                                    >
                                        {t._id === cardIdToEdit && editCardMode
                                            ? <input
                                                placeholder={t.question}
                                                value={editedQuest}
                                                onChange={editCardQuestInputHandler}
                                                autoFocus
                                                onBlur={ ()=> sendEditCardHandler (t._id, t.question)}
                                            />
                                            : <td className={s.td}>{t.question}</td>}
                                        <td className={s.td}>{t.answer}</td>
                                        <td className={s.td}>{t.updated}</td>
                                        <td className={s.td}>{t.grade}</td>
                                        <td className={s.td}>

                                            {t.user_id === loggedUserId && <button
                                                className={s.delButton}
                                                onClick={()=>deleteCardHandler(t._id)}
                                                disabled={isLoading || editCardMode}
                                            >Delete</button>}

                                            {t.user_id === loggedUserId && <button
                                                className={s.editButton}
                                                onClick={()=>changeEditModeHandler(t._id)}
                                                disabled={isLoading || editCardMode}
                                            >Edit</button>}

                                            <button
                                                className={s.learnButton}
                                            >Open</button>
                                        </td>
                                    </tr>
                                )
                            }

                            </tbody>

                        </table>
                        {isLoading && <><PikachuLoading/><LinearIndeterminate/></>}
                    </div>
                </div>

                <div className={s.paginationBox}>
                    pagination 1 2 3 4 5 6 7 8 9
                </div>

            </div>
        </div>
    );
};

export default CardsPage;
