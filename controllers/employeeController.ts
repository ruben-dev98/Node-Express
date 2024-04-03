import express, { Request, Response, NextFunction } from "express";
import { parseResponse } from "../util/parseResponse";
import { addEmployee, deleteEmployee, editEmployee, getAllEmployees, getOneEmployee } from "../services/employeeService";

export const employeeRouter = express.Router();

employeeRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
    const employees = getAllEmployees();
    if (employees.length === 0) {
        parseResponse('Employees not found', res);
    }
    parseResponse(employees, res, 200);
});

employeeRouter.get('/:id', (req: Request, res: Response, _next: NextFunction) => {
    const booking = getOneEmployee(Number(req.params.id));
    if (!booking) {
        parseResponse('Employee not found', res);
    }
    parseResponse(booking, res, 200);
});

employeeRouter.post('/', (req: Request, res: Response, _next: NextFunction) => {
    const responseData = addEmployee(req.body);
    parseResponse(responseData.message, res, responseData.status);
});

employeeRouter.put('/:id', (req: Request, res: Response, _next: NextFunction) => {
    const responseData = editEmployee(Number(req.params.id), req.body);
    parseResponse(responseData.message, res, responseData.status);
});

employeeRouter.delete('/:id', (req: Request, res: Response, _next: NextFunction) => {
    const responseData = deleteEmployee(Number(req.params.id));
    parseResponse(responseData.message, res, responseData.status);
})