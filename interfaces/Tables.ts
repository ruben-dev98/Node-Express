export interface Tables {
    name: string,
    type: string,
    foreign?: string,
    fakerType: () => string | number | boolean
}