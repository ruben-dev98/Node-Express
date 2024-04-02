import express, { Request, Response, NextFunction } from "express";
import { addEmployee, deleteEmployee, editEmployee, getAllEmployees, getOneEmployee } from "../services/employeeService";
import { authToken } from "../middleware/auth";

export const employeeRouter = express.Router();

employeeRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
    getAllEmployees(res);
});

employeeRouter.get('/:id', (req: Request, res: Response, _next: NextFunction) => {
    getOneEmployee(Number(req.params.id), res);
});

employeeRouter.use(authToken);

employeeRouter.post('/', (req: Request, res: Response, _next: NextFunction) => {
    addEmployee(req.body, res);
});

employeeRouter.put('/:id', (req: Request, res: Response, _next: NextFunction) => {
    editEmployee(Number(req.params.id), req.body, res);
});

employeeRouter.delete('/:id', (req: Request, res: Response, _next: NextFunction) => {
    deleteEmployee(Number(req.params.id), res);
})