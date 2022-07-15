import React from "react";
import style from "./HomePage.module.scss";
import {links} from "../A2_BurgerMenu/links";
import {HomePageLink} from "./HomePageLink/HomePageLink";

export const HomePage = () => {
    const [, ...homeLinks] = links;
    return (
        <div className={style.homePage}>
            {
                homeLinks.map(({icon, ...homePageLink}, index) => (
                    <HomePageLink key={index} {...homePageLink}/>
                    )
                )
            }
        </div>
    )
}