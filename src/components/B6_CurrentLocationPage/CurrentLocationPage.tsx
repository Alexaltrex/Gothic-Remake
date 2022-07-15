import React from "react";
import style from "./CurrentLocationPage.module.scss";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {ILocation} from "../../types/locations.types";
import {Title} from "../X_common/Title/Title";
import Divider from "@mui/material/Divider";
import {MembersByGuild} from "./MembersByGuild/MemersByGuild";
import {ErrorWrapper} from "../X_common/ErrorWrapper/ErrorWrapper";
import {getLocationById} from "../../api/locations.api";

export const CurrentLocationPage = () => {
    const {id} = useParams();

    const {
        isLoading: isLoading,
        isError: isError,
        error: error,
        data: location,
    } = useQuery<ILocation, Error>(
        ["location", id],
        () => getLocationById(id as string),
    );

    return (
        <div className={style.currentLocationPage}>
            <ErrorWrapper isLoading={isLoading}
                          isError={isError}
                          error={error}
            >
                {
                    location && (
                        <>
                            <Title title={location.name} className={style.title}/>
                            <div className={style.content}>
                                <div className={style.cardBlock}>
                                    <p className={style.name}>{location.name}</p>
                                    <p className={style.description}>{location.description}</p>
                                    <img src={location.image.large} alt=""/>
                                </div>
                                <div className={style.descriptionBlock}>
                                    <div className={style.descriptionPart}>
                                        <p className={style.label}>Описание</p>
                                        <Divider className={style.divider}/>
                                        <p className={style.description}>{location.description}</p>
                                    </div>
                                    {
                                        location.members.length && (
                                            <>
                                                <p className={style.label}>{`Представители (${location.members.length})`}</p>
                                                <Divider className={style.divider}/>
                                                <div className={style.members}>
                                                    <MembersByGuild members={location.members}/>
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