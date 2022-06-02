import React from 'react';
import {NavLink} from "react-router-dom";
import {FORGOT_PATH, REGISTER_PATH} from "../../../../s-1-main/m-1-ui/Routing";
import Login from "../../../../Login/Login/Login";

//x1

interface ISignInProps {

}

const SignIn: React.FC<ISignInProps> = (
    {

    }
) => {

    return (
        <div>
           <Login/>
        </div>
    );
};

export default SignIn;
