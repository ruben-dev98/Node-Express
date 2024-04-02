export interface ParseResponse {
    status: number,
    message: string
}

export const parseResponse = (message: string, status = 404): ParseResponse => {
    return {
        status: status,
        message: message
    }
}