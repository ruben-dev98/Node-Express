import express, { Request, Response, NextFunction } from "express";
import { addEmployee, deleteEmployee, editEmployee, getAllEmployees, getOneEmployee } from "../services/employeeService";
import { authToken } from "../middleware/auth";

export const employeeRouter = express.Router();

employeeRouter.get('/', (_req: Request, res: Response, _next: NextFunction) => {
    res.json(getAllEmployees());
    return;
});

employeeRouter.get('/:id', (req: Request, res: Response, _next: NextFunction) => {
    res.json(getOneEmployee(Number(req.params.id)));
    return;
});

employeeRouter.use(authToken);

employeeRouter.post('/', (req: Request, res: Response, _next: NextFunction) => {
    res.json(addEmployee(req.body));
    return;
});

employeeRouter.put('/:id', (req: Request, res: Response, _next: NextFunction) => {
    res.json(editEmployee(Number(req.params.id), req.body));
    return;
});

employeeRouter.delete('/:id', (req: Request, res: Response, _next: NextFunction) => {
    res.json(deleteEmployee(Number(req.params.id)));
    return;
})