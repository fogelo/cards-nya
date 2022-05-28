import React, {MouseEvent, useEffect, useState} from "react";
import {RegisterAPI} from "../r-3-dal/RegisterAPI";
import {useDispatch, useSelector} from "react-redux";
import {IAppStore} from "../../../../s-1-main/m-2-bll/store";
import {IRegisterState} from "../r-2-bll/b-2-redux/registerInitialState";
import {useNavigate} from "react-router-dom";
import {setErrorRegister, setLoadingRegister, setSuccessRegister} from "../r-2-bll/b-2-redux/registerActions";
import {PROFILE_PATH} from "../../../../s-1-main/m-1-ui/Routing";

interface IRegisterProps {

}

const Register: React.FC<IRegisterProps> = ({}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const {loading, success, error} = useSelector<IAppStore, IRegisterState>(state => state.register)
    const navigate = useNavigate()

    const buttonOnClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(setLoadingRegister(true))
        RegisterAPI.register(email, password)
            .then((res) => {
                console.log(res)
                dispatch(setSuccessRegister(true))
                dispatch(setLoadingRegister(false))
            })
            .catch((error) => {
                console.log(error.response.data.error)
                dispatch(setLoadingRegister(false))
                dispatch(setErrorRegister(error.response.data.error))
            })
    }

    //redirect to profile
    /*
        if (success) {
                navigate(PROFILE_PATH)
            }
     */
    return (
        <div>
            <form name={"register"}>
                <input type="text"
                       name={"email"}
                       placeholder={"enter your email"}
                       onChange={(e) => setEmail(e.currentTarget.value)}/>
                <input type="text"
                       name={"password"}
                       placeholder={"enter your password"}
                       onChange={(e) => setPassword(e.currentTarget.value)}/>
                <button type={"submit"}
                        onClick={buttonOnClickHandler}
                >
                    sign up
                </button>
                {
                    loading ? <div>loading...</div> : error ? <div>{error}</div> : ""
                }
            </form>
        </div>
    );
};

export default Register;
