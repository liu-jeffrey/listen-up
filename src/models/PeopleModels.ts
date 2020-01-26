export default interface IPersonModel {
    name: string,
    date: string,
    transcript: ITranscript,
}

export interface ITranscript {
    giftIdeas?: string[],
    locationsOfInterest?: string[],
    friends?: string[],
    organization?: string[],
    [x: string]: string[] | undefined,
}
