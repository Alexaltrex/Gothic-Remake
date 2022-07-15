import React, {useRef} from "react";
import style from "./BurgerMenu.module.scss";
import clsx from "clsx";
import {useOutsideClick} from "../../hooks/useOutsideClick";
import {Link, useLocation} from "react-router-dom";
import {links} from "./links";
import {observer} from "mobx-react-lite";
import {useStore} from "../../hooks/useStore";

export const BurgerMenu = observer(() => {
    const {appStore: {burgerMenu, setBurgerMenu}} = useStore();

    const ref = useRef(null);
    useOutsideClick(ref, () => setBurgerMenu(false));

    const location = useLocation();

    return (
        <aside className={clsx({
            [style.burgerMenu]: true,
            [style.burgerMenu_hide]: !burgerMenu,
        })}
               ref={ref}
        >
            <div className={style.inner}
            >
                {
                    links.map(({to, label, icon}, index) => (
                        <Link key={index}
                              to={to}
                              onClick={() => setBurgerMenu(false)}
                              className={clsx({
                                  [style.link]: true,
                                  [style.link_selected]: to === location.pathname,
                              })}
                        >
                            {icon}
                            <p className={style.label}>{label}</p>
                        </Link>
                    ))
                }
            </div>
        </aside>
    )
})