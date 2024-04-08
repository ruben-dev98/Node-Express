import express, { Request, Response, NextFunction } from "express";
import { parseResponse } from "../util/parseResponse";
import { addEmployee, deleteEmployee, editEmployee, getAllEmployees, getOneEmployee } from "../services/employeeService";
import { dataNotFoundError, statusCodeErrorNotFound, statusCodeOk } from "../util/varToUse";
import { ApiError } from "../class/ApiError";

export const employeeRouter = express.Router();

employeeRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const employees = await getAllEmployees();
        parseResponse(employees, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

employeeRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const employee = await getOneEmployee(Number(req.params.id));
        if (employee === null) {
            throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
        }
        parseResponse(employee, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

employeeRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const employee = await addEmployee(req.body);
        parseResponse(employee, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

employeeRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const employee = await editEmployee(Number(req.params.id), req.body);
        if (employee === null) {
            throw new ApiError({ status: statusCodeErrorNotFound, message: dataNotFoundError });
        }
        parseResponse(employee, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

employeeRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = await deleteEmployee(Number(req.params.id));
        parseResponse(message, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
})