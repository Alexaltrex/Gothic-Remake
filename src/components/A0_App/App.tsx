import React from 'react';
import style from "./app.module.scss"
import {Header} from "../A1_Header/Header";
import {BurgerMenu} from "../A2_BurgerMenu/BurgerMenu";
import {Route, Routes, useLocation} from "react-router-dom";
import clsx from "clsx";
import {HomePage} from "../B0_HomePage/HomePage";
import {CharactersPage} from "../B1_CharactersPage/CharactersPage";
import {CurrentCharacterPage} from "../B2_CurrentCharacterPage/CurrentCharacterPage";
import {GuildsPage} from "../B3_GuildsPage/GuildsPage";
import {CurrentGuildPage} from "../B4_CurrentGuildPage/CurrentGuildPage";
import {LocationsPage} from "../B5_LocationsPage/LocationsPage";
import {CurrentLocationPage} from "../B6_CurrentLocationPage/CurrentLocationPage";
import {ReligionsPage} from "../B7_ReligionsPage/ReligionsPage";
import {CurrentReligionPage} from "../B8_CurrentReligionPage/CurrentReligionPage";
import {RacesPage} from "../B9_RacesPage/RacesPage";
import {CurrentRacePage} from "../B10_CurrentRacePage/CurrentRacePage";

export const routes = [
    { path: "/", element: <HomePage/> },
    { path: "/characters", element: <CharactersPage/> },
    { path: "/character/:id", element: <CurrentCharacterPage/> },
    { path: "/guilds", element: <GuildsPage/> },
    { path: "/guild/:id", element: <CurrentGuildPage/> },
    { path: "/locations", element: <LocationsPage/> },
    { path: "/location/:id", element: <CurrentLocationPage/> },
    { path: "/religions", element: <ReligionsPage/> },
    { path: "/religion/:id", element: <CurrentReligionPage/> },
    { path: "/races", element: <RacesPage/> },
    { path: "/race/:id", element: <CurrentRacePage/> },
];

export const App = () => {
    const location = useLocation();

    return (
        <div className={style.app}>
            <div className={style.inner}>
                <Header/>

                <div className={style.content}>
                    <BurgerMenu/>

                    <main className={clsx({
                        [style.main]: true,
                        [style.main_locations]: location.pathname.includes("location"),
                        [style.main_religions]: location.pathname.includes("religion"),
                        [style.main_races]: location.pathname.includes("race"),
                        [style.main_guilds]: location.pathname.includes("guild"),
                    })}>
                        <Routes>
                            {
                                routes.map(({path, element}, index) => <Route key={index}
                                                                              path={path}
                                                                              element={element}
                                />)
                            }
                        </Routes>

                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;
