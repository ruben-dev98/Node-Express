import express, { Request, Response, NextFunction } from "express";
import { parseResponse } from "../util/parseResponse";
import { addEmployee, deleteEmployee, editEmployee, getAllEmployees, getOneEmployee } from "../services/employeeService";
import { statusCodeCreated, statusCodeOk } from "../util/constants";

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
        const employee = await getOneEmployee(req.params.id);
        parseResponse(employee, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

employeeRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const employee = await addEmployee(req.body);
        parseResponse(employee, res, statusCodeCreated);
    } catch (error: any) {
        next(error);
    }
});

employeeRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const employee = await editEmployee(req.params.id, req.body);
        parseResponse(employee, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
});

employeeRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const employee = await deleteEmployee(req.params.id);
        parseResponse(employee, res, statusCodeOk);
    } catch (error: any) {
        next(error);
    }
})