import React, {useEffect, useState} from 'react';
import CardsPage from "./cards/CardsPage";
import s from './PacksPage.module.css'
import SuperButton from "../../../s-3-components/c2-SuperButton/SuperButton";

import RangeSlider from "../../../s-3-components/c7-Slider/Slider";
import {useSelector} from "react-redux";
import {IAppStore, useAppDispatch} from "../../../s-1-main/m-2-bll/store";
import {CardPackType} from "./PacksAPI";
import {GetAllPacksThunk} from "./packs-reducer";

import LinearIndeterminate from "../../../s-3-components/c8-ProgressBarLinear/ProgressBarLinear";
import {Navigate} from "react-router-dom";
import {SIGN_IN_PATH} from "../../../s-1-main/m-1-ui/Routing";


const PacksPage = () => {

    //react-redux:
    const dispatch = useAppDispatch();
    const packsData = useSelector<IAppStore, CardPackType[]>(state => state.packs.cardPacks)
    const isLoading = useSelector<IAppStore, boolean>((state) => state.app.isLoading);
    const isLoggedIn = useSelector<IAppStore, boolean>((state) => state.login.isLoggedIn);

    //хуки сюда:
    const [isPrivate, setPrivate] = useState<boolean>(false);

    useEffect(() => {
        dispatch(GetAllPacksThunk());
    }, [dispatch]);

    // коллбэки тут:
    const findFromInputHandler = () => {

    }

    const addNewPackHandler = () => {

    }


    // редирект на логин тут:
    if (!isLoggedIn) {
        return <Navigate to={SIGN_IN_PATH}/>
    }

    return (
        <div className={s.mainContainer}>
            <div className={s.leftContainer}>
                <div className={s.sideBox}>
                    Sider
                </div>
                <div>
                    Profile
                </div>
                <div>
                    MY & ALL BUTTONS
                </div>
                <div>
                    <RangeSlider/>
                </div>

            </div>
            <div className={s.rightContainer}>
                <div>
                    <div className={s.findContainer}>

                        <input
                            placeholder={'Search'}
                            className={s.input}
                        />
                        <SuperButton
                            onClick={findFromInputHandler}
                        >
                            Search
                        </SuperButton>

                        <input
                            placeholder={'New pack'}
                            className={s.input}
                        />
                        <SuperButton
                            onClick={addNewPackHandler}
                        >
                            Add pack
                        </SuperButton>

                    </div>
                    <div className={s.tableBox}>
                        table

                        <table className={s.table}>

                            <thead className={s.thead}>
                            <tr className={s.trHead}>
                                <th className={s.th}>Name</th>
                                <th className={s.th}>Cards</th>
                                <th className={s.th}>Last updated</th>
                                <th className={s.th}>Created by</th>
                                <th className={s.th}>Actions</th>
                            </tr>
                            </thead>

                            <tbody className={s.trBody}>
                            {!packsData
                                ? ''
                                : packsData.map((t) =>
                                    <tr key={t._id}
                                        className={s.trBody}
                                    >
                                        <td className={s.td}>{t.name}</td>
                                        <td className={s.td}>{t.cardsCount}</td>
                                        <td className={s.td}>{t.updated}</td>
                                        <td className={s.td}>{t.user_name}</td>
                                        <td className={s.td}>
                                            <button>Delete</button>
                                            <button>Edit</button>
                                            <button>Learn</button>
                                        </td>
                                    </tr>
                                )}
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

export default PacksPage;
