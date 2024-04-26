export interface Tables {
    name: string,
    type: string,
    foreign?: string,
    setValue: (i?:number) => string | number | boolean
}