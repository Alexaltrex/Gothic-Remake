import LinearProgress from "@mui/material/LinearProgress"
import style from "./LinearPreloader.module.scss"
import React from "react";

export const LinearPreloader = () => {
    return (
        <LinearProgress className={style.linearPreloader}/>
    )
}