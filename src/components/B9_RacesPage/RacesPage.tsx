import React from "react";
import style from "./RacesPage.module.scss";
import {useQuery} from "react-query";
import {IRaceListItem} from "../../types/races.types";
import {ErrorWrapper} from "../X_common/ErrorWrapper/ErrorWrapper";
import {Title} from "../X_common/Title/Title";
import Divider from "@mui/material/Divider";
import {CardLink} from "../X_common/CardLink/CardLink";
import {getRaces} from "../../api/races.api";

export const RacesPage = () => {
    const {
        isLoading,
        isError,
        error,
        data: races,
    } = useQuery<IRaceListItem[], Error>(
        "races",
        () => getRaces(),
    );

    return (
        <div className={style.racesPage}>
            <ErrorWrapper isLoading={isLoading} isError={isError} error={error}>
                <Title title="Расы"/>

                {
                    races && (
                        <>
                            <div className={style.infoBlock}>
                                <p className={style.count}>Всего: {races.length}</p>
                            </div>
                            <Divider className={style.divider}/>

                            <div className={style.cards}>
                                <div className={style.inner}>
                                    {
                                        races.map(race => (
                                            <CardLink key={race.id}
                                                      label={race.name}
                                                      to={`/race/${race.id}`}
                                                      img={race.image.large}
                                                      className={style.card}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                    )
                }

            </ErrorWrapper>
        </div>
    )
}