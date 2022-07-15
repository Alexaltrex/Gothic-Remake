import request, {gql} from "graphql-request";
import {IRace, IRaceListItem} from "../types/races.types";
import {endpoint} from "../constants/constants";

const getRacesDocument = gql`
    query Races {
       races {
           id
           name
           image {
               large
           }           
       }
    }
`

const getRaceByIdDocument = gql`
    query Race($id: ID!) {
        race(id: $id) {
            id
            name
            image {
                large
            }
            members {
                id
                name
                image {
                   small 
                }
            }
            description
        }
    }
`

export const getRaces = async () => {
    const { races } = await request<{races: IRaceListItem[]}>({
        url: endpoint,
        document: getRacesDocument
    })
    return races
}

export const getRaceById = async (id: string) => {
    const { race } = await request<{race: IRace}>({
        url: endpoint,
        document: getRaceByIdDocument,
        variables: {id}
    })
    return race
}

