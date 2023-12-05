import express, { Request, Response, NextFunction } from "express";
import tasksService from "../5-services/tasks-service";
import TaskModel from "../4-models/taskMeeting-model";

const router = express.Router();

router.get("/tasks", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const task = await tasksService.getAllTasks();
        response.json(task)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/kindTask", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const task = await tasksService.getAllKindTasks();
        response.json(task)
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/tasks/finish/:taskId([0-9]+)", async (request: Request, response:Response, next:NextFunction) => {
    try {
        request.body.taskId = +request.params.taskId;
        const task = new TaskModel(request.body);
        const updateTask = await tasksService.updateTask(task);
        response.json(updateTask);
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/tasks/archived/:taskId([0-9]+)", async (request: Request, response:Response, next:NextFunction) => {
    try {
        request.body.taskId = +request.params.taskId;
        const task = new TaskModel(request.body);
        const updateTask = await tasksService.updateTaskArchived(task);
        response.json(updateTask);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/tasks", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const task = new TaskModel(request.body);
        const addedTask = await tasksService.addTask(task);
        response.status(210).json(addedTask);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/tasks/:taskId([0-9]+)", async (request: Request, response: Response, next: NextFunction)=>{
    try{  
        const taskId = +request.params.taskId;
        await tasksService.deleteTask(taskId);
        response.sendStatus(204)
    }catch(err:any){
        next(err)
    }
})

router.get("/task-per-tasks/:kindTaskId", async(request:Request,response:Response,next:NextFunction)=>{
    try{
        const kindTaskId = +request.params.kindTaskId;
        const task = await tasksService.getTaskByTaskId(kindTaskId)
        response.json(task)
    }catch(err:any){
        next(err)
    }
})

export default router;