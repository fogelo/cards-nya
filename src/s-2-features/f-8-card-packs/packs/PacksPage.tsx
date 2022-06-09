import React, {ChangeEvent, useEffect, useState} from "react";
import CardsPage from "./cards/CardsPage";
import s from "./PacksPage.module.css"
import SuperButton from "../../../s-3-components/c2-SuperButton/SuperButton";

import RangeSlider from "../../../s-3-components/c7-Slider/Slider";
import {useSelector} from "react-redux";
import {IAppStore, useAppDispatch} from "../../../s-1-main/m-2-bll/store";
import {CardPackType, PackParamsType, PacksAPI} from "./PacksAPI";
import {
    AddNewPackThunk,
    DeletePackThunk,
    EditPackThunk,
    GetAllPacksThunk,
    GetMyPacksThunk,
    ParamAC_SetSearch
} from "./packs-reducer";

import LinearIndeterminate from "../../../s-3-components/c8-ProgressBarLinear/ProgressBarLinear";
import {Navigate} from "react-router-dom";
import {SIGN_IN_PATH} from "../../../s-1-main/m-1-ui/Routing";
import {ErrorSnackbar} from "../../../s-3-components/ErrorSnackBar/ErrorSnackbar";
import FormDialog from "../../../s-3-components/c9-ModalBox/DialogForm";
import {RangeSliderContainer} from "./cards/RangeSlider/RangeSliderContainer";
import {Button, InputAdornment, TextField} from "@mui/material";
// import {ChooseOwner} from "./cards/ChooseOwner/ChooseOwner";
import SearchIcon from "@mui/icons-material/Search";
import PikachuLoading from "../../../s-3-components/PikachuLoading";


const PacksPage = () => {

    //react-redux:
    const dispatch = useAppDispatch();
    const appError = useSelector<IAppStore, string | null>(state => state.app.appError)

    const packsData = useSelector<IAppStore, CardPackType[]>(state => state.packs.cardPacks)
    const isLoading = useSelector<IAppStore, boolean>((state) => state.app.isLoading);
    const isLoggedIn = useSelector<IAppStore, boolean>((state) => state.login.isLoggedIn);
    const params = useSelector<IAppStore, PackParamsType>((state) => state.packs.params);

    //хуки сюда:
    const [isPrivate, setPrivate] = useState<boolean>(false);
    const [packName, setPackName] = useState<string>("");
    const [searchItem, setSearchItem] = useState<string>("");


    // коллбэки тут:
    const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchItem(e.currentTarget.value)
    }

    const sendSearchInputHandler = () => {
        dispatch(ParamAC_SetSearch(searchItem))
        setSearchItem("")
    }


    const newPackInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    }
    const sendNewPackHandler = () => {
        dispatch(AddNewPackThunk({name: packName, deckCover: "", private: isPrivate}))
        setPackName("");
        setPrivate(false);
    }

    // коллбэки для кнопок внутри таблицы:
    const deletePackHandler = (packId: string) => {
        dispatch(DeletePackThunk(packId))
    }
    const editPackHandler = (packId: string) => {
        dispatch(EditPackThunk({_id: packId, name: "Тест колода3"}))
    }
    const openPackHandler = (packId: string) => {

    }

    const getMyPacks = () => {
        dispatch(GetMyPacksThunk())
    }
    const getAllPacks = () => {
        dispatch(GetAllPacksThunk())
    }

    useEffect(() => {
        dispatch(GetAllPacksThunk());
    }, [dispatch, params]);

    // редирект на логин тут:

    if (!isLoggedIn) {
        return <Navigate to={SIGN_IN_PATH}/>
    }

    return (
        <div className={s.mainContainer}>
            {appError && <ErrorSnackbar/>}
            <div className={s.leftContainer}>
                {/*<div className={s.sideBox}>*/}
                {/*    Sidebar*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    Profile*/}
                {/*</div>*/}
                <p>
                    Show packs cards
                </p>
                <div>
                    <Button variant={"contained"} onClick={getMyPacks}>MY</Button>
                    <Button variant={"contained"} onClick={getAllPacks} color={"secondary"}>ALL</Button>
                </div>
                <div>
                    <RangeSliderContainer/>
                </div>
            </div>
            <div className={s.rightContainer}>
                <div>
                    <div className={s.findContainer}>

                        {/*<input*/}
                        {/*    value={searchItem}*/}
                        {/*    onChange={searchInputHandler}*/}
                        {/*    placeholder={"Search"}*/}
                        {/*    className={s.input}*/}
                        {/*/>*/}
                        <TextField type="text"
                                   value={searchItem}
                                   placeholder={"Search"}
                                   onChange={searchInputHandler}
                                   variant={"outlined"}
                                   size={"small"}
                                   className={s.input}
                                   fullWidth
                                   sx={{minWidth: "60%"}}
                                   InputProps={{
                                       startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>
                                   }}
                        />
                        <SuperButton
                            onClick={sendSearchInputHandler}
                        >
                            Search
                        </SuperButton>

                        <input
                            value={packName}
                            onChange={newPackInputHandler}
                            placeholder={"New pack"}
                            className={s.input}
                        />
                        <SuperButton
                            onClick={sendNewPackHandler}
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
                                ? ""
                                : packsData.map((t) =>
                                    <tr key={t._id}
                                        className={s.trBody}
                                    >
                                        <td className={s.td}>{t.name}</td>
                                        <td className={s.td}>{t.cardsCount}</td>
                                        <td className={s.td}>{t.updated.slice(0, 10).replace(/-/g, ".")}</td>
                                        <td className={s.td}>{t.user_name}</td>
                                        <td className={s.tdButtons}>
                                            <button onClick={() => deletePackHandler(t._id)}>Delete</button>
                                            <button onClick={() => editPackHandler(t._id)}>Edit</button>
                                            <button onClick={() => openPackHandler(t._id)}>Learn</button>
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
