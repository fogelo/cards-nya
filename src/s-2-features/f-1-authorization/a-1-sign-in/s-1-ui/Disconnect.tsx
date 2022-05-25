import React from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {PROFILE_PATH} from "../../../../s-1-main/m-1-ui/Routing";

interface IDisconnectProps {

}

const Disconnect: React.FC<IDisconnectProps> = () => {

    return (
        <div>
            <button>logout</button>
            <NavLink to={PROFILE_PATH}>Profile</NavLink>
        </div>
    )
};

export default Disconnect;
