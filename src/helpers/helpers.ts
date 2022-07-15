import {ICharacterListItem} from "../types/characters.types";
import {alphabet} from "../constants/constants";

type SortedCharactersType = {
    [key: string]: ICharacterListItem[]
}[];

export const sortCharactersByAlphabet = (characters: ICharacterListItem[]): SortedCharactersType => {
    const result = [] as SortedCharactersType;
    alphabet.forEach((key, index) => {
        result.push({
            [key]: characters
                .filter(character => character.name[0] === key)
                .sort((characterA, characterB) => {
                    if (characterA.name > characterB.name) return 1
                    if (characterA.name < characterB.name) return -1
                    return 0
                })
        })
    })
    return result
}

export const sortCharactersByLocation = (characters: ICharacterListItem[]): SortedCharactersType => {
    const result = [] as SortedCharactersType;
    const locations: Array<string> = [];
    characters.forEach(character => {
        if (!locations.includes(character.location.name)) {
            locations.push(character.location.name)
        }
    });
    locations.sort();
    locations.forEach((key, index) => {
        result.push({
            [key]: characters
                .filter(character => character.location.name === key)
                .sort((characterA, characterB) => {
                    if (characterA.name > characterB.name) return 1
                    if (characterA.name < characterB.name) return -1
                    return 0
                })
        })
    })

    return result
}

export const sortCharactersByGuild = (characters: ICharacterListItem[]): SortedCharactersType => {
    const result = [] as SortedCharactersType;
    const guilds: Array<string> = [];
    characters.forEach(character => {
        if (!guilds.includes(character.guild.name)) {
            guilds.push(character.guild.name)
        }
    });
    guilds.sort();
    guilds.forEach((key, index) => {
        result.push({
            [key]: characters
                .filter(character => character.guild.name === key)
                .sort((characterA, characterB) => {
                    if (characterA.name > characterB.name) return 1
                    if (characterA.name < characterB.name) return -1
                    return 0
                })
        })
    })
    return result
}


export const serializeSearchParams = (searchParams: URLSearchParams) => {
    const params:{[key:string]: string} = {};
    // @ts-ignore
    for(let [key, value] of searchParams) {
        params[key as string] = value
    }
    return params
};