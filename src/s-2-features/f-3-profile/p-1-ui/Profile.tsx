import React, {ChangeEvent, useCallback, useState} from 'react';
import {Navigate} from "react-router-dom";
import {SIGN_IN_PATH} from "../../../s-1-main/m-1-ui/Routing";
import {useSelector} from "react-redux";
import {IAppStore, useAppDispatch} from "../../../s-1-main/m-2-bll/store";
import {UserType} from "../../f-1-authorization/a-1-sign-in/s-3-dal/SignInAPI";

import defaultAvatar from '../../../assets/images/default_cat_ava.png';
import SuperButton from "../../../s-3-components/c2-SuperButton/SuperButton";
import s from './Profile.module.css';
import SuperInputText from "../../../s-3-components/c1-SuperInputText/SuperInputText";
import {
    switchProfileEditModeAC,
    UpdateUserDataThunk
} from "../p-2-bll/b-2-redux/profile-reducer";


interface IProfileProps {

}

const Profile: React.FC<IProfileProps> = () => {

    console.log('render profile');

    // react-redux
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<IAppStore, boolean>(state => state.login.isLoggedIn)
    const isProfileLoading = useSelector<IAppStore, boolean>(state => state.app.isLoading);
    const ProfileEditMode = useSelector<IAppStore, boolean>(state => state.profile.profileEditMode);
    const userData = useSelector<IAppStore, UserType>(state => state.profile.userData)


    // ХУКИ
    const [NewAvatar, setNewAvatar] = useState(!userData.avatar ? defaultAvatar : userData.avatar)
    const [NewUserName, setNewUserName] = useState(!userData.name ? "User" : userData.name)
    const [isInputChanged,setIsInputChanged] = useState<boolean>(false)


    // КОЛБЭКИ
    const onChangeNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value !== userData.name) {setIsInputChanged(true)}
        setNewUserName(e.currentTarget.value)
    }
    const onChangeAvaInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value !== userData.avatar) {setIsInputChanged(true)}
        setNewAvatar(e.currentTarget.value)
    }

    // const SendNewUserDataHandler = () => {
    //     dispatch(UpdateUserDataThunk(NewUserName, NewAvatar))
    // }

    const SendNewUserDataHandler = useCallback(() => {
        dispatch(UpdateUserDataThunk(NewUserName, NewAvatar))
    }, [dispatch, NewUserName, NewAvatar])

    const ChangeProfileEditModeHandler = () => {
        setIsInputChanged(false)
        setNewUserName(userData.name);
        setNewAvatar((userData.avatar) as string) ;
        dispatch(switchProfileEditModeAC(!ProfileEditMode))
    }

    if (!isLoggedIn) {
        return <Navigate to={SIGN_IN_PATH}/>
    }

    if (ProfileEditMode) {
        return (
            <div className={s.profileContainer}>
                <h2>Personal information</h2>
                <img src={userData.avatar}
                     alt={'avatar'}/>
                <div>
                    <b>Front-End Developer</b>
                    <br/>
                </div>
                <div className={s.input}>
                    <div>Change user name:</div>
                    <SuperInputText
                        className={s.input}
                        value={NewUserName}
                        onChange={onChangeNameInput}
                    />
                    <div>Change avatar URL:</div>
                    <SuperInputText
                        className={s.input}
                        value={NewAvatar}
                        onChange={onChangeAvaInput}
                    />
                </div>
                <span className={s.headerLogoButton}>
                    <SuperButton onClick={ChangeProfileEditModeHandler}>
                    Cancel
                </SuperButton>
                <SuperButton
                    onClick={SendNewUserDataHandler}
                    disabled={!isInputChanged ? true : isProfileLoading}
                >
                    Save
                </SuperButton>
                </span>
            </div>
        )
    }

    return (
        <div className={s.profileContainer}>
            <h2>Personal information</h2>
            <img src={userData.avatar} alt={"avatar"}/>
            <div>
                <b>Front-End Developer</b>
            </div>
            <div>
                <h3>Name: {userData.name}</h3>
                <h3>e-mail: {userData.email}</h3>
            </div>

            <SuperButton onClick={ChangeProfileEditModeHandler}>
                Edit profile
            </SuperButton>
        </div>
    );
};

export default Profile;
