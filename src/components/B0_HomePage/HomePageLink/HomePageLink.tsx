import React, {FC} from "react";
import style from "./HomePageLink.module.scss";
import {HomePageLinkType} from "../../../types/app.types";
import {Link} from "react-router-dom";

export const HomePageLink: FC<HomePageLinkType> = ({to, label, src}) => {
    return (
        <Link className={style.homePageLink}
              to={to}
        >
            <img src={src} alt=""/>
            <p className={style.label}>{label}</p>
        </Link>
    )
}