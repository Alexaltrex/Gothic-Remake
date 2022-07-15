import request, {gql} from "graphql-request";
import {IGuild, IGuildListItem} from "../types/guilds.types";
import {endpoint} from "../constants/constants";

const getGuildsDocument = gql`
    query Guilds {
        guilds { 
            id
            name   
            image {
                large
            }
        }
    }
`

const getGuildByIdDocument = gql`
    query Guild($id: ID!) {
        guild(id: $id) {            
            id
            name
            image {
                large
            }
            description
            members {
                id
                name
                image {
                    small
                }
            }
            
        }
    }
`

export const getGuilds = async () => {
    const {guilds} = await request<{guilds: IGuildListItem[]}>({
        url: endpoint,
        document: getGuildsDocument
    })
    return guilds
}

export const getGuildById = async (id: string) => {
    const {guild} = await request<{guild: IGuild}>({
        url: endpoint,
        document: getGuildByIdDocument,
        variables: {id}
    })
    return guild
}