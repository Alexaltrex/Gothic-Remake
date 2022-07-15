import {IMember} from "./characters.types";

export interface IGuild {
    id: string
    name: string
    image: {
        small: string
        large: string
    }
    description: string
    members: IMember[]
    //leaderId?: number
    //deploymentId?: string
}

export interface IGuildListItem {
    id: string
    name: string
    image: {
        large: string
    }
}

