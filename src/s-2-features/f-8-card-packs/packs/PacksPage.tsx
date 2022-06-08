import React from 'react';
import CardsPage from "./cards/CardsPage";
import s from './PacksPage.module.css'


const PacksPage = () => {


    return (
        <div className={s.mainContainer}>
            <div className={s.leftContainer}>
                <div className={s.sideBox}>
                    sider
                </div>
                <div>
                    MY ALL BUTTONS
                </div>
                <div>
                    slider
                </div>

            </div>
            <div className={s.rightContainer}>

                <div className={s.input}>
                    input
                </div>
                <div className={s.tableBox}>
                    table
                </div>
                <div className={s.paginationBox}>
                    pagination
                </div>
            </div>

        </div>
    );
};

export default PacksPage;
