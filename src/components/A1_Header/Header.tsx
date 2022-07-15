import React from "react";
import style from "./Header.module.scss"
import {Link} from "react-router-dom";
import {IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {useStore} from "../../hooks/useStore";
import {observer} from "mobx-react-lite";

export const Header = observer(() => {
    const {appStore: {burgerMenu, setBurgerMenu}} = useStore();

    return (
        <header className={style.header}>
            <div className={style.left}>
                <IconButton className={style.burgerMenuBtn}
                            onClick={() => setBurgerMenu(!burgerMenu)}
                >
                    {burgerMenu ? <CloseIcon/> : <MenuIcon/>}
                </IconButton>
                <Link to="/"
                      className={style.logo}
                >
                    <span>Gothic I</span> <span>DB</span>
                </Link>
            </div>

            {/*<div>*/}
            {/*  Account*/}
            {/*</div>*/}
        </header>
    )
})