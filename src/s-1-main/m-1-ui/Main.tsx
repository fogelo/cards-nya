import React from 'react';
import Header from "./Header";
import Routing from "./Routing";

// headers, routes, footers
const Main: React.FC = () => {
    return (
        <>
            <Header/>

            <Routing/>
        </>
    );
};

export default Main;
