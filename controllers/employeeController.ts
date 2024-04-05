import express, { Request, Response, NextFunction } from "express";
import { parseResponse } from "../util/parseResponse";
import { addEmployee, deleteEmployee, editEmployee, getAllEmployees, getOneEmployee } from "../services/employeeService";
import { dataNotFoundError, statusCodeErrorNotFound, statusCodeOk } from "../util/varToUse";
import { ApiError } from "../class/ApiError";

export const employeeRouter = express.Router();

employeeRouter.get('/', (_req: Request, res: Response, next: NextFunction) => {
    try {
        const employees = getAllEmployees();
        parseResponse(employees, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

employeeRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const employee = getOneEmployee(Number(req.params.id));
        if (!employee) {
            throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
        }
        parseResponse(employee, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

employeeRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const employee = addEmployee(req.body);
        parseResponse(employee, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

employeeRouter.put('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const employee = editEmployee(Number(req.params.id), req.body);
        parseResponse(employee, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

employeeRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = deleteEmployee(Number(req.params.id));
        parseResponse(message, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
})