import React from "react";
import style from "./CurrentRacePage.module.scss";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {IRace} from "../../types/races.types";
import {ErrorWrapper} from "../X_common/ErrorWrapper/ErrorWrapper";
import {Title} from "../X_common/Title/Title";
import Divider from "@mui/material/Divider";
import {Member} from "../X_common/Member/Member";
import {getRaceById} from "../../api/races.api";

export const CurrentRacePage = () => {
    const {id} = useParams();

    const {
        isLoading: isLoading,
        isError: isError,
        error: error,
        data: race,
    } = useQuery<IRace, Error>(
        ["race", id],
        () => getRaceById(id as string),
    );

    return (
        <div className={style.currentRacePage}>
            <ErrorWrapper isLoading={isLoading}
                          isError={isError}
                          error={error}
            >
                {
                    race && (
                        <>
                            <Title title={race.name} className={style.title}/>
                            <div className={style.content}>
                                <div className={style.cardBlock}>
                                    <p className={style.name}>{race.name}</p>
                                    <p className={style.description}>{race.description}</p>
                                    <img src={race.image.large} alt=""/>
                                </div>
                                <div className={style.descriptionBlock}>
                                    <div className={style.descriptionPart}>
                                        <p className={style.label}>Описание</p>
                                        <Divider className={style.divider}/>
                                        <p className={style.description}>{race.description}</p>
                                    </div>
                                    {
                                        race.members.length && (
                                            <>
                                                <p className={style.label}>{`Представители (${race.members.length})`}</p>
                                                <Divider className={style.divider}/>
                                                <div className={style.members}>
                                                    {
                                                        race.members.map(member => (
                                                                <Member key={member.id}
                                                                        id={member.id}
                                                                        name={member.name}
                                                                        image={{
                                                                            small: member.image.small
                                                                        }}
                                                                />
                                                            )
                                                        )
                                                    }
                                                </div>
                                            </>
                                        )
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