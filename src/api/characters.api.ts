import request, {gql} from "graphql-request";
import {endpoint} from "../constants/constants";
import {ICharacter, ICharacterListItem, ICharactersByPage, IMember} from "../types/characters.types";

const getCharactersDocument = gql`
    query Characters {
        characters {
            id            
            name
            image {
                small
            }
            guild {
                id
                name
            }
            location {
                id
                name
            }
        }
    }
`

const getCharacterByIdDocument = gql`
    query Character($id: ID!) {
        character(id: $id) {
            id
            name 
            image {
                large
            }
            race {
                id
                name
            }
            male
            guild {
                id
                name 
            }
            location {
                id
                name
            }
            sublocation {
                id
                name
            }
            role
            religion {
                id
                name
            }
            status
            description
            code
        }        
    }
`

const getCharactersByPageDocument = gql`
    query CharactersByPage($page: Int!) {
        charactersByPage(page: $page) {
            pages
            characters {
                id
                name
                image {
                    small
                }
            }
        }
    }
`

export const getCharacters = async () => {
    const { characters } = await request<{characters: ICharacterListItem[]}>({
        url: endpoint,
        document: getCharactersDocument

    })
    return characters
}

export const getCharactersByPage = async (page: number) => {
    const { charactersByPage } = await request<{ charactersByPage: ICharactersByPage }>({
        url: endpoint,
        document: getCharactersByPageDocument,
        variables: {page}
    })
    return charactersByPage
}



export const getCharacterById = async (id: string) => {
    const {character} = await request<{character: ICharacter}>({
        url: endpoint,
        document: getCharacterByIdDocument,
        variables: {id}
    })
    return character
}