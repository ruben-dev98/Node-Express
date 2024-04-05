interface IApiError {
    status: number,
    message: string
}

export class ApiError extends Error {
    status: number;

    constructor({status, message} : IApiError) {
        super(message);
        this.status = status;
    }
}