import axios from "axios";
import appConfig from "../Utils/AppConfig";
import TaskModel from "../Models/TaskModel";
import kindTask from "../Models/KindTaskModel";
import { TaskActionType, tasksStore } from "../Redux/taskState";

class DataService {

    async getAllTask(): Promise<TaskModel[]> {
        try {
            let tasks = tasksStore.getState().tasks;
            if (tasks.length === 0) {
                const response = await axios.get<TaskModel[]>(appConfig.tasksUrl);
                tasks = response.data;
                tasksStore.dispatch({ type: TaskActionType.FetchTasks, payload: tasks })
            }
            return tasks;
        } catch (err) {
            console.log(err)
        }
    }

    async getAllTasksByKindTask(): Promise<kindTask[]> {
        try {
            let kindTask = tasksStore.getState().kindTask;
            const response = await axios.get<kindTask[]>(appConfig.kindTasksUrl);
            kindTask = response.data;
            return kindTask;
        } catch (err) {
            console.log(err)
        }
    }

    async getTaskByKindTask(kindTaskId: number): Promise<TaskModel[]> {
        let kindTask = tasksStore.getState().tasks
        let task = kindTask.find(t => t.kindTaskId === kindTaskId)
        if (!task) {
            const response = await axios.get<TaskModel[]>(appConfig.taskByTaskUrl + kindTaskId);
            kindTask = response.data;
        }
        return kindTask;
    }


    async addTask(task: TaskModel): Promise<void> {
        try {
            const headers = { "Content-Type": "multipart/form-data" };
            const response = await axios.post<TaskModel>(appConfig.tasksUrl, task, { headers })
            const addedTask = response.data;
            tasksStore.dispatch({ type: TaskActionType.AddTask, payload: addedTask })
        } catch (err) {
            console.log(err)
        }
    }

    async deleteTask(taskId: number): Promise<void> {
        try {
            await axios.delete(appConfig.tasksUrl + taskId);
            tasksStore.dispatch({ type: TaskActionType.DeleteTask, payload: taskId })
        } catch (err) {
            console.log(err);
        }
    }

    async updateTask(task: TaskModel): Promise<void> {
        try {
            const headers = { "Content-Type": "multipart/form-data" };
            const response = await axios.put<TaskModel>(appConfig.finishUrl + task.taskId, task, { headers });
            const updateTask = response.data;
            console.log(updateTask);
            tasksStore.dispatch({ type: TaskActionType.UpdateTask, payload: updateTask });
        } catch (err) {
            console.log(err)
        }
    }

    async updateTaskArchived(task: TaskModel): Promise<void> {
        try {
            const headers = { "Content-Type": "multipart/form-data" };
            const response = await axios.put<TaskModel>(appConfig.archivedUrl + task.taskId, task, { headers });
            const updateTask = response.data;
            let tasks = await dataService.getAllTask()
            const index = tasks.findIndex(t => t.taskId === task.taskId);
            tasks[index].isArchived = task.isArchived;
            await dataService.getAllTask()
            tasksStore.dispatch({ type: TaskActionType.UpdateTask, payload: updateTask });
        } catch (err) {
            console.log(err)
        }
    }
    async getAllArchivedTasks(): Promise<TaskModel[]> {
        let tasks = await this.getAllTask();
        tasks = tasks.filter((task: TaskModel) => (task.isArchived || dataService.isMoreThanWeekFromNow(task)))
        await this.getAllTask();
        return tasks;
    }

    async getAllTasksAreNotArchived(): Promise<TaskModel[]> {
        try {
            let tasks = await this.getAllTask();
            tasks = tasks.filter((task: TaskModel) => (!task.isArchived && !dataService.isMoreThanWeekFromNow(task)))
            await this.getAllTask();
            tasksStore.dispatch({ type: TaskActionType.UpdateTask, payload: tasks });
            return tasks;
        } catch (err) {
            console.log(err)
        }
    }

    async getTasksFinished(): Promise<TaskModel[]> {
        try {
            let tasks = await this.getAllTask();
            const taskFinished = tasks.filter((task) => task.isFinish === 1)
            await this.getAllTask();
            return taskFinished;
        } catch (err) {
            console.log(err)
        }
    }

    isMoreThanWeekFromNow(task: TaskModel) {

        const currentDate = new Date();

        const taskStartDateParts: any = task.startDate.split('-');

        const validDate = new Date(taskStartDateParts[2], taskStartDateParts[1] - 1, taskStartDateParts[0]);

        const currentTime = currentDate.getTime();

        const week = (7 * 24 * 60 * 60 * 1000);

        const calcDayOver = currentTime - validDate.getTime()

        return calcDayOver > week;
    }
}
const dataService = new DataService();
export default dataService;
