import React, {ChangeEvent, useEffect, useState} from "react";
import s from "./PacksPage.module.css"
import SuperButton from "../../../s-3-components/c2-SuperButton/SuperButton";

import {useSelector} from "react-redux";
import {IAppStore, RootStateType, useAppDispatch} from "../../../s-1-main/m-2-bll/store";
import {CardPackType, PackParamsType, SortingPacksType} from "./PacksAPI";
import {
    AddNewPackThunk,
    DeletePackThunk,
    EditPackThunk, getAllPacksAC,
    GetAllPacksThunk,
    GetMyPacksThunk,
    ParamAC_SetSearch
} from "./packs-reducer";

import {Navigate, useNavigate} from "react-router-dom";
import {CARDS_PATH, SIGN_IN_PATH} from "../../../s-1-main/m-1-ui/Routing";
import {ErrorSnackbar} from "../../../s-3-components/ErrorSnackBar/ErrorSnackbar";
import {RangeSliderContainer} from "./cards/RangeSlider/RangeSliderContainer";
import {Button, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PikachuLoading from "../../../s-3-components/PikachuLoading";
import {setPackIdAC, setPackNameAC, setPackUserNameAC} from "./cards/cards-reducer";
import {Sorting} from "./cards/Sorting/Sorting";
import {PaginationPacksContainer} from "./cards/Pagination/PaginationPacksContainer";



const PacksPage = () => {

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
    const loggedUserName = useSelector<IAppStore, string>((state) => state.profile.userData.name);
    const params = useSelector<IAppStore, PackParamsType>((state) => state.packs.params);
    const packsData = useSelector<IAppStore, CardPackType[]>(state => state.packs.cardPacks)
    // const sortingBy = useSelector<RootStateType, SortingPacksType | ''>(state => state.packs.sortingBy)

    //хуки сюда:
    const [isPrivate, setPrivate] = useState<boolean>(false);
    const [packName, setPackName] = useState<string>('');
    const [searchItem, setSearchItem] = useState<string>('');

    const [editPackMode, setEditPackMode] = useState(false)
    const [editedName, setEditedName] = useState<string>('');
    const [packIdToEdit, setPackIdToEdit] = useState<string>('')





    // коллбэки тут:
    const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchItem(e.currentTarget.value)
    }

    const sendSearchInputHandler = () => {
        dispatch(ParamAC_SetSearch(searchItem))
        dispatch(getAllPacksAC([]))
        setSearchItem('')
    }


    const newPackInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    }
    const sendNewPackHandler = () => {
        dispatch(AddNewPackThunk({name: packName, deckCover: '', private: isPrivate}))
        setPackName('');
        setPrivate(false);
    }

    // коллбэки для кнопок внутри таблицы:
    const deletePackHandler = (packId: string) => {
        dispatch(DeletePackThunk(packId))
    }

    const sendEditPackHandler =(packId: string, oldName: string) => {
        if (oldName !== editedName) {
            dispatch(EditPackThunk({_id: packId, name: editedName}))
        }
        setEditedName('')
        setEditPackMode(!editPackMode)
    }

    const changeEditModeHandler = (userIdFromMap: string, packNameFromMap: string ) => {
        if (editPackMode) {
            setEditedName('')
        }
        setEditedName(packNameFromMap)
        setPackIdToEdit(userIdFromMap)
        setEditPackMode(true)
    }

    const editPackNameInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.currentTarget.value)
    }

    const openPackHandler =(packId: string, createdBy: string, packNameInMap: string) => {
        dispatch(setPackIdAC(packId))
        dispatch(setPackUserNameAC(createdBy))
        dispatch(setPackNameAC(packNameInMap))
        routeChange(CARDS_PATH)
    }



    const getMyPacks = () => {
        dispatch(GetMyPacksThunk())
        dispatch(getAllPacksAC([]))



    }
    const getAllPacks = () => {
        dispatch(GetAllPacksThunk())
        dispatch(getAllPacksAC([]))
    }

    useEffect(() => {
        dispatch(GetAllPacksThunk());
    }, [dispatch, isLoggedIn, params ]);

    // редирект на логин тут:

    if (!isLoggedIn) {
        return <Navigate to={SIGN_IN_PATH}/>
    }

    return (
        <div className={s.mainContainer}>
            {appError && <ErrorSnackbar/>}
            <div className={s.leftContainer}>
                <div className={s.sideBox}>
                    Frontend developer
                </div>
                <div>
                    <h3>{loggedUserName}</h3>
                </div>
                <div>
                    <Button variant={"contained"} onClick={getMyPacks}>MY</Button>
                    <Button variant={"contained"} onClick={getAllPacks} color={"secondary"}>ALL</Button>
                </div>
                <div>
                    <RangeSliderContainer/>
                    <Sorting/>
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
                                   disabled={isLoading}
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
                            disabled={isLoading}
                            onClick={sendSearchInputHandler}
                        >
                            Search
                        </SuperButton>

                        <input
                            disabled={isLoading}
                            value={packName}
                            onChange={newPackInputHandler}
                            placeholder={'New pack'}
                            className={s.input}
                        />
                        <SuperButton
                            disabled={isLoading}
                            onClick={sendNewPackHandler}
                        >
                            Add pack
                        </SuperButton>

                    </div>
                    <div className={s.tableBox}>
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
                            {packsData.length === 0 || !packsData
                                ? <div> {!isLoading && <ErrorSnackbar severity={"warning"} text={'Колоды не найдены'}/>}</div>
                                : packsData.map((t) =>
                                    <tr key={t._id}
                                        className={s.trBody}
                                    >
                                        {t.user_id === loggedUserId && editPackMode && t._id === packIdToEdit
                                            ? <input
                                                placeholder={t.name}
                                                value={editedName}
                                                onChange={editPackNameInputHandler}
                                                autoFocus
                                                onBlur={()=>sendEditPackHandler(t._id, t.name)}
                                            />
                                            : <td className={s.td}>{t.name}</td>}
                                        <td className={s.td}>{t.cardsCount}</td>
                                        <td className={s.td}>{t.updated.slice(0, 10).replace(/-/g, ".")}</td>
                                        <td className={s.td}>{t.user_name}</td>
                                        <td className={s.tdButtons}>

                                            {t.user_id === loggedUserId && <button
                                                onClick={()=>deletePackHandler(t._id)}
                                                disabled={isLoading || editPackMode}
                                            >Delete</button>}

                                            {t.user_id === loggedUserId && <button
                                                onClick={()=>changeEditModeHandler(t._id, t.name)}
                                                disabled={isLoading || editPackMode}
                                            >Edit</button>}

                                            <button
                                                onClick={()=>openPackHandler(t._id, t.user_name, t.name)}
                                                disabled={isLoading || editPackMode}
                                            >Learn</button>

                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                        {isLoading && <PikachuLoading/>}
                    </div>
                </div>
                <div className={s.paginationBox}>
                   {/*<PaginationPacksContainer/>*/}
                </div>
            </div>
        </div>
    );
};

export default PacksPage;
