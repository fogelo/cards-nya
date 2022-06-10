import React, {ChangeEvent, useEffect, useState} from 'react';

import s from './CardsPage.module.css'
import {useSelector} from "react-redux";

import {CardsParamsType, CardType} from "./CardsAPI";
import {AddNewCardThunk, GetCardsThunk} from "./cards-reducer";

import {Navigate, useNavigate} from "react-router-dom";
import {IAppStore, useAppDispatch} from "../../../../s-1-main/m-2-bll/store";
import {PACKS_PATH, SIGN_IN_PATH} from "../../../../s-1-main/m-1-ui/Routing";
import {ErrorSnackbar} from "../../../../s-3-components/ErrorSnackBar/ErrorSnackbar";
import RangeSlider from "../../../../s-3-components/c7-Slider/Slider";
import LinearIndeterminate from "../../../../s-3-components/c8-ProgressBarLinear/ProgressBarLinear";
import SuperButton from "../../../../s-3-components/c2-SuperButton/SuperButton";
import {ParamAC_SetSearch} from "../packs-reducer";


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

    const cardsData = useSelector<IAppStore, CardType[]>(state => state.cards.cards)
    const cardsParams = useSelector<IAppStore, CardsParamsType>((state) => state.cards.params);

    //хуки сюда:
    const [newCardValue, setNewCardValue] = useState<string>('');


    // коллбэки тут:
    const addCardInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewCardValue(e.currentTarget.value)
    }

    const sendNewCardInputHandler = () => {
        dispatch(AddNewCardThunk({
            cardsPack_id: cardsParams.cardsPack_id,
            question: '1223r34r34t',
            answer: 'dddfswfwefwef',
        }))
        setNewCardValue('')
    }

    // коллбэки для кнопок внутри таблицы:


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

    // редирект на КОЛОДЫ если нет PACK_Id
    if (!cardsParams.cardsPack_id) {
        return <Navigate to={PACKS_PATH}/>
    }


    return (
        <div className={s.mainContainer}>
            {appError && <ErrorSnackbar/>}

            <div className={s.rightContainer}>
                <div>
                    <div className={s.findContainer}>
                        <SuperButton
                            className={s.button1}
                            onClick={() => routeChange(PACKS_PATH)}
                        >BACK TO PACKS</SuperButton>
                        <div>
                            <input
                                value={newCardValue}
                                onChange={addCardInputHandler}
                                placeholder={'Card name'}
                                className={s.input}
                            />
                            <SuperButton
                                onClick={sendNewCardInputHandler}
                            >
                                Add card
                            </SuperButton>
                        </div>

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
                            {!cardsData
                                ? <div> {!isLoading &&
                                    <ErrorSnackbar severity={"warning"} text={'Data not found'}/>}</div>
                                : cardsData.map((t) =>
                                    <tr key={t._id}
                                        className={s.trBody}
                                    >
                                        <td className={s.td}>{t.question}</td>
                                        <td className={s.td}>{t.answer}</td>
                                        <td className={s.td}>{t.updated}</td>
                                        <td className={s.td}>{t.grade}</td>
                                        <td className={s.td}>
                                            <button>Delete</button>
                                            <button>Edit</button>
                                            <button>Open</button>
                                        </td>
                                    </tr>
                                )
                            }

                            </tbody>

                        </table>
                        {isLoading && <LinearIndeterminate/>}

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
