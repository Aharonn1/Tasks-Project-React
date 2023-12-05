import { createStore } from "redux";
import TaskModel from "../Models/TaskModel";
import kindTask from "../Models/KindTaskModel";

export class TaskState {
    tasks: TaskModel[] = [];
    kindTask: kindTask[] = [];
}

export enum TaskActionType {
    FetchKindTasks = "FetchKindTasks",
    FetchTasks = "FetchTasks",
    AddTask = "AddTask",
    DeleteTask = "DeleteTask",
    UpdateTask = "UpdateTask",
}

export interface TasksAction {
    type: TaskActionType;
    payload: any
}

export function taskReducer(currentState = new TaskState(), action: TasksAction): TaskState {
    const newState = { ...currentState };

    switch (action.type) {
        case TaskActionType.FetchTasks:
            newState.tasks = action.payload;
            break;

        case TaskActionType.FetchKindTasks:
            newState.kindTask = action.payload;
            break;

        case TaskActionType.AddTask:
            if (newState.tasks.length > 0) {
                newState.tasks.push(action.payload)
            }
            break;

        case TaskActionType.DeleteTask:
            const indexToDelete = newState.tasks.findIndex(t => t.taskId === action.payload)
            if (indexToDelete >= 0) {
                newState.tasks.splice(indexToDelete, 1)
            }
            break;

        case TaskActionType.UpdateTask:
            const indexToUpdate = newState.tasks.findIndex(t => t.taskId === action.payload.taskId)
            if (indexToUpdate >= 0) {
                newState.tasks[indexToUpdate] = action.payload;
            }
            break;
    }
    return newState;
}
export const tasksStore = createStore(taskReducer)