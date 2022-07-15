import React, {FC} from "react";
import {IMemberByGuild} from "../../../types/characters.types";
import style from "./MembersByGuild.module.scss"
import {Member} from "../../X_common/Member/Member";

interface IMembersByGuild {
    members: IMemberByGuild[]
}

export const MembersByGuild: FC<IMembersByGuild> = ({members}) => {
    const guildNames: string[] = [];
    for (let i = 0; i < members.length; i++) {
        if (!guildNames.includes(members[i].guild.name)) {
            guildNames.push(members[i].guild.name)
        }
    }
    guildNames.sort();

    const membersByGuild = guildNames.map(name => {
        const membersOfGuild = members.filter(character => character.guild.name === name);
        return ({
            name,
            membersOfGuild
        })
    })

    return (
        <div className={style.membersByGuild}>
            {
                membersByGuild.map(({name, membersOfGuild}, index) => (
                    <div className={style.membersOfGuildBlock} key={index}>
                       <p className={style.guildName}>{`${name} (${membersOfGuild.length})`}</p>
                        <div className={style.membersOfGuild}>
                            {
                                membersOfGuild.map(character => (
                                    <Member key={character.id}
                                            id={character.id}
                                            name={character.name}
                                            image={{small: character.image.small}}
                                    />
                                    )
                                )
                            }
                        </div>
                    </div>
                ))
            }

        </div>
    )
}