export default interface IPersonModel {
    name: string,
    date: string,
    transcript: ITranscript,
}

export interface ITranscript {
    CONSUMER_GOOD?: string[],
    LOCATION?: string[],
    PERSON?: string[],
    ORGANIZATION?: string[],
    OTHER?: string[],
    [x: string]: string[] | undefined,
}
