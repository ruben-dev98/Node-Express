import express, { Request, Response, NextFunction } from "express";
import { addEmployee, deleteEmployee, editEmployee, getAllEmployees, getOneEmployee } from "../services/employeeService";

const employeeRouter = express.Router();

employeeRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
    res.json(getAllEmployees());
});

employeeRouter.get('/:id', (req: Request, res: Response, _next: NextFunction) => {
    res.json(getOneEmployee(Number(req.params.id)));
});

employeeRouter.post('/', (req: Request, _res: Response, _next: NextFunction) => {
    addEmployee(req.body);
});

employeeRouter.put('/:id', (req: Request, _res: Response, _next: NextFunction) => {
    editEmployee(Number(req.params.id), req.body);
});

employeeRouter.delete('/:id', (req: Request, _res: Response, _next: NextFunction) => {
    deleteEmployee(Number(req.params.id));
})