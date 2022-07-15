import React from "react";
import style from "./CurrentGuildPage.module.scss";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {IGuild} from "../../types/guilds.types";
import {Title} from "../X_common/Title/Title";
import Divider from "@mui/material/Divider";
import {Member} from "../X_common/Member/Member";
import {ErrorWrapper} from "../X_common/ErrorWrapper/ErrorWrapper";
import {getGuildById} from "../../api/guilds.api";

export const CurrentGuildPage = () => {
    const {id} = useParams();

    const {
        isLoading: isLoading,
        isError: isError,
        error: error,
        data: guild,
    } = useQuery<IGuild, Error>(
        ["guild", id],
        () => getGuildById(id as string),
    );

    return (
        <div className={style.currentGuildPage}>
            <ErrorWrapper isLoading={isLoading}
                          isError={isError}
                          error={error}
            >
                {
                    guild && (
                        <>
                            <Title title={guild.name} className={style.title}/>
                            <div className={style.content}>
                                <div className={style.cardBlock}>
                                    <p className={style.name}>{guild.name}</p>
                                    <p className={style.description}>{guild.description}</p>
                                    <img src={guild.image.large} alt=""/>
                                </div>

                                <div className={style.descriptionBlock}>
                                    <div className={style.descriptionPart}>
                                        <p className={style.label}>Описание</p>
                                        <Divider className={style.divider}/>
                                        <p className={style.description}>{guild.description}</p>
                                    </div>

                                    {
                                        guild.members.length && (
                                            <>
                                                <p className={style.label}>{`Представители (${guild.members.length})`}</p>
                                                <Divider className={style.divider}/>
                                                <div className={style.members}>
                                                    {
                                                        guild.members.map(member => <Member
                                                            key={member.id} {...member}/>)
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