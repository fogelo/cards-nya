import React, {useEffect, useState} from 'react';
import s from "./LearnPage.module.css";
import SuperButton from "../../../../s-3-components/c2-SuperButton/SuperButton";
import {PACKS_PATH, SIGN_IN_PATH} from "../../../../s-1-main/m-1-ui/Routing";
import {useSelector} from "react-redux";
import {IAppStore, useAppDispatch} from "../../../../s-1-main/m-2-bll/store";
import {UserType} from "../../../f-1-authorization/a-1-sign-in/s-3-dal/SignInAPI";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {PackParamsType} from "../PacksAPI";
import {CardsParamsType, CardType} from "../cards/CardsAPI";
import Button from "@mui/material/Button";
import PikachuLoading from "../../../../s-3-components/PikachuLoading";
import {getAllPacksAC} from "../packs-reducer";
import {
    getAllCardsAC,
    GetCardsThunk,
    setPackIdAC,
    setPackNameAC,
    setPackUserNameAC,
    UpdateCardGradeThunk
} from "../cards/cards-reducer";


const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал ответ'];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}


const LearnPage = () => {

    //react-router v6
    let navigate = useNavigate();
    const routeChange = (newPath: string) => {
        navigate(newPath)
    }

    const dispatch = useAppDispatch();

    const isLoggedIn = useSelector<IAppStore, boolean>((state) => state.login.isLoggedIn);
    const isLoading = useSelector<IAppStore, boolean>((state) => state.app.isLoading);
    const userData = useSelector<IAppStore, UserType>(state => state.profile.userData)

    const packsParams = useSelector<IAppStore, PackParamsType>((state) => state.packs.params);
    const cardsParams = useSelector<IAppStore, CardsParamsType>((state) => state.cards.params);
    const createdBy = useSelector<IAppStore, string>((state) => state.cards.createdBy);
    const cardsData = useSelector<IAppStore, CardType[]>(state => state.cards.cards)
    const packNameInMap = useSelector<IAppStore, string>((state) => state.cards.packNameInMap);


    // хуки
    const [isAnswered, setIsAnswered] = useState<boolean>(false)
    const [first, setFirst] = useState<boolean>(true);
    const [card, setCard] = useState<CardType>({
        answer: '',
        question: '',
        cardsPack_id: '',
        grade: 0,
        shots: 0,
        user_id: '',
        created: '',
        updated: '',
        _id: ''
    });
    const [newGrade, setNewGrade] = useState<number>(0)


    useEffect(() => {
        console.log('LearnContainer useEffect');

        if (first) {
            dispatch(GetCardsThunk());
            setFirst(false);
        }

        console.log('cards', cardsData)
        if (cardsData.length > 0) setCard(getCard(cardsData));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, cardsParams.cardsPack_id, cardsData, first]);

    const onNext = () => {
        if (newGrade !== 0) {
            setIsAnswered(false);
            if (cardsData.length > 0) {
                dispatch(UpdateCardGradeThunk({grade: newGrade, card_id: card._id}))
                setCard(getCard(cardsData));
                setNewGrade(0)
            } else {

            }
        }
    }

    const sendGradeHandler = (g: string) => {
        if (g === 'не знал') {setNewGrade(1)}
        if (g === 'забыл') {setNewGrade(2)}
        if (g === 'долго думал') {setNewGrade(3)}
        if (g === 'перепутал') {setNewGrade(4)}
        if (g === 'знал ответ') {setNewGrade(5)}
    }

    const learnEndHandler = () => {
        dispatch(setPackIdAC(''))
        dispatch(setPackUserNameAC(''))
        dispatch(setPackNameAC(''))
        dispatch(getAllCardsAC([]))
        dispatch(getAllPacksAC([]))
        routeChange(PACKS_PATH)
    }

    // useEffect сюда потом добавить
    // useEffect(()=>{
    //     getAllCardsAC()
    // })

    // редирект на логин тут:
    if (!isLoggedIn) {
        return <Navigate to={SIGN_IN_PATH}/>
    }

    return (
        <div className={s.profileContainer}>
            {isLoading && <PikachuLoading/>}
            <h1>Learn cards</h1>
            <h3>Колода: {packNameInMap}</h3>
            <h3>Автор: {createdBy}</h3>
            <div>
                <h3>Вопрос: {card.question}</h3>
            </div>
            <div>
                {isAnswered ? <b>Ответ: {card.answer}</b> : <button onClick={()=>setIsAnswered(true)}>Показать правильный ответ</button>}
            </div>
            <div>
                Оцените себя:
                <div>
                    {grades.map((g, i) => (
                        <Button
                            key={'grade-' + i}
                            onClick={() => sendGradeHandler(g)}>{g}</Button>
                    ))}
                </div>
            </div>


            <span>
                <SuperButton
                    onClick={()=>learnEndHandler()}
                    disabled={isLoading}
                >
                    Завершить обучение
                </SuperButton>
                <SuperButton onClick={() => onNext()} disabled={isLoading || newGrade === 0}>Следующая карточка</SuperButton>
            </span>

        </div>
    );
};

export default LearnPage;
