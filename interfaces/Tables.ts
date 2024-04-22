export interface Tables {
    name: string,
    type: string,
    foreign?: string,
    fakerType: (i?:number) => string | number | boolean
}