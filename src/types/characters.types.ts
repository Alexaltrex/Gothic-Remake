export interface ICharacter {
    id: string
    name: string
    image: {
        small: string
        large: string
    }
    race: {
        id: string
        name: string
    }
    male: string
    guild: {
        id: string
        name: string
    }
    location: {
        id: string
        name: string
    }
    sublocation?: {
        id: string
        name: string
    }
    role?: string
    religion?: {
        id: string
        name: string
    }
    status: string
    description: string
    code?: string
}

export interface ICharacterListItem {
    id: string
    name: string
    image: {
        small: string
    }
    guild: {
        id: string
        name: string
    }
    location: {
        id: string
        name: string
    }
}

export type SortedByType = 'pagination' | 'alphabet' | 'location' | "guild";

export interface IMemberByGuild {
    id: string
    name: string
    guild: {
        name: string
    }
    image: {
        small: string
    }
}

export interface IMember {
    id: string
    name: string
    image: {
        small: string
    }
}

export interface ICharactersByPage {
    pages: number
    characters: IMember[]
}