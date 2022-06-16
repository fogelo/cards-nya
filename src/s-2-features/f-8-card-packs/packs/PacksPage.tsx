import React, {MouseEvent, ChangeEvent, useEffect, useState} from "react";
import s from "./PacksPage.module.css"
import SuperButton from "../../../s-3-components/c2-SuperButton/SuperButton";

import {useSelector} from "react-redux";
import {IAppStore, useAppDispatch} from "../../../s-1-main/m-2-bll/store";
import {CardPackType, PackParamsType} from "./PacksAPI";
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

import CancelIcon from "@mui/icons-material/Cancel";


import PikachuLoading from "../../../s-3-components/PikachuLoading";
import {getAllCardsAC, setPackIdAC, setPackNameAC, setPackUserNameAC} from "./cards/cards-reducer";
import LinearIndeterminate from "../../../s-3-components/c8-ProgressBarLinear/ProgressBarLinear";
import Pagination from "../../../s-3-components/c10-Pagination/Pagination";
import FormDialog from "../../../s-3-components/c9-ModalBox/DialogForm";


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

    //хуки сюда:
    const [isPrivate, setPrivate] = useState<boolean>(false);
    const [packName, setPackName] = useState<string>("");
    const [searchItem, setSearchItem] = useState<string>("");

    const [editPackMode, setEditPackMode] = useState(false)
    const [editedName, setEditedName] = useState<string>("");
    const [packIdToEdit, setPackIdToEdit] = useState<string>("")
    //хуки для модалки удаления колоды
    const [isOpenDeletePackModal, setIsOpenDeletePackModal] = useState(false)
    const [isOpenAddNewPackModal, setIsOpenAddNewPackModal] = useState(false)
    const [isOpenEditPackModal, setIsOpenEditPackModal] = useState(false)
    const [packId, setPackId] = useState("")


    // коллбэки тут:
    const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchItem(e.currentTarget.value)
    }

    const sendSearchInputHandler = () => {
        dispatch(ParamAC_SetSearch(searchItem))
        dispatch(getAllPacksAC([]))
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
    const deletePackHandler = () => {
        dispatch(DeletePackThunk(packId))
    }

    const openDeletePackModal = (event: MouseEvent<HTMLButtonElement>, packId: string) => {
        event.stopPropagation();
        setPackId(packId)
        setIsOpenDeletePackModal(true)
    }
    const openEditPackModal = (event: MouseEvent<HTMLButtonElement>, packId: string, packName: string) => {
        event.stopPropagation();
        setPackId(packId)
        setIsOpenEditPackModal(true)
        setPackName(packName)
    }

    const sendEditPackHandler = (packId: string, oldName: string) => {
        if (oldName !== editedName) {
            dispatch(EditPackThunk({_id: packId, name: editedName}))
        }
        setEditedName("")
        setEditPackMode(!editPackMode)
    }

    const changeEditModeHandler = (event: MouseEvent<HTMLButtonElement>, userIdFromMap: string, packNameFromMap: string) => {
        event.stopPropagation();
        if (editPackMode) {
            setEditedName("")
        }
        setEditedName(packNameFromMap)
        setPackIdToEdit(userIdFromMap)
        setEditPackMode(true)
    }

    const editPackNameInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.currentTarget.value)
    }

    const openPackHandler = (packId: string, createdBy: string, packNameInMap: string) => {
        if (!editPackMode) {
            dispatch(setPackIdAC(packId))
            dispatch(setPackUserNameAC(createdBy))
            dispatch(setPackNameAC(packNameInMap))
            dispatch(getAllCardsAC([]))
            routeChange(CARDS_PATH)
        }
    }

    const learnButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

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
    }, [dispatch, params]);

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
                    <Button disabled={isLoading} variant={"contained"} onClick={getMyPacks}>MY</Button>
                    <Button disabled={isLoading} variant={"contained"} onClick={getAllPacks}
                            color={"secondary"}>ALL</Button>
                </div>
                <div>
                    <RangeSliderContainer/>
                </div>
            </div>
            <div className={s.rightContainer}>
                <div>
                    <div className={s.findContainer}>
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
                        <CancelIcon
                            onClick={() => setSearchItem("")}
                            className={s.clearButton}
                        />

                        <SuperButton
                            disabled={isLoading}
                            onClick={sendSearchInputHandler}
                        >
                            Search
                        </SuperButton>

                        <SuperButton
                            disabled={isLoading}
                            onClick={() => setIsOpenAddNewPackModal(true)}
                        >
                            Add new pack
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
                            <tbody
                                className={s.trBody}>{!(packsData.length > 0) || !packsData ? "" : packsData.map((t) =>
                                <tr key={t._id}
                                    className={s.trItem}
                                    onClick={() => openPackHandler(t._id, t.user_name, t.name)}
                                >{t.user_id === loggedUserId && editPackMode && t._id === packIdToEdit
                                    ? <input
                                        placeholder={t.name}
                                        value={editedName}
                                        onChange={(e) => editPackNameInputHandler(e)}
                                        autoFocus
                                        onBlur={() => sendEditPackHandler(t._id, t.name)}
                                    />
                                    : <td className={s.td}>{t.name}</td>}
                                    <td className={s.td}>{t.cardsCount}</td>
                                    <td className={s.td}>{t.updated.slice(0, 10).replace(/-/g, ".")}</td>
                                    <td className={s.td}>{t.user_name}</td>
                                    <td className={s.td}>
                                        {t.user_id === loggedUserId && <button
                                            className={s.delButton}
                                            onClick={(event) => openDeletePackModal(event, t._id)}
                                            disabled={isLoading}
                                        >Delete</button>}
                                        {t.user_id === loggedUserId && <button
                                            className={s.editButton}
                                            onClick={(event) => openEditPackModal(event, t._id, t.name)}
                                            disabled={isLoading}
                                        >Edit</button>}
                                        <button
                                            onClick={(event) => learnButtonHandler(event)}
                                            className={s.learnButton}
                                            disabled={isLoading}
                                        >Learn
                                        </button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                        {isLoading && <><PikachuLoading/><LinearIndeterminate/></>}
                        <>
                            {!isLoading && <ErrorSnackbar vertical={"top"} severity={"warning"}
                                                          text={"Колоды не найдены"}/>}
                        </>
                    </div>
                </div>
                <div className={s.paginationBox}>
                    <Pagination/>
                </div>
            </div>
            <FormDialog title={"Delete Pack"}
                        buttonTitle={"Delete"}
                        buttonAction={deletePackHandler}
                        open={isOpenDeletePackModal}
                        setOpen={setIsOpenDeletePackModal}
                        text={"Do you really want to remove this Pack? All cards will be excluded from this course."}
            />
            <FormDialog title={"Add New Pack"}
                        buttonTitle={"Save"}
                        buttonAction={sendNewPackHandler}
                        open={isOpenAddNewPackModal}
                        setOpen={setIsOpenAddNewPackModal}
                        text={"Enter new pack name"}
            >
                <TextField
                    disabled={isLoading}
                    value={packName}
                    onChange={newPackInputHandler}
                    placeholder={"New pack name"}
                    fullWidth
                    className={s.input}
                />
            </FormDialog>
            <FormDialog title={"Add New Pack"}
                        buttonTitle={"Save"}
                        buttonAction={sendNewPackHandler}
                        open={isOpenAddNewPackModal}
                        setOpen={setIsOpenAddNewPackModal}
                        text={"Enter new pack name"}
            >
                <TextField
                    disabled={isLoading}
                    value={packName}
                    onChange={newPackInputHandler}
                    placeholder={"New pack name"}
                    fullWidth
                    className={s.input}
                />
            </FormDialog>
            <FormDialog title={"Edit Pack"}
                        buttonTitle={"Save"}
                        buttonAction={() => sendEditPackHandler(packId, packName)}
                        open={isOpenEditPackModal}
                        setOpen={setIsOpenEditPackModal}
                        text={"Enter new pack name"}
            >
                <input
                    placeholder={packName}
                    value={editedName}
                    onChange={(e) => editPackNameInputHandler(e)}
                    autoFocus
                />
            </FormDialog>
        </div>
    );
};

export default PacksPage;