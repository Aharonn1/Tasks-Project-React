import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError } from "../4-models/client-errors";
import TaskModel from "../4-models/taskMeeting-model";

async function getAllTasks(): Promise<TaskModel[]> {
    const sql = `SELECT * FROM task ORDER BY startDate`;
    const tasks = await dal.execute(sql)
    return tasks;
}

async function getAllKindTasks(): Promise<TaskModel[]> {
    const sql = `SELECT * FROM kindtask`;
    const tasks = await dal.execute(sql)
    return tasks;
}

async function updateTask(task: TaskModel): Promise<TaskModel> {
    const sql = `UPDATE task SET isFinish=${task.isFinish}   WHERE taskId = ${task.taskId}`;
    const result: any = await dal.execute(sql, task.isFinish);
    return result;
}

async function getTaskByTaskId(kindTaskId: number): Promise<TaskModel[]> {
    const sql = 'SELECT * FROM task WHERE kindTaskId = ? ';
    const kindTask = await dal.execute(sql, kindTaskId);
    return kindTask;
}

async function addTask(task: TaskModel):Promise<TaskModel> {
    const sql = "INSERT INTO task VALUES(DEFAULT,?,?,?,?,?,?,?,?)";
    const result: OkPacket = await dal.execute(sql, task.kindTaskId, task.name, task.description
    ,task.startDate, task.endDate,task.isFinish,task.isArchived,task.taskCount);
    task.taskId = result.insertId;
    return task;
}

async function updateTaskArchived(task: TaskModel): Promise<TaskModel> {
    const sql = `UPDATE task SET isArchived=${task.isArchived}   WHERE taskId = ${task.taskId}`;
    const result: any = await dal.execute(sql, task.isArchived);
    return result;
}

async function deleteTask(id: number): Promise<void> {

    const sql = "DELETE FROM task WHERE taskId = ?";
    const result: OkPacket = await dal.execute(sql, id);
    if (result.affectedRows === 0) throw new ResourceNotFoundError(id)

}

export default {
    getAllTasks,
    deleteTask,
    addTask,
    getTaskByTaskId,
    getAllKindTasks,
    updateTask,
    updateTaskArchived
}