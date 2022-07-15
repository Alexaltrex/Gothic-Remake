import request, { gql } from "graphql-request";
import {endpoint} from "../constants/constants";
import {IReligion, IReligionListItem} from "../types/religion.type";

const getReligionsDocument = gql`
    query Religions {
        religions {
            id
            name
            image {
               large
            }            
        }
    }
`

const getReligionByIdDocument = gql`
    query Religion($id: ID!) {
        religion(id: $id) {
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

export const getReligions = async () => {
    const { religions } = await request<{religions: IReligionListItem[]}>({
        url: endpoint,
        document: getReligionsDocument
    })
    return religions
}

export const getReligionById = async (id: string) => {
    const { religion } = await request<{religion: IReligion}>({
        url: endpoint,
        document: getReligionByIdDocument,
        variables: {id}
    })
    return religion
}